import { PropsWithChildren, useEffect } from 'react'


interface Props extends PropsWithChildren {
onClose: () => void
ariaLabelledBy?: string
}


export default function Modal({ onClose, ariaLabelledBy, children }: Props) {
useEffect(() => {
const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
document.addEventListener('keydown', onKey)
return () => document.removeEventListener('keydown', onKey)
}, [onClose])


return (
<div className="fixed inset-0 z-50 flex items-center justify-center p-5">
<div className="absolute inset-0 bg-black/30" aria-hidden onClick={onClose} />
<div role="dialog" aria-modal="true" aria-labelledby={ariaLabelledBy}
className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-lg">
{children}
</div>
</div>
)
}