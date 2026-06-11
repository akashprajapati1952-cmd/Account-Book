import * as Yup from 'yup';
import {Formik, Form} from 'formik';
import FormikInput from '../components/FormikInput';
import { Link } from 'react-router-dom';
import type { State } from '../store/store';
import { userSelector } from '../selectors/userSelectors';
import { userSignup, userVerify} from '../reducers/userSlice';
import { connect, type ConnectedProps } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react';
function Signup({user, createUser, verifyUser}: Redux_props){

  const [otpSent, setOtpSent]=useState(false)
  
  const navigate=useNavigate()
  useEffect(()=>{
    if(user.name){
      navigate('/')
    }
  },[user])
    
  
    
    const req='This field is required'
    
    const validationSchema = Yup.object({
      email: Yup.string().email('Invalid email address').required(req),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required(req),
      mobile: Yup.string().matches(/^[0-9]{10}$/, 'Invalid mobile number').required(req),
      confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required(req),
      gender:Yup.string().matches(/^(male|female|other)$/, 'Invalid gender').required(req),
      name: Yup.string().required(req),
      bussinessName: Yup.string().required(req),
      bussinessType: Yup.string().matches(/^(retail|wholesale|service)$/, 'Invalid business type').required(req),
      address: Yup.string().required(req),
      zipCode: Yup.string().matches(/^[0-9]{6}$/, 'Invalid zip code').required(req)
    })
  
    const fields: {name: string; type: string; placeholder: string; label: string}[]=[
      {name:'name', type:'text',placeholder:'Enter your name', label:"Name"},
      {name:'gender', type: "select",placeholder: 'Select your gender', label:'Gender'},
      {name:'mobile', type:'text', placeholder:'Enter you mobile number',label:'Mobile Number'},
      {name:'email',  type:'email', placeholder: "Enter your email", label:'Email'},
      {name:'bussinessName', type:'text', placeholder:'Enter your bussiness name',label:'Bussiness Name'},
      {name:'bussinessType',type:'select',placeholder:'Select your bussiness type',label:"Bussiness Type"},
      {name:'address', type:'text',placeholder:"Enter your address",label:'Address'},
      {name:'zipCode',type:'text',placeholder:'Enter your zip code',label:'ZIP Code'},
      {name:"password", type:'password', placeholder:'Create a strong password', label:'Password'},
      {name:'confirmPassword', type:"password", placeholder:'Confirm your password',label:"Confirm Password"},
      
      
      
    ]
  
    function handleSubmit(values: any) {
      if(!otpSent){
        try{
          createUser(values);
          setOtpSent(true)
        }catch(error){  
          alert(error)
        }
      }else{
    verifyUser(values.otp)
        
      }
    }
    
    return (
        <Formik
        initialValues={{email: '',otp: '', password: '',mobile: '',confirmPassword: '',gender: '', name: '', businessName: '', businessType: '',address: '', zipCode: ''}}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
    >
        <Form className='flex mx-auto flex-col gap-4 w-80 rounded-xl p-6  bg-gray-100 items-center'>
            <h1 className='self-center text-xl'><b>Signup with Account Book</b></h1>
            {otpSent? <FormikInput key="otp" type="text" name="otp" placeholder="Enter OTP" label="OTP"/>:
            fields.map(field=><FormikInput key={field.name} type={field.type} name={field.name} placeholder={field.placeholder} label={field.label}/>)
            }
            <button type="submit" className=' text-white px-4 py-1 rounded bg-red-900 w-full'>{otpSent ? 'Verify OTP' : 'Sign up'}</button>
            <Link to="/login" className='text-sm text-blue-500'>Already have an account? Login</Link>
            
        </Form>
  
    </Formik>
    )
}

const mapStateToProps=(state: State)=>({
  user: userSelector(state)
})
const mapDispatchToProps={
  createUser: userSignup,
  verifyUser: userVerify
}

const connectedComp=connect(mapStateToProps,mapDispatchToProps)

type Redux_props=ConnectedProps<typeof connectedComp>
export default connectedComp(Signup);