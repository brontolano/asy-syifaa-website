# ============================================================
# Asy-Syifaa Go API — Multi-stage Dockerfile
# Go 1.22 Alpine · Production-ready
# ============================================================

# ---------- Stage 1: builder ----------
FROM golang:1.22-alpine AS builder
WORKDIR /app

RUN apk add --no-cache git ca-certificates

COPY go.mod go.sum* ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o go-api .

# ---------- Stage 2: runner ----------
FROM alpine:3.19 AS runner
WORKDIR /app

RUN apk add --no-cache ca-certificates tzdata && \
    addgroup -g 1001 -S goapp && adduser -S goapp -u 1001

COPY --from=builder --chown=goapp:goapp /app/go-api ./go-api

USER goapp

EXPOSE 5000

HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:5000/api/health || exit 1

CMD ["./go-api"]
