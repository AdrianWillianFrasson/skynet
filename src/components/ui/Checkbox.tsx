export function Checkbox({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className="checkbox" type={"checkbox"} {...props} />;
}
