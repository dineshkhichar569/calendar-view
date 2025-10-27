import { SelectHTMLAttributes } from "react";
export default function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`rounded border px-2 py-1 ${props.className ?? ""}`}
    />
  );
}
