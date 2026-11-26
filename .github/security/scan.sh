#!/usr/bin/env bash
set -euo pipefail

# Run from the checkout root. Use the same revision range for patches and metadata.
range=${1:?Pass a commit or base..head range}
tip=${range##*..}
[[ "$tip" =~ ^[0-9a-f]{40}$ && ( "$range" == "$tip" || "$range" =~ ^[0-9a-f]{40}\.\.[0-9a-f]{40}$ ) ]] || exit 2
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
touch "$tmp/ignore"
options=(--config .github/security/gitleaks.toml --redact=100 --no-banner --ignore-gitleaks-allow --gitleaks-ignore-path "$tmp/ignore" --exit-code 10)

scan() {
  local mode=$1
  shift
  local status=0
  gitleaks "$mode" "${options[@]}" "$@" >/dev/null 2>&1 || status=$?
  case "$status" in
    0) ;;
    10) echo 'Sensitive data detected. Inspect the range locally with Gitleaks redaction enabled.' >&2; exit 1 ;;
    *) echo 'Gitleaks did not complete. Check the scanner installation and configuration.' >&2; exit 2 ;;
  esac
}

# Include merge diffs so changes introduced during conflict resolution are covered.
scan git --log-opts="-m $range" .
# Stream NUL-delimited filenames, messages and raw identities, including both rename paths.
git -c core.quotePath=false log -m --root --no-renames --name-only -z --format='%an%n%ae%n%cn%n%ce%n%B' "$range" | tr '\000' '\n' | scan stdin
