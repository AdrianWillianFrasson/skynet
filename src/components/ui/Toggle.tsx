// import { MdCheck, MdClear } from "react-icons/md";

export function Toggle({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="toggle text-white bg-gray-300 checked:bg-blue-400"
      type={"checkbox"}
      {...props}
    />
  );
}
