import { useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  onComplete?: () => void;  // Optional callback for the "Complete" button
};

const Modal = ({ isOpen, message, onClose, onComplete }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scroll when modal is open
    } else {
      document.body.style.overflow = "auto"; // Re-enable scroll when modal is closed
    }

    return () => {
      document.body.style.overflow = "auto"; // Restore scroll when the component unmounts
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg text-center border-2 border-[var(--main-color)]">
        <p className="text-2xl font-bold text-gray-800 mb-4">{message}</p>
        <div className="flex justify-center gap-4">

          {onComplete ? (
            <button
              onClick={() => {
                if (onComplete) onComplete();  // Call onComplete if provided
                onClose();  // Close modal after completing action
              }}
              className="bg-gradient-to-r from-red-500 to-[var(--main-color)] text-white px-6 py-2 rounded-full font-bold shadow-lg hover:scale-105 transition transform cursor-pointer"
            >
              確認
            </button>
          ): (
            <button
            onClick={onClose}
            className="bg-gradient-to-r from-blue-500 to-[var(--main-color)] text-white px-6 py-2 rounded-full font-bold shadow-lg hover:scale-105 transition transform cursor-pointer"
          >
            閉じる
          </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
