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
                            className="block text-sm font-medium text-white"
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

                    <div className="my-[2rem]">
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

                    <div className="my-[2rem]">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-white"
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
                src="https://lh3.googleusercontent.com/pw/AP1GczNKi-Hl1VqVoo0GrA187OV1-O6Olv_PNJBN5VBrNuiQSElsEugtmQiFOmUmbwHVpXM36TE1fYeD5zRoIAa3EzA7fW9wkFx-cNM3vqlUr8FnSBtkthuq3IyQT31EPSOtXzsJso9VGVHuCErn6szPtY0g8aqeUkvadv3tdifsW5bb9Mrp1425khgUQpa9I8Rvx1lyNI5aXABbmjXNjBmNiwseXoJ2vQcyWarXtCc1n_fU3WaV5CXXhf-mgRtrEGEUxtnTeM8FJ0Uwlsz5F8CX2NRY4e8RJS8zXl-cBjgRd6-tDe5LUtUqRB78lJ92gSGx-1fXQeUjRTQ1Fo7RFOXlTih4lqvx4q42TVzO1Z-KBKMnkMSs5SmiA0RnVPnxMJBHVpOTtvoiVk4cgScsDrW-TuD6CLAgrws6HoK_MluONzWbn9Jx_BrlTDmEMTAtv6dWIThCROZItqC6Moi1NgAgu3R75DOXWReydUaCmMeo8DQjU91XzbKMmyOKirgLg_W1BQ33oblG6_o1WpQ7HFhdq8m54-yK0_64iFBqQoADWudM3vCovsrI-KqShDDpEE-bFaF1xwYrKXhUSMvXUJ6FDLYWclxlbnBUQrVJWW67PmnTlGYUy3oAOJwqrT9YSQklJa5X-VsZUwW2WHuSMLlZCaaEP0ex9wPhh1_l9G4tBnAZDaJv9EgX3JrP_aVC-6fdChINCj5FRTsT-TQXT29CfbQ1HvZzVo5MOXxeEutw43YeO4zZXr3fNbFS-FPOZWRog76l4JXFMybH8v2c38t2A9ufyCYzuww8zoWXtylbMucSr_qQxusDJfV1bcq50j_vKzUBxp7D_Q4tsv3l92BCJzkobVdODw57G41Sz17r5JAEbTdbbVnm1b1Z07T3Gwwjh0jqiXIWzqf0WwVrfaNCQ9u8A3U=w687-h651-s-no-gm?authuser=0"
                alt=""
                className="h-[65rem] w-[59%] xl:block md:hidden sm:hidden rounded-lg"
            />
        </section>
    );
};

export default Register;
