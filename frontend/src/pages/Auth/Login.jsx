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
                className="block text-sm font-medium text-white"
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
                className="block text-sm font-medium text-white"
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
          src="https://lh3.googleusercontent.com/pw/AP1GczPmmYZWMJAmJGp3aruA3YApYZus4MwaarHJmaqylU2b_c9OxJwxGT9PQlZcuv0n-Q7XHGZYDoqNViMMVPzoHWbQXutYKaZQDoFCu8LLwBIXihsq4im_YN4faFNKTIUpwgWKTzxY6qo6qnYXkXNY2oBPmPCKUnM48VunDMzTDV4SYv97mrxgVRKzlAGg7NTZnnNaB4_ouUjXbrhoebWc_BeSoFSuUbwwFhR8dXrEbxOduZadNefveWjy9GpyrxW_Jkxb5AhAhs-A3GYdrfDTBCbNHTgsi6_x9Na7tVzNN9phv0mbjLT_uRxxxRNQ0k36pGbRv0O4o2ChplNHQ6K5D8i_VIcpnpFtog8MBFK4735xwcJe_YHfolR_UF4PTulBQThfBV0eGsFaWO2trT7rm3lgjlIOOhG0xfBK-D8XjP7PvFEYu5vJBTotcqlDKFH21ORAwpYgXBoeEjtakDndPPYzGpqC36FBiYKuT5q9kwyzec7ksbzXfMJ7GsX1cmy4c88rfcZpXj4EWeK1gQIdF6o3oexQs7jWPSh46JQdDJq4FQsWDRqp8qQGa2BWcjkW0auq7NgzFPfpXSTvD2f6YSr_DG-8lvLXlev6v9fEzDmgNm6-WQBEGgVrDh3YZtQKB9qKAgvZsj6309qsObDqby_vvtLX9ZIjogG7tesOaodkA4m16OXajXFtFW9uPdXzX6LdKEBluzJNGTxTNdaYGZ_PsYx8_0nvjr4djYGySg3L8rYQ1xTfeCaHQRlqr1KmuHe0duRDq00tMKWuSTaC0pV_3BwOr_uTF_u_CRuK5t14_Gku2aPNipVpV53h8yRl1UaXGC6Fa2nkxn-ydu66NonXGcz_WPTogO2wF9dsR9Mk0EEKq4ogK7Ffa58vIk37QBl6LaOh0TDfUjcPQNdI67RNlA=w687-h651-s-no-gm?authuser=0"
          alt=""
          className="h-[65rem] w-[59%] xl:block md:hidden sm:hidden rounded-lg"
        />
      </section>
    </div>
  );
};

export default Login;
