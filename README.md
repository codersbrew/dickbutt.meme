# dickbutt.meme

Static comedy site celebrating **20 Years of Dickbutt (2006–2026)** — originally drawn by K.C. Green in *Horribleville* (*"Tree. You've been good to us."*, July 2, 2006).

Includes **3 complete variations** with a floating switcher dock (`1` / `2` / `3` keys or bottom pill):

1. **`/v1/` — Musée du Dickbutt (Fine Art Retrospective)**
   Gilded museum shadowbox with interactive **Golden Ratio (`φ = 1.618`) overlay**, **420 kV X-Ray Conservation Scan**, **Curator's Audio Guide (#69)**, provenance chronology, and printable Certificate of Contemplation.
2. **`/v2/` — Dickbutt.ai (`buttctl` Enterprise Cloud Parody)**
   Silicon Valley Series B AI/DevTools parody featuring an interactive **`buttctl` browser terminal**, `curl -sL https://dickbutt.meme/ascii.txt` CLI art, Standup Derailment ROI slider, and `$69/seat/mo` Pro tier.
3. **`/v3/` — Classified Vault Ambush + Bouncing DVD Dickbutt**
   Disguised corporate encrypted-document gate (`AES-256-GCM`) that unseals into a stroke-by-stroke Dickbutt pen animation + *Thus Spake Zarathustra* synth fanfare, a **Bouncing DVD Dickbutt** physics arcade (with exact corner-hit mode!), and a **Custom Disguised Trap Link Builder** (`?trap=comp`, `?c=...`).

---

## Locking In a Single Default Variation

By default, `/` (`index.html`) serves Variation 1 with the bottom Variation Switcher enabled (while automatically routing `?trap=...` links straight to Variation 3's disguised gate).

To promote any variation to `/` (and optionally hide the switcher bar):

```bash
# Set Variation 2 as root index.html (keep switcher visible)
./use-variation.sh 2

# Set Variation 3 as root index.html and hide the variation switcher
./use-variation.sh 3 --solo
```

---

## Custom Domain DNS Setup (`dickbutt.meme` on GitHub Pages)

> **Important `.meme` TLD Note:** `.meme` is a Google Registry **HSTS-preloaded** TLD (HTTPS is strictly required by all browsers). Once DNS propagates, wait a few minutes for GitHub Pages to finish provisioning the Let's Encrypt certificate and enable **Enforce HTTPS**.

### 1. Update DNS Records (GoDaddy)

Remove the default GoDaddy parked `A` records (`3.33.130.190`, `15.197.148.33`) and add:

| Type | Name / Host | Value / Points To | TTL |
| :--- | :--- | :--- | :--- |
| `A` | `@` | `185.199.108.153` | 600 / 1 hr |
| `A` | `@` | `185.199.109.153` | 600 / 1 hr |
| `A` | `@` | `185.199.110.153` | 600 / 1 hr |
| `A` | `@` | `185.199.111.153` | 600 / 1 hr |
| `AAAA` | `@` | `2606:50c0:8000::153` | 600 / 1 hr |
| `AAAA` | `@` | `2606:50c0:8001::153` | 600 / 1 hr |
| `AAAA` | `@` | `2606:50c0:8002::153` | 600 / 1 hr |
| `AAAA` | `@` | `2606:50c0:8003::153` | 600 / 1 hr |
| `CNAME` | `www` | `codersbrew.github.io` | 600 / 1 hr |

### 2. Attach Custom Domain on GitHub Pages

Once the DNS records are saved, attach `dickbutt.meme` via `gh` CLI (or under **Settings → Pages → Custom domain**):

```bash
gh api -X PUT repos/codersbrew/dickbutt.meme/pages \
  -f cname="dickbutt.meme" \
  -f build_type="workflow"
```

After GitHub finishes issuing the TLS certificate (~5–15 minutes), enforce HTTPS:

```bash
gh api -X PUT repos/codersbrew/dickbutt.meme/pages \
  -f cname="dickbutt.meme" \
  -f build_type="workflow" \
  -F https_enforced=true
```

---

## Local Preview

```bash
python3 -m http.server 8080
# Open http://localhost:8080
```
