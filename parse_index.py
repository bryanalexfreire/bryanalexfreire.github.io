import sys
from bs4 import BeautifulSoup

filepath = r"c:\Users\User\OneDrive\bryanalexfreire\index.html"
with open(filepath, "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "lxml")

print("--- CSS FILES ---")
css_files = []
for link in soup.find_all("link", rel="stylesheet"):
    href = link.get("href")
    if href:
        css_files.append(href)
for css in sorted(list(set(css_files))):
    print(css)

print("\n--- JS FILES ---")
js_files = []
for script in soup.find_all("script"):
    src = script.get("src")
    if src:
        js_files.append(src)
for js in sorted(list(set(js_files))):
    print(js)

print("\n--- IMAGE FILES ---")
img_files = []
# 1. img src
for img in soup.find_all("img"):
    src = img.get("src")
    if src:
        img_files.append(src)
# 2. meta content with image paths (e.g., properties containing og:image, or twitter:image, or paths with image extensions)
# Let's extract meta tags where name or property has "image"
for meta in soup.find_all("meta"):
    prop = meta.get("property") or ""
    name = meta.get("name") or ""
    content = meta.get("content") or ""
    if "image" in prop.lower() or "image" in name.lower() or any(ext in content.lower() for ext in [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"]):
        if content:
            img_files.append(content)
# 3. SVG references (like use elements, or inline SVGs if any referenced paths, or symbols...)
# Check if there are <use href="..."> or xlink:href in svgs
for use in soup.find_all("use"):
    href = use.get("href") or use.get("xlink:href")
    if href:
        img_files.append(href)

for img in sorted(list(set(img_files))):
    print(img)

print("\n--- DATA-I18N KEYS ---")
i18n_keys = []
i18n_elements = soup.find_all(attrs={"data-i18n": True})
for el in i18n_elements:
    i18n_keys.append(el.get("data-i18n"))

print(f"Total attributes count: {len(i18n_keys)}")
distinct_keys = sorted(list(set(i18n_keys)))
print(f"Distinct keys count: {len(distinct_keys)}")
for key in distinct_keys:
    print(key)

