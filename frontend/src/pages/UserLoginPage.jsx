import { useForm } from "react-hook-form";
import { useLoginMutation } from "../store";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function UserLoginPage() {
  const { register, handleSubmit } = useForm();
  const [login, result] = useLoginMutation();
  const navigate = useNavigate();

  const submitForm = (data) => {
    login(data);
    navigate("/"); // Temporary. Eventually this should redirect to where the user was trying to go.
  };

  return (
    <div className="flex items-center justify-center h-full">
      <form
        onSubmit={handleSubmit(submitForm)}
        className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block mb-2 font-bold text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            {...register("username")}
            required
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 font-bold text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            required
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
