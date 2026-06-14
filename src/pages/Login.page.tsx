import * as Yup from 'yup';
import {Formik, Form} from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import FormikInput from '../components/FormikInput';
import { connect, type ConnectedProps } from 'react-redux';
import type { State } from '../store/store';
import { userSelector } from '../selectors/userSelectors';
import { userLogin } from '../reducers/userSlice';
import { useEffect } from 'react';
import {setCustomersAction } from '../reducers/customerSlice';
function Login({user, loadUser}: Redux_props){
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
    })

    const fields: {name: string; type: string; placeholder: string; label: string}[]=[
        {name:'email',  type:'email', placeholder: "Enter your email", label:'Email'},
        {name:"password", type:'password', placeholder:'Create a strong password', label:'Password'},
    ]

    function handleSubmit(values: any) {
        try{
          loadUser({values,message:"Logging in please wait..."})
    
        }catch(error){
            alert(error)
        }
    }
    return (
        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
            <Form className='flex mx-auto flex-col gap-4 w-80 rounded-xl p-6  bg-gray-100 items-center'>
                <h1 className='self-center text-xl'><b>Login with Account Book</b></h1>
                {fields.map(field=><FormikInput key={field.name} type={field.type} name={field.name} placeholder={field.placeholder} label={field.label}/>)}
                <button type="submit" className=' text-white px-4 py-1 rounded bg-red-900 w-full'>Login</button>
                <Link to="/forgotPassword" className='text-sm text-blue-500'>Forget Password?</Link>
                <Link to="/signup" className='text-sm text-blue-500'>Don't have an account? Sign up</Link>
            </Form>
        </Formik>
    )
}

const mapStateToProps=(state: State)=>({
  user: userSelector(state)
})
const mapDispatchToProps={
  loadUser: userLogin,
  setCustomers: setCustomersAction
}

const connectedComp=connect(mapStateToProps,mapDispatchToProps)

type Redux_props=ConnectedProps<typeof connectedComp>
export default connectedComp(Login);