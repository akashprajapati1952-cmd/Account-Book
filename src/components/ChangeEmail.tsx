import { Formik,Form } from "formik"
import * as Yup from 'yup'
import FormikInput from "./FormikInput"
import { useState } from "react"
import Countdown from "./Timer"
import { getEmailChangeOtp, verifyEmailChangeOtp } from "../reducers/userSlice"
import { connect, type ConnectedProps } from "react-redux"

interface Props{
    hide: ()=>void
}

const ChangeEmail=({getOtp, verifyOtp,hide}:Redux_props & Props)=>{

    const [isFirst,setIsFirst]=useState(true)
    const [isOtpSent, setIsOtpSent]=useState(false)
    const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validationSchema=Yup.object({
        newEmail: Yup.string().matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Please enter a valid email").required(),
        newEmailOtp: Yup.string().matches(/^[0-9]{6}$/,"Please enter a valid otp").required(),
        oldEmailOtp: Yup.string().matches(/^[0-9]{6}$/,"Please enter a valid otp").required()
    })

    return (
        <Formik
            initialValues={{newEmail:'',newEmailOtp:'',oldEmailOtp:''}}
            onSubmit={(values)=>{
                console.log(values)
                verifyOtp({newEmailOtp: values.newEmailOtp,oldEmailOtp: values.oldEmailOtp})
                hide()
            }}
            validationSchema={validationSchema}
        >
            {({values})=><Form className="flex flex-col gap-2 rounded-lg w-60 bg-amber-300 px-5 py-3 absolute top-[calc(50%-130px)] left-[calc(50%-120px)]">
              <h1 className="text-center"><b>Change Email</b></h1>
              <FormikInput name="newEmail" label="New Email" placeholder="Enter new email" type="email"/>
              <button type="button" onClick={()=>{        
                setIsOtpSent(true)
                getOtp({newEmail: values.newEmail})
                if(isFirst){
                  setIsFirst(false)
                }
                }} disabled={isOtpSent || !regex.test(values.newEmail)} className='disabled:bg-red-400 text-white px-4 py-1 rounded bg-red-900 w-full'>{isFirst ? "Send OTP" : isOtpSent ? <div className="flex justify-center gap-1.5">Resend OTP in {<Countdown timerEnd={()=>setIsOtpSent(false)}/>}</div>: "Resend OTP"}</button>
              <FormikInput name="oldEmailOtp" label="Old Email OTP" placeholder="Enter old otp" type="text"/>
              <FormikInput name="newEmailOtp" label="New Email OTP" placeholder="Enter new otp" type="text"/>
              <button type="submit" className=' text-white mt-2 px-4 py-1 rounded bg-red-900 w-full'>Change Email</button>
            </Form>}
        </Formik>
    )
}

const mapDispatchToProps={
    getOtp: getEmailChangeOtp,
    verifyOtp:verifyEmailChangeOtp
}

const connectedComp=connect(undefined,mapDispatchToProps)
type Redux_props= ConnectedProps<typeof connectedComp>

export default connectedComp(ChangeEmail);