#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
COMPOSE_FILE="${SCRIPT_DIR}/docker-compose.vps.yml"
ENV_FILE="${SCRIPT_DIR}/.env.vps"

if [[ ! -f "${ENV_FILE}" ]]; then
  echo "File ${ENV_FILE} belum ada."
  echo "Salin deploy/.env.vps.example menjadi deploy/.env.vps lalu isi nilainya."
  exit 1
fi

cd "${PROJECT_ROOT}"

echo "[1/4] Pull latest image base"
docker compose -f "${COMPOSE_FILE}" --env-file "${ENV_FILE}" pull || true

echo "[2/4] Build app image"
docker compose -f "${COMPOSE_FILE}" --env-file "${ENV_FILE}" build --no-cache erp-app

echo "[3/4] Start services"
docker compose -f "${COMPOSE_FILE}" --env-file "${ENV_FILE}" up -d

echo "[4/4] Health check container"
sleep 4
docker compose -f "${COMPOSE_FILE}" --env-file "${ENV_FILE}" ps

echo "Deploy selesai."
