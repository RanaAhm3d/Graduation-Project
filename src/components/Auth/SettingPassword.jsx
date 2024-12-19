import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Lock from "../../assets/Lock.png";
import api from "../../api/baseUrl";
import notify from "../../hooks/useNotification";
import { useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SettingPassword = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState();
    const [passwordVisible, setPasswordVisible] = useState(false)
    const { state } = useLocation();
    const { token } = state;

    const formik = useFormik({
        initialValues: {
            password: "",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .required("Password is required")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                ),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const response = await api.post(`/users/settingPassword`, {
                    password: values.password,
                }, {
                    headers: {
                        'x-auth-token': token,
                    },
                });
                notify("Password Set successfully!", "success");
                navigate('/')
            } catch (error) {
                // console.error("Error setting password:", error);
                notify("Failed to set password. Please try again.", "error");
            } finally {
                setLoading(false); 
            }
        },
    });

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-blue-900">
            <div className="relative bg-[#043250] p-8 rounded-lg shadow-lg max-w-sm w-full">

                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-[#043250] w-24 h-24 rounded-full flex items-center justify-center shadow-lg">
                    <img
                        src={Lock}
                        alt="Lock Icon"
                        className="w-16 h-16"
                    />
                </div>

                <h1 className="text-white text-2xl font-bold mt-7 mb-8 text-center">
                    Set Your New Password
                </h1>
                {/* Form */}
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4 relative">
                        <label htmlFor="password" className="block text-white mb-2">
                            New Password
                        </label>
                        <div
                            className="absolute top-[2.75rem] right-3 flex items-center cursor-pointer text-gray-600"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                            {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                        </div>
                        <input
                            type={passwordVisible ? "text" : "password"}
                            name="password"
                            placeholder="Enter Your New Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`w-full px-4 py-2 rounded-lg border-2 bg-blue-50 focus:outline-none focus:border-blue-500 ${formik.touched.password && formik.errors.password
                                ? "border-red-500"
                                : "border-transparent"
                                }`}
                        />

                        {formik.errors.password && formik.touched.password && (
                            <p className="bg-white text-[#021826] p-2 my-1 text-sm sm:text-base rounded-lg">
                                {formik.errors.password}
                            </p>
                        )}
                    </div>
                   
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#021826] hover:bg-[#0A1C26] text-white py-2 rounded-lg font-semibold transition"
                    >
                        {loading ? (
                            <i className="fas fa-spinner fa-spin mx-2 white-icon"></i>
                        ) : (
                            <span>Save</span>
                        )}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default SettingPassword;
