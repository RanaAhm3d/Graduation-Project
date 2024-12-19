import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import notify from '../../hooks/useNotification';
import ForgetPass from "../../assets/Forgot Password.png";
import api from "../../api/baseUrl";

const ForgetPassword = () => {

    const [loading, setLoading] = useState(false)

    // Validation schema for the form
    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
    });

    const initialValues = {
        email: "",
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setLoading(true);
        try {
            const response = await api.post("/users/forgot", {
                email: values.email,
            });
            if (response) {
                notify("We have e-mailed your password reset link!", "success");
                resetForm();
            } else {
                notify("Error sending password reset email.", "error");
            }
        } catch (error) {
            notify(`${error.response.data.error}. Please enter a registered email address.`, "error");
        } finally {
            setSubmitting(false);
            setLoading(false);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-900 flex items-center justify-center">
            <div className="flex flex-col md:flex-row items-center justify-center  space-x-0 md:space-x-24 w-3/4 max-w-screen-md mx-auto p-2">
                <div className="hidden md:block w-2/4">
                    <img src={ForgetPass} alt="Forget Password" className="w-full h-auto" />
                </div>

                <div className="w-full md:w-1/2 mt-8 md:mt-0">
                    <h2 className="text-4xl font-bold text-white text-left mb-1">
                        Forget
                    </h2>
                    <p className="text-4xl font-bold text-white text-left mb-7">Your Password?</p>
                    <p className="text-white text-left mb-2">
                        We can send you details on how to reset it.
                    </p>

                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-white mb-5">
                                Please Enter Your Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email Address"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent autofill:text-black ${formik.touched.email && formik.errors.email
                                    ? "border-red-500"
                                    : "border-transparent"
                                    } `}
                            />
                            {formik.errors.email && formik.touched.email && (
                                <p className="bg-white text-[#021826] p-2 my-1 text-sm sm:text-base rounded-lg">
                                    {formik.errors.email}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="w-full  text-white rounded-xl bg-[#021826] hover:bg-[#0A1C26] active:bg-[#0A1C26] transition flex justify-center items-center py-3 px-6 focus:outline-none focus:ring-0 focus:ring-blue-500 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? (
                                <i className="fas fa-spinner fa-spin mx-2 white-icon"></i>
                            ) : (
                                "Continue"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;

