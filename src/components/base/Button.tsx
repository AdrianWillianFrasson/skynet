export function Button({
  onClick,
}: {
  onClick?: () => void;
}) {
  return (
    <button
      className="flex bg-gray-400 rounded border cursor-pointer p-4"
      type={"button"}
      onClick={onClick}
    >
      lul
    </button>
  );
}
