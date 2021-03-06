import { useState } from "react";
import UseInput from "../hooks/useInput";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

function Register() {
  const router = useRouter();
  const [inputs, setInputs] = UseInput({
    fullname: "",
    email: "",
    password: "",
    role: "user",
  });

  const [errorMessage, setErorrMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/register`, inputs);
      router.push("/");
    } catch (error) {
      setErorrMessage(true);
    }
  };

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Register
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  name="fullname"
                  type="text"
                  required
                  value={inputs.fullname}
                  onChange={setInputs}
                  className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <input
                  name="email"
                  type="email"
                  required
                  value={inputs.email}
                  onChange={setInputs}
                  className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <input
                  name="password"
                  type="password"
                  required
                  value={inputs.password}
                  onChange={setInputs}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="mb-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                Register
              </button>
              <div className="text-center">
                <Link href="/">
                  <a className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                    Do you have an account? Login
                  </a>
                </Link>
              </div>
            </div>
          </form>
          <div className="mt-2 text-center text-red-700">
            {errorMessage ? "Bu email ile kayit mevcut" : ""}
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
