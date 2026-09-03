type Props = {
  value: string
  label: string
  detail: string
  tone?: 'blue' | 'mint'
}

export function ResultCardMedia({
  value,
  label,
  detail,
  tone = 'blue',
}: Props) {
  return (
    <div className={`result-card-media tone-${tone}`} aria-hidden="true">
      <p className="result-card-label">{label}</p>
      <p className="result-card-value">{value}</p>
      <p className="result-card-detail">{detail}</p>
    </div>
  )
}
