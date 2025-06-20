export function InputText({
  className,
  value,
  onChange,
}: {
  className?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  function customOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event?.target?.value;

    if (onChange) {
      onChange(newValue ?? "");
    }
  }

  return (
    <input className={`input ${className}`} onChange={customOnChange} type={"text"} value={value} />
  );
}
