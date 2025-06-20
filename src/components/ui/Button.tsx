export function Button({
  className,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`btn ${className}`} onClick={onClick} {...props} />;
}
