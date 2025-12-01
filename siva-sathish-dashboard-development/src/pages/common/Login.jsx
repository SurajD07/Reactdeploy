import { logIn } from "@/api/auth/authApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

//       <div className="col-span-12 md:col-span-6 flex items-center justify-center p-8 bg-white">
//         <div className="w-full max-w-md space-y-6">
//           <div className="text-center">
//             <h2 className="text-4xl font-bold text-gray-800">Sign In</h2>
//             <p className="text-sm text-gray-500">to continue your journey</p>
//           </div>

//           <div className="space-y-4">
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Email
//               </label>
//               <Input
//                 type="email"
//                 id="email"
//                 className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
//                 placeholder="example12@gmail.com  "
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <div className="mt-1 relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   className="block w-full rounded-md border border-gray-300 px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500"
//                   placeholder="••••••••"
//                 />
//                 <div
//                   className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500" />
//                   ) : (
//                     <AiOutlineEye className="h-5 w-5 text-gray-500" />
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-between items-center text-sm">
//               <label className="flex items-center space-x-2">
//                 <input type="checkbox" className="form-checkbox text-red-500" />
//                 <span className="text-gray-600">Remember Me</span>
//               </label>
//               <p className="text-red-500 hover:underline font-semibold">
//                 Forgot Password?
//               </p>
//             </div>

//             <Button
//               onClick={() => navigate("/dashboard")}
//               className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-medium transition"
//             >
//               Sign In
//             </Button>

//             <div className="flex items-center my-4">
//               <div className="flex-grow border-t border-gray-300" />
//               <span className="mx-2 text-sm text-gray-400">or</span>
//               <div className="flex-grow border-t border-gray-300" />
//             </div>

//             <Button
//               className="w-full flex items-center justify-center border bg-gray-50 border-gray-300 rounded-md py-2 hover:bg-gray-100 transition-all text-black
//             "
//             >
//               <img
//                 src="https://img.icons8.com/color/48/000000/google-logo.png"
//                 alt="Google"
//                 className="w-5 h-5 mr-2"
//               />
//               Sign in with Google
//             </Button>

//             <p className="text-center text-sm text-gray-500">
//               Don’t have an account?
//               <span className="text-red-500 hover:underline cursor-pointer ml-1">
//                 Sign up
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginErrors, setLoginErrors] = useState("");
  console.log(loginErrors);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const payload = {
        identifierKey: email,
        password: password,
        device_id: "1234",
        ip: "4321",
      };

      try {
        const response = await logIn(payload);
        console.log(response);
        localStorage.setItem("role", response.data.result.roleType);
        localStorage.setItem("token", response.data.result.tokens.accessToken);
        localStorage.setItem(
          "refreshToken",
          response.data.result.tokens.refreshToken
        );
        localStorage.setItem("userId", response.data.result.user._id);
        navigate("/dashboard");
      } catch (error) {
        console.log(error?.response?.data?.msg);
        setLoginErrors(error?.response?.data?.msg);
      }
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-12">
      <div className="hidden md:flex md:col-span-6 items-center justify-center bg-gradient-to-br from-red-800 via-red-600 to-red-800 text-white rounded-r-full p-10">
        <div className="space-y-6 text-center">
          <img
            src="https://logodix.com/logo/2266.jpg"
            alt="YouTube Logo"
            className="w-20 mx-auto rounded-2xl"
          />
          <h1 className="text-4xl font-bold">Welcome Back Creator!</h1>
          <p className="text-lg text-gray-200 mt-2">
            Log in to access your dashboard, manage content, and grow your
            audience.
          </p>
        </div>
      </div>

      <div className="col-span-12 md:col-span-6 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-800">Sign In</h2>
            <p className="text-sm text-gray-500 mt-2">
              to continue your journey
            </p>
          </div>

          {loginErrors && (
            <div className="text-center">
              <p className="text-red-600 text-sm mt-1">{loginErrors}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="example1@gmail.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Password"
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500" />
                  ) : (
                    <AiOutlineEye className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox text-red-500" />
                <span className="text-gray-600">Remember Me</span>
              </label>
              <p className="text-red-500 hover:underline font-semibold cursor-pointer">
                Forgot Password?
              </p>
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-medium transition"
            >
              Sign In
            </Button>

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300" />
              <span className="mx-2 text-sm text-gray-400">or</span>
              <div className="flex-grow border-t border-gray-300" />
            </div>

            <Button className="w-full flex items-center justify-center border bg-gray-50 border-gray-300 rounded-md py-2 hover:bg-gray-100 transition-all text-black">
              <img
                src="https://img.icons8.com/color/48/000000/google-logo.png"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Sign in with Google
            </Button>

            <p className="text-center text-sm text-gray-500">
              Don’t have an account?
              <span className="text-red-500 hover:underline cursor-pointer ml-1">
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
