#!/usr/bin/env bash
set -euo pipefail

# Promote Variation 1, 2, or 3 to root ./index.html
# Usage: ./use-variation.sh <1|2|3> [--solo]

VAR="${1:-}"
SOLO="${2:-}"

if [[ "$VAR" != "1" && "$VAR" != "2" && "$VAR" != "3" ]]; then
  echo "Usage: ./use-variation.sh <1|2|3> [--solo]"
  echo "  1 = Musée du Dickbutt (Fine Art Retrospective)"
  echo "  2 = Dickbutt.ai (Silicon Valley AI Startup Parody)"
  echo "  3 = Classified Document Ambush + DVD Bounce"
  echo "  --solo = Hide the bottom variation switcher bar"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC="$SCRIPT_DIR/v${VAR}/index.html"
DEST="$SCRIPT_DIR/index.html"

python3 - "$SRC" "$DEST" "$VAR" "$SOLO" <<'PY'
import sys

src, dest, var, solo = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
with open(src, "r", encoding="utf-8") as f:
    html = f.read()

# Adjust root-relative attributes and asset paths for root index.html
html = html.replace('data-root="../"', 'data-root="./"')
html = html.replace("../assets/", "./assets/")

if solo == "--solo":
    html = html.replace('data-root="./"', 'data-root="./" data-hide-switcher="true"')

# Inject pre-paint trap & ?v= router into <head> so disguised trap links (?trap= / ?c=) always work from /
router = """  <script>
    (function () {
      var q = window.location.search;
      if (!q) return;
      var p = new URLSearchParams(q);
      if ((p.has("trap") || p.has("c")) && document.documentElement.getAttribute("data-variation") !== "3") {
        window.location.replace("./v3/" + q);
      } else if (p.get("v") === "1" || p.get("v") === "2" || p.get("v") === "3") {
        var target = p.get("v");
        if (document.documentElement.getAttribute("data-variation") !== target) {
          window.location.replace("./v" + target + "/");
        }
      }
    })();
  </script>
"""
html = html.replace("<head>\n", "<head>\n" + router, 1)

with open(dest, "w", encoding="utf-8") as f:
    f.write(html)

mode = "solo (switcher hidden)" if solo == "--solo" else "with variation switcher"
print(f"Updated index.html -> Variation {var} ({mode})")
PY
