export function TextComponent({
  value,
  label,
}: {
  value: string
  label: string
}) {
  return (
    <div className="flex gap-24">
      <p className="w-1/2">{label}</p>
      <p className="w-1/2">: {value}</p>
    </div>
  )
}
