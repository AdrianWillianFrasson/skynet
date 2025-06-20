export function Select({
  className,
  value,
  options,
  onChange,
}: {
  className?: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  function customOnChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newValue = event?.target?.value;

    if (onChange) {
      onChange(newValue ?? "");
    }
  }

  return (
    <select
      className={`select ${className}`}
      defaultValue={options?.[0]}
      onChange={customOnChange}
      value={value}>
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
}
