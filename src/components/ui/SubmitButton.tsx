'use client'

import { useFormStatus } from 'react-dom'
import Button, { type TButtonProps } from './Button'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & TButtonProps

export default function SubmitButton({ children, ...props }: ButtonProps) {
  const { pending } = useFormStatus()
  return (
    <Button theme="primary" type="submit" disabled={pending} {...props}>
      {pending ? 'Waiting...' : children}
    </Button>
  )
}
