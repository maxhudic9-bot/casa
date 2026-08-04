import type { ReactNode } from "react"

export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <mark className="rounded bg-ribelle-yellow/60 px-1 py-0.5 font-normal text-ribelle-black dark:bg-ribelle-yellow/30 dark:text-ribelle-yellow">
      {children}
    </mark>
  )
}

export function LegalPage({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-display text-3xl font-semibold">{title}</h1>
      <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert [&_h2]:mt-10 [&_h2]:mb-2 [&_h2]:border-b [&_h2]:pb-1 [&_h2]:text-lg [&_h2]:font-semibold [&_p]:my-1 [&_ul]:my-1">
        {children}
      </div>
    </div>
  )
}

export function LegalNotice({ children }: { children: ReactNode }) {
  return (
    <div className="mt-12 rounded-md border border-dashed border-ribelle-gold/60 p-4 text-sm text-muted-foreground">
      {children}
    </div>
  )
}
