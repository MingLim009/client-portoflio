from pathlib import Path

import cv2


SRC_DIR = Path(__file__).resolve().parents[1] / "public" / "videos"
OUT_DIR = Path(__file__).resolve().parents[1] / "public" / "thumbnails"
OUT_DIR.mkdir(parents=True, exist_ok=True)

VIDEO_FILES = [
    "30Talkingheadhook2mov4TOF30ScriptPersona_Supplementfatiguedwoman4055Angle_TheEnergyGraveyard3HooksWomen40Frameio (1).mp4",
    "AD149v2_NAD_FILHA_FINAL.mp4",
    "Script1.mp4",
    "Script2.mp4",
    "Script3.mp4",
    "large-thumbnail20250307-4035589-1m3s24m.mp4",
]


def extract_thumb(video_path: Path, out_path: Path) -> bool:
    cap = cv2.VideoCapture(str(video_path))
    if not cap.isOpened():
        return False

    fps = cap.get(cv2.CAP_PROP_FPS)
    # grab frame at ~1 second (fallback to frame 0)
    target_frame = int(round(fps * 1.0)) if fps and fps > 0 else 30
    cap.set(cv2.CAP_PROP_POS_FRAMES, target_frame)
    ok, frame = cap.read()
    if not ok:
        cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
        ok, frame = cap.read()

    cap.release()
    if not ok:
        return False

    thumb = cv2.resize(frame, (640, 400), interpolation=cv2.INTER_AREA)
    cv2.imwrite(str(out_path), thumb)
    return True


def main() -> None:
    for name in VIDEO_FILES:
        src = SRC_DIR / name
        if not src.exists():
            print("missing", name)
            continue
        out_name = name.replace(".mp4", "").replace(" ", "_") + ".png"
        out_path = OUT_DIR / out_name
        ok = extract_thumb(src, out_path)
        print(("wrote" if ok else "failed"), out_path.name)


if __name__ == "__main__":
    main()

