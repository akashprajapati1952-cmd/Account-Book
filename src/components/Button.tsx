export default function Button({
  type,
  children,
  handleClick,
}: {
  type: "submit" | "reset" | "button";
  children: string;
  handleClick?: () => void;
}) {
  return (
    <button
      type={type}
      onClick={handleClick}
      className="
        w-full
        rounded-xl
        bg-indigo-600
        px-4
        py-3

        font-semibold
        text-white

        shadow-sm

        transition-all
        duration-200

        hover:bg-indigo-700
        hover:shadow-md

        active:scale-[0.98]
      "
    >
      {children}
    </button>
  );
}