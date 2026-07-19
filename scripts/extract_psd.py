import os, re, json, sys
from psd_tools import PSDImage
from PIL import Image

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

SRC = r"C:\Users\konig\Desktop\Tenxlbanner.psd"
OUT = r"C:\Users\konig\Desktop\Uj portfolio\public\banner-layers"
os.makedirs(OUT, exist_ok=True)

psd = PSDImage.open(SRC)
W, H = psd.width, psd.height


def slug(s):
    s = re.sub(r"[^a-zA-Z0-9]+", "-", (s or "").strip().lower()).strip("-")
    return s or "layer"


manifest = {"width": W, "height": H, "layers": []}
idx = 0
for layer in psd:  # bottom -> top
    if not layer.is_visible():
        print("hidden, skip:", layer.name)
        continue
    try:
        img = layer.composite()
    except Exception as e:
        print("ERR compositing", layer.name, e)
        continue
    if img is None:
        print("empty, skip:", layer.name)
        continue
    img = img.convert("RGBA")
    canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    canvas.paste(img, (int(layer.left), int(layer.top)), img)
    fname = f"{idx:02d}-{slug(layer.name)}.png"
    canvas.save(os.path.join(OUT, fname))
    kb = round(os.path.getsize(os.path.join(OUT, fname)) / 1024)
    manifest["layers"].append(
        {"file": fname, "name": layer.name, "left": int(layer.left), "top": int(layer.top), "w": int(layer.width), "h": int(layer.height), "kb": kb}
    )
    print(f"saved {fname}  ({kb} KB)  bbox=({layer.left},{layer.top},{layer.width}x{layer.height})")
    idx += 1

with open(os.path.join(OUT, "manifest.json"), "w", encoding="utf-8") as f:
    json.dump(manifest, f, ensure_ascii=False, indent=2)
print("\n=== MANIFEST (", len(manifest["layers"]), "layers ) ===")
for l in manifest["layers"]:
    print(f"  {l['file']:<60} {l['w']}x{l['h']} @ ({l['left']},{l['top']})  {l['kb']}KB")
