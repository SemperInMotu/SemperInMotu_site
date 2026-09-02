"""One-off: Heritavia moved to heritavia.vitalykhoruzhko.com.

Replaces the old /heritage/ pages with redirect stubs. public/_redirects gives a
real 301 on hosts that support it; the stubs are the fallback for plain static
hosting. Safe to delete once the old URLs have dropped out of the index."""

import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1]
TARGET = "https://heritavia.vitalykhoruzhko.com"

PAGES = ["index.html", "research.html", "report.html", "start.html"]
# "en" mirrors the English root, so its pages point at the target's root locale.
LOCALES = {"": "", "ru": "/ru", "be": "/be", "en": ""}

STUB = """<!doctype html>
<html lang="{lang}">
  <head>
    <meta charset="utf-8" />
    <title>Heritavia has moved</title>
    <link rel="canonical" href="{target}" />
    <meta http-equiv="refresh" content="0; url={target}" />
    <meta name="robots" content="noindex,follow" />
  </head>
  <body>
    <p>Heritavia now lives at <a href="{target}">{target}</a>.</p>
  </body>
</html>
"""

for locale, prefix in LOCALES.items():
    folder = ROOT / locale / "heritage" if locale else ROOT / "heritage"
    folder.mkdir(parents=True, exist_ok=True)
    for stale in folder.iterdir():
        if stale.is_file() and stale.name not in PAGES:
            stale.unlink()
    for page in PAGES:
        target = f"{TARGET}{prefix}/" if page == "index.html" else f"{TARGET}{prefix}/{page}"
        lang = "be-tarask" if locale == "be" else (locale or "en")
        (folder / page).write_text(STUB.format(lang=lang, target=target), encoding="utf-8")
    print(f"{folder.relative_to(ROOT)} -> {TARGET}{prefix}/")

redirects = ROOT / "public" / "_redirects"
redirects.write_text(
    "\n".join(
        [
            "# Heritavia moved to its own subdomain.",
            f"/heritage/*     {TARGET}/:splat        301!",
            f"/ru/heritage/*  {TARGET}/ru/:splat     301!",
            f"/be/heritage/*  {TARGET}/be/:splat     301!",
            f"/en/heritage/*  {TARGET}/:splat        301!",
            "",
        ]
    ),
    encoding="utf-8",
)
print(f"{redirects.relative_to(ROOT)}")
