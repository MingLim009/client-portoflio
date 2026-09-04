import { useState, type ReactNode } from 'react'

type Props = {
  preview: ReactNode
  more?: ReactNode
  className?: string
}

export function ExpandableText({ preview, more, className }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className={className}>
      {preview}
      {more && open ? more : null}
      {more ? (
        <button
          type="button"
          className="text-btn expand-btn"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
        >
          {open ? 'Show less' : 'Read more'}
        </button>
      ) : null}
    </div>
  )
}
