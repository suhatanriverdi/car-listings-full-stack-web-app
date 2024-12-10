import { useForm } from "react-hook-form";
import { z } from "zod";
import { jwtDecode } from "jwt-decode";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ENDPOINTS } from "@/config/endpoints";
import useLoginStore from "@/store/LoginStore";
import useFormStore from "@/store/FormStore"; // Import FormStore

// Define Zod schema for form validation
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export const useLoginFormController = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const { setLogin, isLoggedIn } = useLoginStore();
  const { setToast } = useFormStore();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      // Send login request
      const response = await axios.post(ENDPOINTS.login, data);

      // Check if access token exists
      const token = response.data.access_token;
      if (token) {
        // Get userId
        const decodedToken = jwtDecode(token) as { userId: number };
        const userId = decodedToken.userId.toString();
        // Store token in localStorage
        setLogin(token, userId);
        // Show success toast and navigate to homepage
        setToast("Login Successful !", "success");
      }
    } catch (error: unknown) {
      // Show error toast in case of a failed login attempt
      if (axios.isAxiosError(error)) {
        setToast(
          error.response?.data.message || "Login failed. Please try again.",
          "login-error"
        );
      } else {
        setToast(
          "An unexpected error occurred. Please try again.",
          "login-error"
        );
      }
    }
  };

  return { register, handleSubmit, errors, onSubmit, isLoggedIn };
};
