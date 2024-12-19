import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import notify from "../../hooks/useNotification";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/reducers/authSlice";

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [searchParams] = useSearchParams();

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
    });

    const initialValues = {
        email: "",
        password: "",
    };

    const handleLogin = async (values, { setSubmitting }) => {
        const role = searchParams.get("role");
        const apiUrl = role === "Admin" ? "/admin/login" : "/users/login";

        try {
            const result = await dispatch(
                loginUser({ loginData: values, apiUrl })
            ).unwrap();

            if (result) {
                if (result?.admin) {
                    notify(`Welcome ${result?.admin?.fullName || "Admin"} ! Login Successful.`, "success");
                    navigate(role === 'Admin' ? '/admin-dash' : '/user-dash');
                    return;
                }
                else if (!result?.user?.isActive) {
                    navigate('/set-password', {
                        state: {
                            email: values.email,
                            token: result?.token || "",
                        }
                    });
                    notify(`Account inactive! Please set your password to activate your account.`, "success");
                    return;
                }

                // If active, proceed with login
                notify(`Welcome ${result?.user?.fullName || "User"} ! Login Successful.`, "success");
                navigate(role === 'Admin' ? '/admin-dash' : '/user-dash');
            } 
            else {
                notify("Login failed. Please check your credentials or your chosen role.", "error");
            }
        } catch (error) {
            notify(error.error , "error");
        } finally {
            setSubmitting(false);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleLogin,
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-900 p-4">
            <div className="bg-[#043250] text-white p-8 m-4 sm:p-10 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Login</h2>
                <p className="text-center mb-10 text-sm sm:text-base">
                    Welcome Back! Please Login to Your Account
                </p>
                <form onSubmit={formik.handleSubmit}>
                    <div className="relative z-0 w-full mb-10 group">
                        <input
                            type="email"
                            id="email"
                            className="block py-2.5 px-0 w-full text-sm sm:text-base bg-transparent border-0 border-b-2 border-white focus:outline-none focus:ring-0 focus:border-white peer"
                            {...formik.getFieldProps("email")}
                            placeholder=""
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="bg-white text-[#021826] p-2 my-1 text-sm rounded-lg">
                                {formik.errors.email}
                            </p>
                        )}
                        <label
                            htmlFor="email"
                            className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Email address
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-10 group">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            id="password"
                            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-white focus:outline-none focus:ring-0 focus:border-white peer"
                            {...formik.getFieldProps("password")}
                            placeholder=""
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className="bg-white text-[#021826] p-2 my-1 text-sm rounded-lg">
                                {formik.errors.password}
                            </p>
                        )}
                        <label
                            htmlFor="password"
                            className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Password
                        </label>
                        <div
                            className="absolute right-0 top-3 cursor-pointer text-white"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                            {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 mt-4 bg-[#021826] hover:bg-[#0A1C26] text-white rounded-xl transition text-sm"
                    >
                        {loading ? (
                            <i className="fas fa-spinner fa-spin mx-2"></i>
                        ) : (
                            "Login"
                        )}
                    </button>
                    <div className="text-right mt-2">
                        <Link to="/forget-pass" className="text-sm text-[#021826] font-bold hover:underline">
                            Forget Password?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
