import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Register = () => {
    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

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

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
        } else {
            try {
                const res = await register({ username, email, password }).unwrap();
                dispatch(setCredentials({ ...res }));
                navigate(redirect);
                toast.success("User successfully registered");
            } catch (err) {
                console.log(err);
                toast.error(err.data.message);
            }
        }
    };

    return (
        <section className="pl-[10rem] flex flex-wrap">
            <div className="mr-[4rem] mt-[5rem]">
                <h1 className="text-2xl font-semibold mb-4">Register</h1>

                <form onSubmit={submitHandler} className="container w-[40rem]">
                    <div className="my-[2rem]">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-black"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="mt-1 p-2 border rounded w-full"
                            placeholder="Enter name"
                            value={username}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

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

                    <div className="my-[2rem]">
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

                    <div className="my-[2rem]">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-black"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="mt-1 p-2 border rounded w-full"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button
                        disabled={isLoading}
                        type="submit"
                        className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
                    >
                        {isLoading ? "Registering..." : "Register"}
                    </button>

                    {isLoading && <Loader />}
                </form>

                <div className="mt-4">
                    <p className="text-black">
                        Already have an account?{" "}
                        <Link
                            to={redirect ? `/login?redirect=${redirect}` : "/login"}
                            className="text-pink-500 hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
            <img
                src="https://lh3.googleusercontent.com/pw/AP1GczOovxU4lKZn0Hc0tskDEpmCGcGUve441iwn4wiC84DF5cd08-vghDEbLg_6ll_UkWCzy2N5frV5O_3GLZmF5JQfZLspDxeLhLmeHqmiqkdMvOknm9KVcSLqe3fPn1vfgKxnEL9iYBeLP0ena7i2pQwb212lOCDEY7W-P5RLj2bd0hQFu0SWJMMzy-b3Uqgb1eH5lWhFCsoj6RPgN5hKzxh-v4LlEt6h6hnrp1mZXFFXOVls8TCIyccFWys-k6M26Qt6PbWK-f-sGmh-e3oKAN9aHkU450afA00ITlN4JZXOx1zSqxE-L4R_HTZGuS0v3ytH7lBB5lDCsBHrvnQ0zd8ImMxyJcDaecCBgOIEMHi2gI8DDn1dy3qdipF_OjWrB6KQ75xYO-zhHQT0WIuwFUFX6SIW_5sAsP2_RSjbZxknlU_KPqooEkx4mg3rwogxTDrLkU7APiWiTD_CTN1TzEHFPkjAiz2WJtapODLI4hX1y3IUJVvfWyHYtj4O0V0igSL_15x13ghOvyvu2N7pCb6mrtYdYUXdr0KpO2J7KLXY6NKFxD_kJCVkyRBjwc-d4oizKQZxy6UDliSg5Z_V0O0_3Bo7keHHZkLk8x1z6wnRcHtPbEkR-lIrZoGouEl4XuAa1_cIH9eu2TkdYmYFdHr1BNdMLUYjckWk43NzJork6dGsSf3zCf68y4gUHwi5NNujyU8Kg7NjjN2cGbmtKwJQEOS2shBAGxAzy6mNSTZvOFBfOzmv8UsvYS3WmCX-TwkgLlVgIv1VKJR0eyBLtACLU5ebEcRU6ZfaHtpZEwd2L1D2_OI3pFaRKebY4YyAzp1QcVFDmoh5HCfNp2dTvOrZ4tuWycRld5YRrDvSg3WBD1wFRv6kt4Sm2Rme0dAK4HWqsS_lqopG_Tnnt799rctnO0M=w687-h651-s-no-gm?authuser=0"
                alt=""
                className="h-[65rem] w-[59%] xl:block md:hidden sm:hidden rounded-lg"
            />
        </section>
    );
};

export default Register;
