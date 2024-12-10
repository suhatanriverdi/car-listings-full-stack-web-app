import { BASE_URL } from "@/config/endpoints";
import useFormStore from "@/store/FormStore";
import axios from "axios";

// Custom Hook
const useSubmitDataToBackend = () => {
  const { setToast } = useFormStore();
  const token = localStorage.getItem("token");

  const submit = async (data: Record<string, unknown>) => {
    // Form submission started
    setToast("Your data is sending...", "sending");

    try {
      const response = await axios.post(`${BASE_URL}/trade-in`, data, {
        headers: {
          "Content-Type": "application/json",
          // Pass the JWT in Authorization header
          Authorization: `Bearer ${token}`,
        },
      });

      // Success (handles any 2xx status code)
      if (response.status >= 200 && response.status < 300) {
        setToast(
          "Form saved successfully! Redirecting to home page...",
          "success"
        );
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setToast(
          "Axios Error: " + (error.response?.data || error.message),
          "error"
        );
      } else {
        setToast("Unexpected Error: " + error, "error");
      }
    }
  };

  return submit;
};

export default useSubmitDataToBackend;
