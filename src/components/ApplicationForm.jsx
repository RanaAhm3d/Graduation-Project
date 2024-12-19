import React, { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from 'react-router-dom';
import notify from '../hooks/useNotification';
import gallery from '../assets/gallery.png'
import api from '../api/baseUrl';

const ApplicationForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);

    const validationSchema = Yup.object({
        fullName: Yup.string()
            .min(3, 'Full name must be at least 3 characters long')
            .max(50, 'Full name must be less than 50 characters')
            .required('Full name is required'),

        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),

        phoneNumber: Yup.string()
            .matches(/^\d{11}$/, 'Phone number must be exactly 11 digits')
            .required('Phone number is required'),

        homeAddress: Yup.string()
            .min(10, 'Home address must be at least 10 characters')
            .max(100, 'Home address must be less than 100 characters')
            .required('Home address is required'),

        profilePic: Yup.mixed()
            .nullable()
            .test(
                "fileSize",
                "Image size is too large. Max size is 2MB.",
                (value) => !value || (value && value.size <= 2000000)
            )
            .test(
                "fileType",
                "Unsupported file type. Only JPG, PNG, or JPEG files",
                (value) => !value || (value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type))
            ),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("fullName", values.fullName);
            formData.append("email", values.email);
            formData.append("phoneNumber", values.phoneNumber);
            formData.append("homeAddress", values.homeAddress);

            if (values.profilePic) {
                formData.append("profilePic", values.profilePic);
            }

            const result = await api.post('/sendRequests', formData);

            if (result) {
                navigate("/");
                notify(`Request Sent Successfully and ${result.data.message}`, "success");
            }
        } catch (error) {
            notify(error?.response?.data, "error");
        } finally {
            setSubmitting(false);
            setLoading(false);
        }
    };

    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            phoneNumber: "",
            homeAddress: "",
            profilePic: null,
        },
        validationSchema,
        onSubmit: handleSubmit,
    });

    const handlePhotoUpload = (e) => {
        const file = e.currentTarget.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            formik.setFieldValue("profilePic", file);
        } else {
            formik.setFieldValue("profilePic", null);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-900">
            <div className="relative bg-gradient-to-br from-blue-500 to-blue-900 text-white p-8 m-14 mb-4 rounded-lg shadow-lg w-full max-w-md ">
                <h2 className="text-2xl font-bold mb-6 text-center mt-16">APPLICATION FORM</h2>

                <form onSubmit={formik.handleSubmit}>
                    <div className="absolute top-[-4.5rem] right-[-2.5rem] bg-[#2f6785] p-4 rounded-full shadow-md">
                        <div className="absolute top-[-0.5rem] right-[4rem] bg-[#3A6D87] p-10 rounded-full shadow-md z-0">
                        </div>
                        <label
                            htmlFor="profilePic"
                            className="flex flex-col items-center cursor-pointer "
                        >

                            {selectedImage ? (
                                <img
                                    src={selectedImage}
                                    alt="Uploaded"
                                    className="w-28 h-28 rounded-full flex flex-row items-center justify-center z-10"
                                />
                            ) : (
                                <div className="bg-[#D9D9D9] w-28 h-28 rounded-full flex flex-row items-center justify-center z-10">
                                    <img src={gallery} alt='image icon' className="mx-auto w-4 h-4" />
                                    <span className="text-xs text-[#1F3D59] mr-2">Upload Photo</span>
                                </div>
                            )}

                            <input
                                type="file"
                                id="profilePic"
                                accept="image/*"
                                className="hidden"
                                onChange={handlePhotoUpload}
                            />

                        </label>
                        <div className="absolute right-[-0rem] w-fit">
                        {formik.errors.profilePic && formik.touched.profilePic && (
                            <p className="bg-white text-[#142A35] p-2 text-[10px] rounded-lg border-red-500">
                                {formik.errors.profilePic}
                            </p>
                        )}
                        </div>
                    </div>


                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            id="fullName"
                            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2
                             border-white appearance-none focus:outline-none focus:ring-0 focus:border-white peer autofill:bg-transparent"
                            placeholder=" "
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.fullName}
                        />
                        {formik.errors.fullName && formik.touched.fullName && (
                            <p className="bg-white text-[#142A35] p-2 my-1 text-sm rounded-lg border-red-500">
                                {formik.errors.fullName}
                            </p>
                        )}
                        <label
                            htmlFor="fullName"
                            className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Full Name
                        </label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="email"
                            id="email"
                            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2
                             border-white appearance-none focus:outline-none focus:ring-0 focus:border-white peer autofill:bg-transparent"
                            placeholder=" "
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.errors.email && formik.touched.email && (
                            <p className="bg-white text-[#142A35] p-2 my-1 text-sm rounded-lg border-red-500">
                                {formik.errors.email}
                            </p>
                        )}
                        <label
                            htmlFor="email"
                            className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Email
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="tel"
                            id="phoneNumber"
                            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2
                             border-white appearance-none focus:outline-none focus:ring-0 focus:border-white peer autofill:bg-transparent"
                            placeholder=" "
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phoneNumber}
                        />
                        {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                            <p className="bg-white text-[#142A35] p-2 my-1 text-sm rounded-lg border-red-500">
                                {formik.errors.phoneNumber}
                            </p>
                        )}
                        <label
                            htmlFor="phoneNumber"
                            className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Phone Number
                        </label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="tel"
                            id="homeAddress"
                            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2
                             border-white appearance-none focus:outline-none focus:ring-0 focus:border-white peer autofill:bg-transparent"
                            placeholder=" "
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.homeAddress}
                        />
                        {formik.errors.homeAddress && formik.touched.homeAddress && (
                            <p className="bg-white text-[#142A35] p-2 my-1 text-sm rounded-lg border-red-500">
                                {formik.errors.homeAddress}
                            </p>
                        )}
                        <label
                            htmlFor="homeAddress"
                            className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Home Address
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 mt-4 bg-[#021826] hover:bg-[#0A1C26] text-white rounded-xl transition"
                    >
                        {loading ? (
                            <i className="fas fa-spinner fa-spin mx-2 white-icon"></i>
                        ) : (
                            <span> Apply Now →</span>
                        )}
                    </button>
                </form>

            </div>
        </div>
    );
};

export default ApplicationForm;
