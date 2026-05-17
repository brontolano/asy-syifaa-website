// ============================================================
// Asy-Syifaa ERP — Go API Gateway (Scaffold)
// Port target: 5000 (berdampingan dengan Node backend di 4000)
// Akan menggantikan Node backend secara bertahap (strangler fig)
// ============================================================
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

// ── Config ───────────────────────────────────────────────────

type Config struct {
	Port        string
	DatabaseURL string
	JWTSecret   string
	CORSOrigin  string
	Env         string
}

func loadConfig() Config {
	_ = godotenv.Load()
	return Config{
		Port:        getEnv("GO_API_PORT", "5000"),
		DatabaseURL: getEnv("DATABASE_URL", ""),
		JWTSecret:   getEnv("JWT_SECRET", "dev-jwt-secret"),
		CORSOrigin:  getEnv("CORS_ORIGIN", "http://localhost:3000"),
		Env:         getEnv("NODE_ENV", "development"),
	}
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

// ── RBAC ─────────────────────────────────────────────────────

var rolePermissions = map[string][]string{
	"mudir_aam": {"read", "write", "approve", "manage"},
	"ustadz":    {"read", "write"},
	"ustadzah":  {"read", "write"},
	"wali":      {"read"},
	"santri":    {"read"},
}

func resolveRole(r *http.Request) string {
	if role := r.Header.Get("X-Role"); role != "" {
		return strings.ToLower(strings.TrimSpace(role))
	}
	auth := r.Header.Get("Authorization")
	if strings.HasPrefix(strings.ToLower(auth), "bearer ") {
		token := strings.TrimSpace(auth[7:])
		return strings.TrimPrefix(strings.ToLower(token), "dev-token-")
	}
	return "ustadz"
}

func hasPermission(role, permission string) bool {
	perms, ok := rolePermissions[role]
	if !ok {
		return false
	}
	for _, p := range perms {
		if p == permission {
			return true
		}
	}
	return false
}

func requirePermission(permission string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			role := resolveRole(r)
			if !hasPermission(role, permission) {
				writeJSON(w, http.StatusForbidden, map[string]any{
					"ok":                  false,
					"message":             "Akses ditolak untuk role ini",
					"required_permission": permission,
					"role":                role,
				})
				return
			}
			ctx := context.WithValue(r.Context(), contextKeyRole{}, role)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

type contextKeyRole struct{}

// ── Helpers ───────────────────────────────────────────────────

func writeJSON(w http.ResponseWriter, status int, data any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(data)
}

func nowISO() string {
	return time.Now().UTC().Format(time.RFC3339)
}

// ── App ───────────────────────────────────────────────────────

type App struct {
	cfg  Config
	db   *pgxpool.Pool
	started time.Time
}

func (a *App) routes() http.Handler {
	r := chi.NewRouter()

	// Middleware global
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(30 * time.Second))
	r.Use(corsMiddleware(a.cfg.CORSOrigin))

	// ── Public routes ──────────────────────────────────────
	r.Get("/api/health", a.handleHealth)
	r.Get("/api/ready", a.handleReady)
	r.Get("/api/metrics", a.handleMetrics)
	r.Get("/api/system/roles", a.handleRoles)
	r.Get("/api/system/calendar/convert", a.handleCalendarConvert)
	r.Post("/api/auth/login", a.handleLogin)

	// ── Protected routes ───────────────────────────────────
	r.Route("/api/students", func(r chi.Router) {
		r.With(requirePermission("read")).Get("/", a.handleGetStudents)
		r.With(requirePermission("write")).Post("/", a.handlePostStudent)
	})

	r.Route("/api/attendance", func(r chi.Router) {
		r.With(requirePermission("read")).Get("/", a.handleGetAttendance)
		r.With(requirePermission("write")).Post("/", a.handlePostAttendance)
	})

	r.Route("/api/billing", func(r chi.Router) {
		r.With(requirePermission("read")).Get("/", a.handleGetBilling)
		r.With(requirePermission("write")).Post("/", a.handlePostBilling)
	})

	// Phase 3 — Tahfidz (scaffold, belum aktif)
	r.Route("/api/tahfidz", func(r chi.Router) {
		r.With(requirePermission("read")).Get("/", a.handleGetTahfidz)
		r.With(requirePermission("write")).Post("/", a.handlePostTahfidz)
	})

	// Phase 3 — Dormitory (scaffold)
	r.Route("/api/dormitory", func(r chi.Router) {
		r.With(requirePermission("read")).Get("/rooms", a.handleGetRooms)
		r.With(requirePermission("read")).Get("/assignments", a.handleGetAssignments)
	})

	return r
}

// ── Handlers ─────────────────────────────────────────────────

func (a *App) handleHealth(w http.ResponseWriter, r *http.Request) {
	dbStatus := "disconnected"
	if a.db != nil {
		if err := a.db.Ping(r.Context()); err == nil {
			dbStatus = "postgres"
		}
	}
	writeJSON(w, http.StatusOK, map[string]any{
		"ok":             true,
		"service":        "go-api",
		"db":             dbStatus,
		"timestamp":      nowISO(),
		"uptime_seconds": int(time.Since(a.started).Seconds()),
	})
}

func (a *App) handleReady(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, map[string]any{
		"ok":        true,
		"ready":     true,
		"timestamp": nowISO(),
	})
}

