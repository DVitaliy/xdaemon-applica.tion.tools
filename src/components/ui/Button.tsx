'use client'

export type TButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  theme?: 'primary' | 'secondary' | 'tertiary'
}

export default function SubmitButton({ children, ...props }: TButtonProps) {
  return (
    <button {...props} className="__button" data-theme={props.theme ?? 'default'}>
      {children}
    </button>
  )
}
