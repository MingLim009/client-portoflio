from pathlib import Path
import re

path = Path("src/data/works.ts")
text = path.read_text(encoding="utf-8")

header_old = """import type { DriveKind } from '../lib/drive'

export type WorkType = 'script' | 'video' | 'result'

export type WorkItem = {"""

header_new = """import type { DriveKind } from '../lib/drive'

export type WorkType = 'script' | 'video' | 'result'

export type WorkVertical =
  | 'iron-rise'
  | 'liver-support'
  | 'infoproducts'
  | 'telehealth'
  | 'direct-response'

export type WorkItem = {"""

if "export type WorkVertical =" not in text.split("export type WorkItem")[0]:
    text = text.replace(header_old, header_new, 1)
    text = re.sub(
        r"\nexport type WorkVertical =[\s\S]*?\| 'direct-response'\n",
        "\n",
        text,
        count=1,
    )

old_type = """  featured?: boolean
  market?: string
}"""
new_type = """  featured?: boolean
  market?: string
  /** Explicit market bucket — required for correct section placement */
  vertical: WorkVertical
}"""
if "vertical: WorkVertical" not in text:
    text = text.replace(old_type, new_type, 1)

rules = [
    (r"^meta-sfk-hub$", "infoproducts"),
    (r"^meta-liver-support$", "liver-support"),
    (r"^prostapime-retention$", "direct-response"),
    (r"^https-47", "infoproducts"),
    (r"^vision-vsl$", "direct-response"),
    (r"^prostate-vsl-us$", "direct-response"),
    (r"^zepbound-script$", "direct-response"),
    (r"^memory-advertorials$", "direct-response"),
    (r"^memocore-upsell$", "direct-response"),
    (r"^longform-scripts$", "direct-response"),
    (r"^liver-", "liver-support"),
    (r"^iron-", "iron-rise"),
    (r"^nad-", "telehealth"),
]


def vertical_for(work_id: str) -> str:
    for pat, vert in rules:
        if re.search(pat, work_id):
            return vert
    return "direct-response"


def add_vertical(block: str) -> str:
    m = re.search(r"id: '([^']+)'", block)
    if not m:
        return block
    work_id = m.group(1)
    if re.search(r"\bvertical:", block):
        return block
    vert = vertical_for(work_id)
    if re.search(r"market: '[^']*',", block):
        return re.sub(
            r"(market: '[^']*',)",
            rf"\1\n    vertical: '{vert}',",
            block,
            count=1,
        )
    return re.sub(
        r"(category: '[^']*',)",
        rf"\1\n    vertical: '{vert}',",
        block,
        count=1,
    )


works_match = re.search(
    r"export const works: WorkItem\[\] = \[(.*?)\n\]", text, flags=re.S
)
if not works_match:
    raise SystemExit("works array not found")

works_body = works_match.group(1)
parts = re.split(r"(?=\n  \{\n)", works_body)
new_parts = [add_vertical(p) for p in parts]
new_works_body = "".join(new_parts)
text = text[: works_match.start(1)] + new_works_body + text[works_match.end(1) :]

text = re.sub(
    r"export function getWorkVertical\(work: WorkItem\): WorkVertical \{[\s\S]*?\n\}",
    "export function getWorkVertical(work: WorkItem): WorkVertical {\n  return work.vertical\n}",
    text,
    count=1,
)

text = text.replace(
    """    id: 'nad-large-thumbnail',
    title: 'NAD+ — Retention / Thumbnail Media',
    type: 'video',
    function: 'Media Preview',
    category: 'Telehealth',
    market: 'NAD+',
    description:
      'Additional NAD+ media file — local preview. Drive link pending.',""",
    """    id: 'nad-large-thumbnail',
    title: 'NAD+ — Retention / Thumbnail Media',
    type: 'video',
    function: 'Telehealth Media',
    category: 'Telehealth',
    market: 'NAD+',
    description:
      'NAD+ telehealth retention / thumbnail media — local preview. Drive link pending.',""",
)

# Reorder vertical filters: Telehealth first among content markets for clarity
old_filters = """export const verticalFilters = [
  {
    id: 'all' as const,
    label: 'All markets',
    blurb: 'Every vertical in one view',
  },
  {
    id: 'iron-rise' as const,
    label: 'Iron Rise',
    blurb: 'Supplement market · men’s health',
  },
  {
    id: 'liver-support' as const,
    label: 'Liver Support',
    blurb: 'Supplement market · Verdaia',
  },
  {
    id: 'infoproducts' as const,
    label: 'Infoproducts',
    blurb: 'HTTPS-47 · SFK Hub',
  },
  {
    id: 'telehealth' as const,
    label: 'Telehealth',
    blurb: 'NAD+ scripts & creatives',
  },
  {
    id: 'direct-response' as const,
    label: 'Direct response',
    blurb: 'US VSLs, advertorials & retention',
  },
]"""

new_filters = """export const verticalFilters = [
  {
    id: 'all' as const,
    label: 'All markets',
    blurb: 'Every vertical in one view',
  },
  {
    id: 'telehealth' as const,
    label: 'Telehealth',
    blurb: 'NAD+ scripts & creatives',
  },
  {
    id: 'iron-rise' as const,
    label: 'Iron Rise',
    blurb: 'Supplement market · men’s health',
  },
  {
    id: 'liver-support' as const,
    label: 'Liver Support',
    blurb: 'Supplement market · Verdaia',
  },
  {
    id: 'infoproducts' as const,
    label: 'Infoproducts',
    blurb: 'HTTPS-47 · SFK Hub',
  },
  {
    id: 'direct-response' as const,
    label: 'Direct response',
    blurb: 'US VSLs, advertorials & retention',
  },
]"""

text = text.replace(old_filters, new_filters)

path.write_text(text, encoding="utf-8")
print("ok verticals", text.count("vertical:"))
