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
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
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
            AB
          </div>

          <h1 className="text-3xl font-bold text-slate-800">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Login to your Account Book account
          </p>
        </div>

        <div className="space-y-4">
          {fields.map((field) => (
            <FormikInput
              key={field.name}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              label={field.label}
            />
          ))}
        </div>

        <button
          type="submit"
          className="
            mt-6

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
          Login
        </button>

        <div className="mt-5 flex flex-col gap-2 text-center">
          <Link
            to="/forgotPassword"
            className="
              text-sm
              font-medium
              text-indigo-600

              hover:text-indigo-800
            "
          >
            Forgot Password?
          </Link>

          <Link
            to="/signup"
            className="
              text-sm
              text-slate-600
            "
          >
            Don't have an account?{" "}
            <span className="font-semibold text-indigo-600">
              Sign Up
            </span>
          </Link>
        </div>
      </Form>
    </Formik>
  </div>
);
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