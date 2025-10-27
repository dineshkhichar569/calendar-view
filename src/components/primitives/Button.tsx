import { ButtonHTMLAttributes } from 'react'


type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
variant?: 'primary' | 'ghost' | 'danger'
}


export default function Button({ variant = 'primary', className = '', ...rest }: ButtonProps) {
const base = 'inline-flex items-center justify-center rounded px-3 py-1.5 text-sm transition focus-visible:ring-2'
const styles = {
primary: 'bg-primary-600 text-white hover:bg-primary-700',
ghost: 'bg-transparent text-gray-800 hover:bg-gray-100',
danger: 'bg-red-600 text-white hover:bg-red-700'
}[variant]
return <button className={`${base} ${styles} ${className}`} {...rest} />
}