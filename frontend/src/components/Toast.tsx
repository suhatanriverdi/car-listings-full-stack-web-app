import useFormStore from "@/store/FormStore";
import { useEffect } from "react";
import { timeout } from "../utils/timeout";
import { useNavigate } from "react-router-dom";

export default function Toast() {
  const { toastMessage, toastType, resetToast } = useFormStore();
  const navigate = useNavigate();

  useEffect(() => {
    async function backToHome() {
      await timeout(2000);
      resetToast();
      navigate("/");
    }

    async function backToLogin() {
      await timeout(2000);
      resetToast();
      navigate("/login");
    }

    async function showInfo() {
      await timeout(2000);
      resetToast();
    }

    if (toastType === "login-error") {
      showInfo();
    } else if (toastType === "info") {
      backToLogin();
    } else if (
      toastType === "success" ||
      toastType === "error" ||
      toastType === "logout-success"
    ) {
      backToHome();
    }
  }, [toastType]);

  // Toast mesajının rengini ayarla
  const getToastClass = () => {
    if (toastMessage) {
      switch (toastType) {
        case "success":
          return "bg-green-500";
        case "error":
          return "bg-rose-400";
        case "sending":
          return "bg-gray-400";
        case "login-error":
          return "bg-rose-400";
        case "logout-success":
          return "bg-sky-400";
        default:
          return "bg-sky-400";
      }
    }
    return "";
  };

  return (
    toastMessage &&
    toastType && (
      <div
        className={`fixed top-0 left-0 right-0 p-6 z-50 transition-all duration-500 ${getToastClass()} text-white text-center font-normal sm:text-lg`}
      >
        {toastMessage}
      </div>
    )
  );
}
