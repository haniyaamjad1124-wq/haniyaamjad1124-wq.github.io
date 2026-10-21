#!/usr/bin/env python3
"""Refresh the static GitHub Pages export from a completed managed build.

Run only after /home/ubuntu/haniyapm/dist/public has been freshly built.
This script changes files under portfolio-domain-deployment only; it does not
run a build, access Git/remotes/browser state, or modify the source project.
"""
from __future__ import annotations

import hashlib
import json
import re
import shutil
import subprocess
import sys
import zipfile
from pathlib import Path

BASE = Path('/home/ubuntu/portfolio-domain-deployment')
SITE = BASE / 'site'
DIST = Path('/home/ubuntu/haniyapm/dist/public')
ZIP_PATH = BASE / 'haniyamjad-github-pages-clean-entry.zip'
DOMAIN = 'https://haniyamjad.com'
OLD_IMAGE = '/manus-storage/async-images/NlIb39ngzMxyOePGhdJFas/image-1.webp'
NEW_IMAGE = '/images/india-journey.webp'
ROUTE_CANONICALS = {
    'index.html': '/',
    'work/index.html': '/work/',
    'reminiscence/index.html': '/reminiscence/',
    'about/index.html': '/about/',
}
HASHED_ASSET = re.compile(r'^.+-[A-Za-z0-9_-]{6,}\.(?:js|css)$', re.I)
MANAGED_TAG = re.compile(
    r'<script\b(?=[^>]*\bsrc\s*=\s*(["\'])/api/platform/config\.js\1)[^>]*>\s*</script\s*>',
    re.I,
)


def require(condition: bool, message: str) -> None:
    if not condition:
        raise RuntimeError(message)


def copy_tree_files(source: Path, destination: Path) -> None:
    """Copy static build files, omitting build-control/managed platform files."""
    if not source.exists():
        return
    for item in source.rglob('*'):
        if not item.is_file():
            continue
        rel = item.relative_to(source)
        parts = {part.lower() for part in rel.parts}
        if '__manus__' in parts or 'api' in parts or rel.name.lower() == 'manus-routes.json':
            continue
        target = destination / rel
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(item, target)


def add_canonical(html: str, href: str) -> str:
    tag = f'<link rel="canonical" href="{DOMAIN}{href}" />'
    pattern = re.compile(r'<link\b[^>]*\brel=["\']canonical["\'][^>]*>', re.I)
    if pattern.search(html):
        return pattern.sub(tag, html, count=1)
    head_end = re.search(r'</head\s*>', html, re.I)
    require(head_end is not None, 'HTML lacks closing </head> while adding canonical: ' + href)
    return html[:head_end.start()] + '    ' + tag + '\n  ' + html[head_end.start():]


