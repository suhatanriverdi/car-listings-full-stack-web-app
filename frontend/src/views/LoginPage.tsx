import { useLoginFormController } from "@/controllers/loginFormController";

const Login = () => {
  const { register, handleSubmit, errors, onSubmit, isLoggedIn } =
    useLoginFormController();

  return (
    <div className="flex px-[:px-[3rem] w-full max-w-[62rem] items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xs bg-white"
      >
        <h2 className="text-center mb-[4rem]">Log In</h2>

        <div className="mb-[0.5rem]">
          <label htmlFor="username" className="text-gray-700 mb-1">
            Username:
          </label>
          <input
            autoComplete="on"
            id="username"
            type="text"
            {...register("username")}
            className="w-full p-[0.5rem] mb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-button-bg"
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </div>

        <div className="mb-[2rem]">
          <label htmlFor="password" className="text-gray-700 mb-1">
            Password:
          </label>
          <input
            autoComplete="on"
            id="password"
            type="password"
            {...register("password")}
            className="w-full p-[0.5rem] mb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-button-bg"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className={`w-full p-[0.6rem] rounded-xl text-dark ${
            isLoggedIn
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-button-bg hover:bg-button-bg-light"
          }`}
          disabled={isLoggedIn}
        >
          {isLoggedIn ? "You are already logged in!" : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default Login;
