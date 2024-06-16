import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <section className="pl-[10rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[5rem]">
          <h1 className="text-2xl font-semibold mb-4">Sign In</h1>

          <form onSubmit={submitHandler} className="container w-[40rem]">
            <div className="my-[2rem]">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            {isLoading && <Loader />}
          </form>

          <div className="mt-4">
            <p className="text-black">
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-pink-500 hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
        <img
          src="https://lh3.googleusercontent.com/pw/AP1GczNm7yr58K050BSVhgfkw4DF_k4VXnDfI_35K7Oz43SYoiEpjMQt_GrJ9sPhCuQk_fXWex8DJNDv0wg9f8Yy0AxCmdL7sHYOLiBIVZ6Vtp3X5eGviPyK8zF7kUgLuB9clFSjr3zf7Fe9rj7LwkpwnfTW-z72pqEOJMSuOD9DxEU0M1hybhTQHWGI9ds6xNxhfXd5rw0FzD02MOtLGjJczCYCR7_m5D_Ig8xMKbz9QlVJsJqpnUJCDpAXmz3VkBoosGTIJk9-srj1XkwOWXJ4GzyAxKju7_8QI_rWtiDQN_Ma1IXscQVhPTHOezT1JKyKalPTXLhb0OmZJJbmd9Hh2dXaA07cETezbMg1oO4JBtPnA9ecM-4tC3mAxB6xCyTZnQMq7kB1yhpORuftRF6f8fPM-lz4hMMSKQQNRGn4mGVgRp2EdhSRM8xjLVU17QmSWTCqmqAKsdGhWKZUSz7diMUoWoCk5h0T62_Y26NALjHoQDlyViCKSzMzx0YUgJeul124mA_quRskieSlyfRy8jD9-OJ3EosOhqYCGKNsJQTDTCe05FqTvgKQTxfXQlSz6-ZUPQu0rm1iR__l52pYYdRrZx3LLIAAGyAh8abTpJ2AReZxeGrcEEJHuyB0kc51nByZ2cOggtuiEYrXFf-UD7BN1-_25HiuVdbgMLbe8Yo7GuQbkyiy6fqSv6rHEqIl_fcS7Bh7CvjTgMD0lccNeivIWxa7FPLnPyQnSzTCCbYak_Ljw-3c4LZLRgv3kEVvTlnCxR-_kaKGgaf35Shj_n3tJ92lGuSWStx8Lv3YSUp8iioINgiBVBzi4g862pgrI8xye8TH_icPyJrj4R6d38vNIUdE1-j4Hx3sBsP2zNJCETmk4lL6nRxvUOdWlj80H_uYR4h38YsRyKjM0n15QRtpXOw=w687-h651-s-no-gm?authuser=0"
          alt=""
          className="h-[65rem] w-[59%] xl:block md:hidden sm:hidden rounded-lg"
        />
      </section>
    </div>
  );
};

export default Login;
