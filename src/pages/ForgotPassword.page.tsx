import { Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import * as Yup from 'yup'
import FormikInput from "../components/FormikInput"
import type { State } from "../store/store"
import { userSelector } from "../selectors/userSelectors"
import { connect, type ConnectedProps } from "react-redux"
import { getForgetPasswordOtp, verifyForgetPasswordOtp } from "../reducers/userSlice"
import Countdown from "../components/Timer"

function ForgotPassword({user,getOtp,verifyOtp}: Redux_props){
    const navigate=useNavigate()
    const [isOtpSent,setIsOtpSent]=useState(false)
    const [isFirst,setIsFirst]=useState(true)
    useEffect(()=>{

     
        
      if(user.name){
        navigate('/')
      }
      

    },[user])
    
    const req='This field is required'
   
        
  
  
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required(req),
        newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required(req),
        otp: Yup.string().matches(/^[0-9]{6}$/).required(),
        confirmPassword: Yup.string().oneOf([Yup.ref('newPassword')], 'Passwords must match').required(req),
    })

    function handleSubmit(values: any) {
       verifyOtp({values:{email: values.email,newPassword: values.newPassword,otp:values.otp},message: "Verifying OTP please wait..."})
    }
    return (
  <div
    className="
      flex
      min-h-[calc(100vh-64px)]
      items-center
      justify-center

      px-4
      py-8

      bg-slate-50
    "
  >
    <Formik
      initialValues={{
        email: "",
        newPassword: "",
        confirmPassword: "",
        otp: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form
          className="
            w-full
            max-w-md

            rounded-3xl

            border
            border-slate-200

            bg-white

            p-8

            shadow-xl
          "
        >
          <div className="mb-8 text-center">
            <div
              className="
                mx-auto
                mb-4

                flex
                h-16
                w-16
                items-center
                justify-center

                rounded-2xl

                bg-indigo-100

                text-2xl
                font-bold
                text-indigo-700
              "
            >
              🔒
            </div>

            <h1 className="text-3xl font-bold text-slate-800">
              Reset Password
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Verify OTP and create a new password
            </p>
          </div>

          <div className="space-y-4">
            <FormikInput
              type="email"
              name="email"
              placeholder="Enter your email"
              label="Email"
            />

            <button
              type="button"
              disabled={isOtpSent}
              onClick={() => {
                setIsOtpSent(true);

                getOtp({
                  values: {
                    email: values.email,
                  },
                  message: "Sending OTP please wait...",
                });

                if (isFirst) {
                  setIsFirst(false);
                }
              }}
              className={`
                w-full
                rounded-xl
                py-3

                font-semibold
                text-white

                ${
                  isOtpSent
                    ? "bg-slate-400"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }
              `}
            >
              {isFirst ? (
                "Send OTP"
              ) : isOtpSent ? (
                <div className="flex justify-center gap-2">
                  Resend OTP in
                  <Countdown
                    timerEnd={() => setIsOtpSent(false)}
                  />
                </div>
              ) : (
                "Resend OTP"
              )}
            </button>

            {isOtpSent && (
              <FormikInput
                type="text"
                name="otp"
                placeholder="Enter OTP"
                label="OTP"
              />
            )}

            {!isFirst && (
              <>
                <FormikInput
                  type="password"
                  name="newPassword"
                  placeholder="Create a strong password"
                  label="New Password"
                />

                <FormikInput
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  label="Confirm Password"
                />

                <button
                  type="submit"
                  className="
                    w-full

                    rounded-xl

                    bg-indigo-600

                    py-3

                    font-semibold
                    text-white

                    transition-all

                    hover:bg-indigo-700

                    active:scale-[0.98]
                  "
                >
                  Change Password
                </button>
              </>
            )}
          </div>

          <div className="mt-5 text-center">
            <Link
              to="/login"
              className="
                text-sm
                text-slate-600
              "
            >
              Remember your password?{" "}
              <span className="font-semibold text-indigo-600">
                Login
              </span>
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  </div>
);
}

const mapStateToProps=(state: State)=>({
  user: userSelector(state)
})
const mapDispatchToProps={
  getOtp:getForgetPasswordOtp,
  verifyOtp: verifyForgetPasswordOtp
}

const connectedComp=connect(mapStateToProps,mapDispatchToProps)

type Redux_props=ConnectedProps<typeof connectedComp>
export default connectedComp(ForgotPassword);