def refresh() -> None:
    require(DIST.is_dir(), f'Fresh build directory does not exist: {DIST}')
    require((DIST / 'index.html').is_file(), 'Fresh build has no root index.html')
    for rel in ROUTE_CANONICALS:
        require((DIST / rel).is_file(), f'Fresh build is missing required route: {rel}')
    require((DIST / '404.html').is_file(), 'Fresh build has no 404.html')
    require((SITE / 'images' / 'india-journey.webp').is_file(),
            'Required retained India journey image is missing from site/images')

    # Remove stale hashed bundles first, so the final export cannot publish old bundles.
    assets = SITE / 'assets'
    if assets.exists():
        for file in assets.iterdir():
            if file.is_file() and HASHED_ASSET.match(file.name):
                file.unlink()
    SITE.mkdir(parents=True, exist_ok=True)

    # Copy all current HTML paths, including 404 and route pages. Unmatched legacy
    # redirect stubs already in SITE are intentionally retained.
    for source in DIST.rglob('*.html'):
        rel = source.relative_to(DIST)
        target = SITE / rel
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, target)

    # Copy current asset/font/static trees; exclusions apply to the export only.
    for name in ('assets', 'fonts', 'static', 'images'):
        copy_tree_files(DIST / name, SITE / name)
    for item in DIST.iterdir():
        if item.is_file() and item.suffix.lower() not in {'.html', '.js', '.css', '.map'}:
            if item.name.lower() not in {'manus-routes.json'}:
                shutil.copy2(item, SITE / item.name)

    # Reinstate domain markers and preserve existing SEO directives where present.
    (SITE / 'CNAME').write_text('haniyamjad.com\n', encoding='utf-8')
    (SITE / '.nojekyll').touch()
    # Restore required legacy SEO files from the pre-existing adapted export if
    # the new build did not provide replacements (normally it does not).
    for name in ('robots.txt', 'sitemap.xml'):
        candidate = DIST / name
        if candidate.is_file():
            shutil.copy2(candidate, SITE / name)

    # Transform all exported HTML and JavaScript, including retained legacy stubs.
    for path in SITE.rglob('*'):
        if not path.is_file() or path.suffix.lower() not in {'.html', '.js'}:
            continue
        text = path.read_text(encoding='utf-8')
        text = text.replace(OLD_IMAGE, NEW_IMAGE)
        text = MANAGED_TAG.sub('', text)
        if path.suffix.lower() == '.html':
            rel = path.relative_to(SITE).as_posix()
            if rel in ROUTE_CANONICALS:
                text = add_canonical(text, ROUTE_CANONICALS[rel])
        path.write_text(text, encoding='utf-8')

    # GitHub Pages can prefer /about.html over /about/index.html for /about.
    # Make the existing alias the real About page, redirecting only its literal
    # .html URL so extensionless requests render normally without a loop.
    about_index = (SITE / 'about' / 'index.html').read_text(encoding='utf-8')
    head = re.search(r'<head\b[^>]*>', about_index, re.I)
    require(head is not None, 'About page lacks opening <head> for about.html alias')
    about_alias = (
        about_index[:head.end()]
        + "<script>if (window.location.pathname === '/about.html') "
          "window.location.replace('/about' + window.location.search + window.location.hash);</script>"
        + about_index[head.end():]
    )
    (SITE / 'about.html').write_text(about_alias, encoding='utf-8')

    # These managed-only artifacts must not ship, regardless of build contents.
    for rel in ('api', '__manus__', 'manus-routes.json'):
        target = SITE / rel
        if target.is_dir():
            shutil.rmtree(target)
        elif target.exists():
            target.unlink()

    validate_site()
    create_zip_and_manifest()
    update_readme()


