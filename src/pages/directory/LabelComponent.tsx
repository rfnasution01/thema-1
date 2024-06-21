export function LabelComponent({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex gap-12">
      <p className="w-3/5">{label}</p>
      <p className="w-2/5">: {value}</p>
    </div>
  )
}
