import { useState, type ReactNode } from 'react'

type Props = {
  preview: ReactNode
  hook?: string
  more?: ReactNode
  className?: string
}

export function ExpandableText({ preview, hook, more, className }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className={className}>
      {preview}
      {more && open ? more : null}
      {more && !open && hook ? <p className="expand-hook">{hook}</p> : null}
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
