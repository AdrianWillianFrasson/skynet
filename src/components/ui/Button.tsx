export function Button({ className, onClick, ...props }: React.HTMLAttributes<HTMLButtonElement>) {
  return <button className={`btn ${className}`} onClick={onClick} {...props} />;
}
