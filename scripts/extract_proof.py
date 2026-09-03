import shutil
from pathlib import Path
import pymupdf

base = Path(r"d:\Project - workana\Portfolio- task\Data")
pub = Path(r"d:\Project - workana\Portfolio- task\public\proof")
pub.mkdir(parents=True, exist_ok=True)

# Copy ads proof image
src = base / "image.png"
if src.exists():
    shutil.copy(src, pub / "meta-ads-proof.png")
    print("copied meta-ads-proof.png")

# Render key PDF pages as images for the site
renders = [
    ("Benjamin Rhuan - Creative Strategist (1).pdf", [0, 1], "application"),
    ("Portfolio_Benjamin_Rhuan.pdf", [0, 1, 2], "portfolio"),
]

for filename, pages, prefix in renders:
    path = base / filename
    if not path.exists():
        continue
    doc = pymupdf.open(path)
    for pi in pages:
        if pi >= doc.page_count:
            continue
        page = doc[pi]
        pix = page.get_pixmap(matrix=pymupdf.Matrix(1.5, 1.5), alpha=False)
        out = pub / f"{prefix}-page-{pi + 1}.png"
        pix.save(str(out))
        print("rendered", out.name, pix.width, "x", pix.height)

print("done")
