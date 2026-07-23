import { useEffect } from "react";
import { ImCross } from "react-icons/im";

interface AlertProps {
  alert: {
    type: string | null;
    message: string | null;
  };
  removeAlert: () => void;
}

function Alert({
  alert,
  removeAlert,
}: AlertProps) {
  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => {
        removeAlert();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [alert.message, removeAlert]);

  if (!alert.message) {
    return null;
  }

  let styles = "";

  if (alert.type === "success") {
    styles =
      "border-green-200 bg-green-50 text-green-800";
  } else if (alert.type === "warning") {
    styles =
      "border-yellow-200 bg-yellow-50 text-yellow-800";
  } else {
    styles =
      "border-red-200 bg-red-50 text-red-800";
  }

  return (
    <div
      className={`
        fixed
        bottom-5
        top-auto
        left-1/2
        z-999

        w-[95%]
        max-w-md

        -translate-x-1/2

        rounded-2xl

        border

        px-4
        py-3

        shadow-xl

        backdrop-blur-sm

        animate-in
        slide-in-from-top-2

        ${styles}
      `}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <p className="font-medium wrap-break-word">
            {alert.message}
          </p>
        </div>

        <button
          type="button"
          aria-label="Close notification"
          onClick={()=>removeAlert()}
          className="
            rounded-lg
            p-1

            hover:bg-black/5
          "
        >
          <ImCross size={12} />
        </button>
      </div>
    </div>
  );
}

export default Alert;