import re
import requests


FOLDER_URL = (
    "https://drive.google.com/drive/folders/"
    "1IsJ9cTomxRPrCrZbPHcJVbn8xWbn6sl8?usp=sharing"
)


def main():
    html = requests.get(FOLDER_URL, timeout=30).text
    print("html bytes:", len(html))

    patterns = {
        "file_d_view": r"/file/d/([a-zA-Z0-9_-]{10,})/view",
        "file_d_preview": r"/file/d/([a-zA-Z0-9_-]{10,})/preview",
        "uc_id": r"uc\\?id=([a-zA-Z0-9_-]{10,})",
        "download_id": r"download\\?id=([a-zA-Z0-9_-]{10,})",
        "id_param": r"id=([a-zA-Z0-9_-]{10,})",
    }

    for name, pat in patterns.items():
        found = sorted(set(re.findall(pat, html)))
        print(f"{name}: {len(found)}")
        for v in found[:8]:
            print(" ", v)

    idx = html.find("id=")
    if idx != -1:
        print("\nfirst 'id=' snippet:\n", html[idx - 120 : idx + 220])


if __name__ == "__main__":
    main()

