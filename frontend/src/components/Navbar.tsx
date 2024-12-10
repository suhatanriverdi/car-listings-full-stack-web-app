import { useNavigate } from "react-router-dom";
import useCarStore from "@/store/CarStore";
import useLoginStore from "@/store/LoginStore";
import { useCurrentPath } from "@/services/providers/LocationProvider";
import useFormStore from "@/store/FormStore";

export default function Navbar() {
  const pathname = useCurrentPath();
  const navigate = useNavigate();
  const { selectedCar } = useCarStore();
  const { isLoggedIn, logout } = useLoginStore(); // Use logout from the store
  const { setToast } = useFormStore();

  // Determine the title for the current page
  const getCurrentTitle = () => {
    switch (pathname) {
      case "/":
        return <p>Car Listing</p>;
      case "/trade":
        return <p>Trade-In Form</p>;
      default:
        if (pathname.includes("/details") && selectedCar !== null) {
          return (
            <div>
              <span className="font-normal">{selectedCar.make}</span>{" "}
              <span>{selectedCar.model}</span>{" "}
            </div>
          );
        }
        return null;
    }
  };

  // Handle login/logout based on current state
  const handleLoginLogout = () => {
    if (pathname === "/login") {
      // If on the login page, navigate to home page
      navigate("/");
    } else if (isLoggedIn) {
      // If logged in, call logout and navigate to home page
      setToast(
        `Logout Successful !${pathname !== "/" ? " Redirecting to Home..." : ""}`,
        "logout-success"
      );
      logout();
      // navigate("/");
    } else {
      // If not logged in, navigate to login page
      navigate("/login");
    }
  };

  return (
    <div className="flex sticky z-[2] text-[18px] top-0 h-[4rem] sm:h-[100px] px-[2rem] sm:px-[3rem] max-w-[62rem] bg-white w-full justify-between items-center">
      {/* Current page title */}
      <div className="flex items-center h-full">{getCurrentTitle()}</div>

      {/* Login/Logout button */}
      <div
        onClick={handleLoginLogout}
        className="flex items-center justify-center h-full cursor-pointer hover:text-button-bg-dark"
      >
        {pathname === "/login" ? (
          "Home"
        ) : (
          <>
            <div>{isLoggedIn ? "Log Out" : "Log In"}</div>
            {/* Display avatar */}
            {isLoggedIn && (
              <div className="relative flex ml-2 mb-1 w-[16px] h-[16px]">
                <div className="absolute z-10 w-[16px] h-[16px] rounded-full bg-lime-400"></div>
                <div className="absolute w-[16px] h-[16px] rounded-full bg-lime-400 animate-ping duration-2000"></div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
