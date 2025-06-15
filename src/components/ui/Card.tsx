export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`card card-border size-fit p-4 shadow border border-base-300 overflow-auto ${className}`}
      {...props}
    />
  );
}
