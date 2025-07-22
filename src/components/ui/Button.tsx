'use client'

export type TButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  theme?: 'primary' | 'secondary' | 'tertiary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export default function SubmitButton({ children, theme, size, ...props }: TButtonProps) {
  let themeClasses = ''
  switch (theme) {
    case 'primary':
      themeClasses = 'bg-blue-600 hover:bg-blue-700 text-white'
      break
    case 'secondary':
      themeClasses = 'bg-transparent border border-gray-300 hover:bg-gray-100 text-gray-700'
      break
    case 'tertiary':
      themeClasses = 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100'
      break
    case 'danger':
      themeClasses = 'bg-red-500 hover:bg-red-600 text-white'
      break
    default:
      themeClasses = 'bg-blue-600 hover:bg-blue-700 text-white'
  }
  switch (size) {
    case 'sm':
      themeClasses += ' text-xs px-2 py-1'
      break
    case 'md':
      themeClasses += ' text-sm px-5 py-3'
      break
    case 'lg':
      themeClasses += ' text-base px-6 py-4'
      break
    default:
      themeClasses += ' text-sm px-5 py-3'
  }
  return (
    <button {...props} className={`rounded-md disabled:opacity-50 disabled:cursor-not-allowed ${themeClasses}`}>
      {children}
    </button>
  )
}