func (a *App) handleMetrics(w http.ResponseWriter, _ *http.Request) {
	writeJSON(w, http.StatusOK, map[string]any{
		"ok":             true,
		"service":        "go-api",
		"uptime_seconds": int(time.Since(a.started).Seconds()),
		"note":           "Full metrics tersedia setelah integrasi Prometheus",
	})
}

func (a *App) handleRoles(w http.ResponseWriter, _ *http.Request) {
	writeJSON(w, http.StatusOK, map[string]any{
		"ok":    true,
		"roles": rolePermissions,
	})
}

func (a *App) handleLogin(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Role string `json:"role"`
		Name string `json:"name"`
	}
	_ = json.NewDecoder(r.Body).Decode(&body)
	role := strings.ToLower(strings.TrimSpace(body.Role))
	if role == "" {
		role = "ustadz"
	}
	perms, ok := rolePermissions[role]
	if !ok {
		writeJSON(w, http.StatusBadRequest, map[string]any{"ok": false, "message": "Role tidak dikenali"})
		return
	}
	name := strings.TrimSpace(body.Name)
	if name == "" {
		name = "Operator"
	}
	writeJSON(w, http.StatusOK, map[string]any{
		"ok":    true,
		"token": fmt.Sprintf("dev-token-%s", role),
		"user":  map[string]any{"name": name, "role": role, "permissions": perms},
	})
}

func (a *App) handleCalendarConvert(w http.ResponseWriter, r *http.Request) {
	dateStr := r.URL.Query().Get("date")
	if dateStr == "" {
		dateStr = time.Now().Format("2006-01-02")
	}
	t, err := time.Parse("2006-01-02", dateStr)
	if err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]any{"ok": false, "message": "format date harus YYYY-MM-DD"})
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{
		"ok":        true,
		"gregorian": dateStr,
		"hijri":     map[string]any{"note": "Konversi Hijriah via ICU — implementasi penuh di Phase 2 Go", "gregorian_ref": t.Format("2006-01-02")},
	})
}

// ── Stub handlers (akan diimplementasikan bertahap) ──────────

func (a *App) handleGetStudents(w http.ResponseWriter, _ *http.Request) {
	writeJSON(w, http.StatusOK, []any{})
}

func (a *App) handlePostStudent(w http.ResponseWriter, _ *http.Request) {
	writeJSON(w, http.StatusNotImplemented, map[string]any{"ok": false, "message": "Gunakan Node backend (port 4000) — Go migration sedang berjalan"})
}

func (a *App) handleGetAttendance(w http.ResponseWriter, _ *http.Request) {
	writeJSON(w, http.StatusOK, []any{})
}

func (a *App) handlePostAttendance(w http.ResponseWriter, _ *http.Request) {
	writeJSON(w, http.StatusNotImplemented, map[string]any{"ok": false, "message": "Gunakan Node backend (port 4000)"})
}

func (a *App) handleGetBilling(w http.ResponseWriter, _ *http.Request) {
	writeJSON(w, http.StatusOK, []any{})
}

func (a *App) handlePostBilling(w http.ResponseWriter, _ *http.Request) {
	writeJSON(w, http.StatusNotImplemented, map[string]any{"ok": false, "message": "Gunakan Node backend (port 4000)"})
}

func (a *App) handleGetTahfidz(w http.ResponseWriter, _ *http.Request) {
	writeJSON(w, http.StatusOK, []any{})
}

func (a *App) handlePostTahfidz(w http.ResponseWriter, _ *http.Request) {
	writeJSON(w, http.StatusNotImplemented, map[string]any{"ok": false, "message": "Tahfidz API — Phase 3"})
}

func (a *App) handleGetRooms(w http.ResponseWriter, _ *http.Request) {
	writeJSON(w, http.StatusOK, []any{})
}

func (a *App) handleGetAssignments(w http.ResponseWriter, _ *http.Request) {
	writeJSON(w, http.StatusOK, []any{})
}

// ── CORS Middleware ───────────────────────────────────────────

func corsMiddleware(origin string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Role")
			if r.Method == http.MethodOptions {
				w.WriteHeader(http.StatusNoContent)
				return
			}
			next.ServeHTTP(w, r)
		})
	}
}

// ── Main ─────────────────────────────────────────────────────

func main() {
	cfg := loadConfig()

	app := &App{
		cfg:     cfg,
		started: time.Now(),
	}

	// DB connection (opsional — graceful jika tidak ada DATABASE_URL)
	if cfg.DatabaseURL != "" {
		pool, err := pgxpool.New(context.Background(), cfg.DatabaseURL)
		if err != nil {
			log.Printf("[go-api] WARNING: DB connection gagal: %v", err)
		} else {
			app.db = pool
			log.Printf("[go-api] PostgreSQL terhubung")
			defer pool.Close()
		}
	} else {
		log.Printf("[go-api] DATABASE_URL tidak di-set — berjalan tanpa DB")
	}

	addr := fmt.Sprintf(":%s", cfg.Port)
	log.Printf("[go-api] Asy-Syifaa Go API berjalan di http://localhost%s (env: %s)", addr, cfg.Env)

	srv := &http.Server{
		Addr:         addr,
		Handler:      app.routes(),
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatalf("[go-api] Server error: %v", err)
	}
}
