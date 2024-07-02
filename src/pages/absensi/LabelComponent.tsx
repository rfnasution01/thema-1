export function LabelComponent({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="flex gap-12">
      <p className="text-nowrap font-light">{label}:</p>
      <p className="text-nowrap font-bold">{value}</p>
    </div>
  )
}
