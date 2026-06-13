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
       verifyOtp({email: values.email,newPassword: values.newPassword,otp:values.otp})
    }
    return (
        <Formik
          initialValues={{email: '', newPassword: '',confirmPassword:'',otp:""}}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
            {({values})=><Form className='flex mx-auto flex-col gap-4 w-80 rounded-xl p-6  bg-gray-100 items-center'>
                <h1 className='self-center text-xl'><b>Create new password</b></h1>
                <FormikInput key='email' type='email' name="email" placeholder="Enter your email" label="Email"/>
                <button type="button" onClick={()=>{
                    
                    setIsOtpSent(true)
                    getOtp({email: values.email})
                    if(isFirst){
                      setIsFirst(false)
                    }
                }} disabled={isOtpSent} className=' text-white px-4 py-1 rounded bg-red-900 w-full'>{isFirst ? "Send OTP" : isOtpSent ? <div className="flex justify-center gap-1.5">Resend OTP in {<Countdown timerEnd={()=>setIsOtpSent(false)}/>}</div>: "Resend OTP"}</button>
                {isOtpSent && <FormikInput key="otp" type="text" name="otp" placeholder="Enter OTP" label="OTP"/>}
                {!isFirst && <><FormikInput key="newPassword" type='password' name="newPassword" placeholder='Create a strong password' label='New Password'/>
                <FormikInput key='confirmPassword' type="password" name='confirmPassword' placeholder='Confirm your password' label="Confirm Password"/>
                <button type="submit" className=' text-white px-4 py-1 rounded bg-red-900 w-full'>Change Password</button></>}
                <Link to='/login' className="text-blue-600">Go to Login?</Link>
            </Form>}
        </Formik>
    )
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