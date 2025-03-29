import { FaFacebook, FaGoogle } from "react-icons/fa";

const Registation = ({
  formData,
  handleChange,
  handleSubmit,
  error,
  showPassword,
  setShowPassword,
}) => {
  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-8">
      <h2 className="text-center text-[24px] font-semibold">Sign up</h2>

      <button
        type="button"
        className="flex items-center justify-center gap-2 rounded-full border border-black/50 px-[110px] py-[16px]"
      >
        <FaFacebook className="text-blue-600" /> Sign up with Facebook
      </button>
      <button
        type="button"
        className="flex items-center justify-center gap-2 rounded-full border border-black/50 px-[110px] py-[16px]"
      >
        <FaGoogle className="text-red-500" /> Sign up with Google
      </button>

      <div className="flex items-center justify-center gap-2 text-gray-500">
        <hr className="flex-grow border-gray-500" /> OR{" "}
        <hr className="flex-grow border-gray-500" />
      </div>

      <div className="flex gap-2">
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          type="text"
          placeholder="First name"
          className="flex-1 rounded-md border border-black/50 p-2"
          required
        />
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          type="text"
          placeholder="Last name"
          className="flex-1 rounded-md border border-black/50 p-2"
          required
        />
      </div>

      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        type="email"
        placeholder="Email address"
        className="w-full rounded-md border border-black/50 p-2"
        required
      />

      <div className="relative">
        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="w-full rounded-md border border-black/50 p-2 pr-10"
          required
        />
        <button
          type="button"
          className="absolute right-2 top-2 text-sm text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {error && <p className="text-center text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        className="rounded-full bg-gray-400 px-[110px] py-[16px] text-white transition duration-300 ease-in-out hover:bg-black hover:text-white"
      >
        Sign up
      </button>
    </form>
  );
};

export default Registation;
