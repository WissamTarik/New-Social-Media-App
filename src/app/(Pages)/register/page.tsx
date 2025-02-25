"use client";
import { RegisterData } from "@/Interfaces/AuthInterfaces";
import { handleRegister } from "@/Libraries/authSlice";
import { dispatchType, storeType } from "@/Libraries/store";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa6";

import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
export default function Register() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const dispatch = useDispatch<dispatchType>();
  const router = useRouter();
  const { isLoading } = useSelector(
    (store: storeType) => store.registerReducer
  );
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(15, "Name must not exceed 15 characters")
      .required("Name is required to register"),
    email: Yup.string()
      .email("Invalid email or password")
      .required("Email is required to register"),
    password: Yup.string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must start with capital letter and contain special character and at least 8 characters"
      )
      .required("Password is required to register"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password and re-Password aren't match")
      .required("Re-password is required to register"),

    gender: Yup.string()
      .oneOf(["male", "female"])
      .required("gender is required to register"),
    dateOfBirth: Yup.string().required("Enter DOB"),
  });
  const initialValues: RegisterData = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    gender: "male",
    dateOfBirth: "",
  };
  const registerFormik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: (values) => {
      dispatch(handleRegister(values)).then((res) => {
        console.log("response", res);
        if (res.payload.message == "success") {
          toast.success("Welcome to social App", {
            style: {
              fontWeight: "bold",
              color: "green",
            },
          });
          router.push("/login");
        } else if (res.payload.response.data.error) {
          toast.error(res.payload.response.data.error, {
            style: {
              color: "red",
              fontWeight: "bold",
            },
          });
        }
      });
    },
  });

  return (
    <div className=" p-4 lg:w-1/3 min-[500px]:w-1/2 shadow-lg mx-auto  mt-5">
      <form className="" onSubmit={registerFormik.handleSubmit}>
        <div className={`grid   grid-cols-12 gap-2`}>
          <div className={`relative  col-span-6  "col-span-6 `}>
            <input
              type="text"
              id="floating_name"
              name="name"
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
              value={registerFormik.values.name}
              className="block caret-blue-600  px-2.5 pb-2.5 pt-4 w-full  text-gray-900 bg-transparent rounded-lg border outline-none      focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_name"
              className="absolute  text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-2 origin-[0]   px-2  peer-focus:text-blue-600  bg-white  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              User name
            </label>
          </div>

          <div
            className={`relative col-span-6  ${
              registerFormik.errors.name ? "col-span-12" : "col-span-6"
            }   ${registerFormik.errors.email ? "col-span-12" : "col-span-6"}`}
          >
            <input
              type="email"
              id="floating_email"
              name="email"
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
              value={registerFormik.values.email}
              className="block caret-blue-600  px-2.5 pb-2.5 pt-4 w-full  text-gray-900 bg-transparent rounded-lg border outline-none      focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_email"
              className="absolute  text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-2 origin-[0]   px-2  peer-focus:text-blue-600  bg-white  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Email
            </label>
          </div>
        </div>
        {registerFormik.errors.name ? (
          <p className="my-2 text-sm text-red-600 ">
            {" "}
            {registerFormik.errors.name}
          </p>
        ) : (
          ""
        )}
        {registerFormik.errors.email ? (
          <p className="mt-2 text-sm text-red-600 ">
            {" "}
            {registerFormik.errors.email}
          </p>
        ) : (
          ""
        )}

        <div className="relative my-4">
          <input
            type="password"
            id="floating_password"
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            value={registerFormik.values.password}
            name="password"
            className="block caret-blue-600  px-2.5 pb-2.5 pt-4 w-full  text-gray-900 bg-transparent rounded-lg border outline-none      focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_password"
            className="absolute  text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-2 origin-[0]   px-2  peer-focus:text-blue-600  bg-white  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Password
          </label>
        </div>
        {registerFormik.errors.password ? (
          <p className="my-2 text-sm text-red-600 ">
            {" "}
            {registerFormik.errors.password}
          </p>
        ) : (
          ""
        )}

        <div className="relative ">
          <input
            type="password"
            id="floating_rePassword"
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
            value={registerFormik.values.rePassword}
            name="rePassword"
            className="block caret-blue-600  px-2.5 pb-2.5 pt-4 w-full  text-gray-900 bg-transparent rounded-lg border outline-none      focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_rePassword"
            className="absolute  text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-2 origin-[0]   px-2  peer-focus:text-blue-600  bg-white  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Re-password
          </label>
        </div>
        {registerFormik.errors.rePassword ? (
          <p className="my-2 text-sm text-red-600 ">
            {" "}
            {registerFormik.errors.rePassword}
          </p>
        ) : (
          ""
        )}

        <div className="flex items-center my-4">
          <input
            id="male"
            type="radio"
            name="gender"
            onChange={registerFormik.handleChange}
            checked={registerFormik.values.gender === "male"}
            className="w-4 h-4 accent-blue-700 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
            value="male"
          />
          <label
            htmlFor="male"
            className="ms-2 text-sm font-medium text-blue-900 "
          >
            Male
          </label>
        </div>

        <div className="flex items-center mb-4">
          <input
            id="female"
            type="radio"
            name="gender"
            onChange={registerFormik.handleChange}
            checked={registerFormik.values.gender === "female"}
            className="w-4 h-4 accent-blue-700 text-blue-600 bg-blue-100 border-blue-300 focus:ring-blue-500  focus:ring- "
            value="female"
          />
          <label
            htmlFor="female"
            className="ms-2  text-sm font-medium text-blue-900 "
          >
            Female
          </label>
        </div>
        {registerFormik.errors.gender ? (
          <p className="mt-2 text-sm text-red-600 ">
            {" "}
            {registerFormik.errors.gender}
          </p>
        ) : (
          ""
        )}

        <div className="w-full mb-4">
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => {
              registerFormik.values.dateOfBirth = date
                ? date.toLocaleDateString("en-GB").split("/").join("-")
                : "";
              return setSelectedDate(date);
            }}
            dateFormat="d-M-yyyy"
            isClearable
            placeholderText="Select a date"
            className="border rounded-lg px-3 py-2 w-full relative  z-[9999] focus:outline-none caret-blue-600 focus:border-blue-600"
            calendarClassName="rounded-lg shadow-lg z-[9999999]"
            startDate={new Date(1999, 0, 1)}
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={50}
            minDate={new Date(1999, 0, 1)}
            fixedHeight
            renderCustomHeader={({
              date,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div className="bg-blue-600 text-white p-3 top-0 rounded-t-lg flex justify-between items-center">
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                  className="px-2 py-1 hover:bg-blue-700 rounded"
                  type="button"
                >
                  ◀
                </button>
                <span className="font-semibold">
                  {date.toLocaleDateString("en-GB", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                  className="px-2 py-1 hover:bg-blue-700 rounded"
                  type="button"
                >
                  ▶
                </button>
              </div>
            )}
          />
          {selectedDate && (
            <p className="text-blue-600 mt-2 mb-4">
              Selected Date: {selectedDate.toLocaleDateString("en-GB")}
            </p>
          )}
          {registerFormik.errors.dateOfBirth ? (
            <p className="mt-2 text-sm text-red-600 ">
              {" "}
              {registerFormik.errors.dateOfBirth}
            </p>
          ) : (
            ""
          )}
        </div>
        <button
          type="submit"
          className="w-full rounded-lg border-2 mt-4 py-2 transition-colors duration-500 border-blue-600
         text-blue-600 flex justify-center items-center hover:bg-blue-600 hover:text-white text-center"
        >
          {isLoading ? (
            <FaSpinner className="animate-spin text-2xl" />
          ) : (
            "Register"
          )}
        </button>
      </form>
    </div>
  );
}
