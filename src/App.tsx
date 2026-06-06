import * as Yup from 'yup';
import {Formik, Form} from 'formik';
import FormikInput from './components/FormikInput';
function App() {
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
    console.log(values);
  }
  

  

  return (
   <Formik
    initialValues={{email: '', password: '',mobile: '',confirmPassword: '',gender: '', name: '', bussinessName: '', bussinessType: '',address: '', zipCode: ''}}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
   >
    <Form className='flex flex-col gap-4 w-100  mx-auto mt-10 bg-green-600 px-20 py-10 rounded-xl'>
      {fields.map(field=><FormikInput key={field.name} type={field.type} name={field.name} placeholder={field.placeholder} label={field.label}/>)}
      <button type="submit" className='bg-white text-indigo-600 px-4 py-2 rounded'>Submit</button>
    </Form>

   </Formik>
  )
}

export default App