def validate_site() -> None:
    for name in ('CNAME', '.nojekyll', 'robots.txt', 'sitemap.xml'):
        require((SITE / name).is_file(), f'Required site file missing: {name}')
    require((SITE / 'CNAME').read_text(encoding='utf-8').strip() == 'haniyamjad.com',
            'CNAME must contain exactly haniyamjad.com')
    require((SITE / 'images/india-journey.webp').stat().st_size == 772034,
            'Retained India journey image size changed unexpectedly')

    root = (SITE / 'index.html').read_text(encoding='utf-8')
    visible = re.sub(r'<[^>]*>', ' ', root)
    visible = re.sub(r'\s+', ' ', visible).casefold()
    require('choose a shelf' not in visible, 'Root page still contains visible “Choose a shelf” text')
    require('shelf-label' not in root, 'Root page still contains .shelf-label markup')
    require('entry-bottom' not in root, 'Root page still contains .entry-bottom markup')
    links = re.findall(r'<a\b(?=[^>]*\bhref=["\']/work/?["\'])(?=[^>]*\bclass=["\'][^"\']*\bentry-work-link\b)[^>]*>', root, re.I)
    require(len(links) == 1, f'Expected exactly one entry-work-link anchor to /work, found {len(links)}')
    for rel, route in ROUTE_CANONICALS.items():
        html = (SITE / rel).read_text(encoding='utf-8')
        require(f'<link rel="canonical" href="{DOMAIN}{route}" />' in html,
                f'Canonical missing/incorrect in {rel}')
    for path in SITE.rglob('*'):
        if path.is_file() and path.suffix.lower() in {'.html', '.js'}:
            content = path.read_text(encoding='utf-8')
            require(OLD_IMAGE not in content, f'Legacy image URL remains in {path.relative_to(SITE)}')
            require(not re.search(r'<script\b[^>]*?/api/platform/config\.js', content, re.I),
                    f'Managed platform config script remains in {path.relative_to(SITE)}')
    validate_local_references()
    if shutil.which('node'):
        for path in SITE.rglob('*.js'):
            result = subprocess.run(['node', '--check', str(path)], text=True,
                                    stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
            require(result.returncode == 0, f'node --check failed for {path}: {result.stdout}')


def validate_local_references() -> None:
    """Check straightforward root-relative HTML/CSS references; ignore external/data URLs."""
    ref_re = re.compile(r'''(?:src|href)\s*=\s*["']([^"']+)["']|url\(\s*["']?([^"')]+)''', re.I)
    for source in SITE.rglob('*'):
        if not source.is_file() or source.suffix.lower() not in {'.html', '.css'}:
            continue
        text = source.read_text(encoding='utf-8', errors='replace')
        for match in ref_re.finditer(text):
            ref = (match.group(1) or match.group(2) or '').strip()
            if not ref or ref.startswith(('#', '//', 'http:', 'https:', 'data:', 'mailto:', 'tel:', 'javascript:')):
                continue
            ref = ref.split('#', 1)[0].split('?', 1)[0]
            if not ref:
                continue
            if ref.startswith('/'):
                target = SITE / ref.lstrip('/')
            else:
                target = source.parent / ref
            if target.is_dir() or ref.endswith('/'):
                target = target / 'index.html'
            require(target.is_file(), f'Broken local reference in {source.relative_to(SITE)}: {ref}')


def create_zip_and_manifest() -> None:
    files = sorted(p for p in SITE.rglob('*') if p.is_file())
    with zipfile.ZipFile(ZIP_PATH, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        for path in files:
            archive.write(path, path.relative_to(SITE).as_posix())
    manifest = {
        'domain': 'haniyamjad.com',
        'zip': ZIP_PATH.name,
        'site_root': 'site/',
        'files': [
            {'path': p.relative_to(SITE).as_posix(), 'bytes': p.stat().st_size,
             'sha256': hashlib.sha256(p.read_bytes()).hexdigest()}
            for p in files
        ],
    }
    (BASE / 'upload-manifest.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
    # Verify exact archive membership and byte-for-byte content against site/.
    with zipfile.ZipFile(ZIP_PATH, 'r') as archive:
        names = set(archive.namelist())
        expected = {p.relative_to(SITE).as_posix() for p in files}
        require(names == expected, 'ZIP membership does not match site files')
        bad = archive.testzip()
        require(bad is None, f'ZIP integrity failure at {bad}')
        for path in files:
            rel = path.relative_to(SITE).as_posix()
            require(archive.read(rel) == path.read_bytes(), f'ZIP content mismatch: {rel}')


def update_readme() -> None:
    path = BASE / 'README.md'
    content = path.read_text(encoding='utf-8') if path.exists() else '# Haniya Amjad GitHub Pages static deployment\n'
    content = content.replace('haniyamjad-github-pages.zip', ZIP_PATH.name)
    warning = ('\n> The earlier `haniyamjad-github-pages.zip` package is obsolete; use only '
               f'`{ZIP_PATH.name}` generated by this refresh.\n')
    content = re.sub(r'\n> The earlier `haniyamjad-github-pages\.zip` package is obsolete;.*?(?=\n\n|\Z)', '', content, flags=re.S)
    content = content.rstrip() + '\n\n' + warning
    path.write_text(content, encoding='utf-8')


if __name__ == '__main__':
    try:
        refresh()
    except Exception as exc:
        print(f'refresh_deployment: ERROR: {exc}', file=sys.stderr)
        raise
    print(f'Refreshed deployment package: {ZIP_PATH}')
