import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Spinner } from "@material-tailwind/react";

const Registation = ({
  formData,
  handleChange,
  handleSubmit,
  error,
  showPassword,
  setShowPassword,
  setFormData,
  loading,
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
      <div className="mt-[-18px] inline-flex items-center gap-2">
        <label
          htmlFor="check2"
          className="relative flex cursor-pointer items-center"
        >
          <input
            type="checkbox"
            name="isAdmin"
            id="check2"
            checked={formData.role === "admin"}
            onChange={handleChange}
            className="border-slate-300 peer h-5 w-5 appearance-none rounded border shadow transition-all checked:border-red-600 checked:bg-red-600 hover:shadow-md"
          />
          <span className="pointer-events-none absolute left-[4px] top-1/2 -translate-y-1/2 transform text-white opacity-0 peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
        </label>

        <span
          className="cursor-pointer select-none text-sm text-gray-700"
          onClick={() =>
            setFormData((prev) => ({ ...prev, isAdmin: !prev.isAdmin }))
          }
        >
          Register as Admin
        </span>
      </div>

      {error && <p className="text-center text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center rounded-full bg-gray-400 px-[110px] py-[16px] text-white transition duration-300 ease-in-out hover:bg-black hover:text-white"
      >
        {loading && (
          <span className="text-red-500">
            <Spinner className="mr-3 h-8 w-8 text-white" />
          </span>
        )}

        {loading ? "Processing..." : "Sign up"}
      </button>
    </form>
  );
};

export default Registation;
