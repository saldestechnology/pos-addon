import { IoMdClose } from "react-icons/io";

export default function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-500 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-gray-50 hover:text-gray-900 active:scale-95"
    >
      <IoMdClose size={20} />
    </button>
  );
}
