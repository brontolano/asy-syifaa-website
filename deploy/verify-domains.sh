#!/usr/bin/env bash
set -euo pipefail

DOMAINS=(
  "https://erp.asy-syifaa.com"
  "https://dashboard.asy-syifaa.com"
  "https://dashboard.asy-syifaa.com/dashboard?module=website"
  "https://dashboard.asy-syifaa.com/dashboard?module=perpustakaan"
  "https://perpustakaan.asy-syifaa.com"
  "https://asy-syifaa.com"
  "https://asy-syifaa.com/login"
)

for url in "${DOMAINS[@]}"; do
  code="$(curl -k -L -s -o /dev/null -w "%{http_code}" "${url}")"
  echo "${code} ${url}"
done
