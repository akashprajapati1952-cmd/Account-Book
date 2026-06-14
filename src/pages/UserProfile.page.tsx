
import { connect, type ConnectedProps } from "react-redux";
import { userSelector } from "../selectors/userSelectors";
import type { State } from "../store/store";
import FormikInput from "../components/FormikInput";
import { Form, Formik, } from "formik";
import { useState } from "react";
import Button from "../components/Button";
import * as Yup from 'yup'
import { ImMenu } from "react-icons/im";
import { deleteAccount, logoutAction, updateUser} from "../reducers/userSlice";
import { setCustomersAction } from "../reducers/customerSlice";
import ChangeEmail from "../components/ChangeEmail";
import { FaEdit } from "react-icons/fa";
import ChangeImg from "../components/ChangeImg";
import { Link } from "react-router-dom";


interface UserProfileProps {
  
}
type Props=UserProfileProps & Redux_props

function UserProfile({ user, logoutAction,updateUser, deleteAccount}: Props) {
    const [isEditing,setIsEditing]=useState(false)
    const [isMenuOpen,setIsMenuOpen]=useState(false)
    const [isDeleting, setIsDeleting]=useState(false)
    const [isEditionEmail, setIsEditingEmail]=useState(false)
    const [isEditionPic, setIsEditingPic]=useState(false)
    const req='This field is required'
    const validationSchema = Yup.object({
        mobile: Yup.string().matches(/^[0-9]{10}$/, 'Invalid mobile number').required(req),
        gender:Yup.string().required(req),
        name: Yup.string().required(req),
        businessName: Yup.string().required(req),
        businessType: Yup.string().required(req),
        address: Yup.string().required(req),
        zipCode: Yup.string().matches(/^[0-9]{6}$/, 'Invalid zip code').required(req)
    })
  return (
    <div  className=" max-w-2xl mx-auto p-6 bg-white rounded-lg shadow ">
      <div className="absolute top-17 right-2 flex flex-col gap-1">
        <ImMenu onClick={()=>setIsMenuOpen(!isMenuOpen)} className="self-end"/>
        {isMenuOpen && <div className="flex flex-col items-start border px-2 rounded-lg bg-gray-500" >
          <Link to="/">Customers</Link>
          <Link to="/dashboard">Dashboard</Link>
          <button type="button" onClick={()=>{
            logoutAction()
            setIsMenuOpen(false)
            
          }}>Logout</button>
          <button type="button" className="text-red-700" onClick={()=>{
            setIsDeleting(true)
            setIsMenuOpen(false)
            }}>Delete Account</button>
            
        </div>}
      </div>
      
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <img
            src={user.img ? user.img : "/face.png"}
            alt={user.name}
            className="w-28 h-28 rounded-full object-cover border"
          />
          <FaEdit onClick={()=>setIsEditingPic(true)} className="absolute bottom-1 right-2"/>
        </div>
        <h2 className="text-2xl font-bold mt-3">{user.name}</h2>
        <p className="text-gray-500 relative " >
          <span>{user.email}</span>
          <FaEdit onClick={()=>setIsEditingEmail(true)} className="absolute bottom-1 -right-5 text-black"/>
        </p>
      </div>
      {isDeleting && <div className="absolute top-1/2 left-[calc(50%-140px)] w-70 bg-red-700 p-2 rounded-lg space-y-2">
                <p className="text-center text-xl">Are you sure to delete your account?</p>
                <div className="flex gap-2">
                  <Button type="button" handleClick={()=>{
                    deleteAccount({message:"Deleting Account Please wait..."})
                    setIsDeleting(false)
                  }}>Delete</Button>
                  <Button type="button" handleClick={()=>setIsDeleting(false)}>Back</Button>
                  
                </div>
              </div>}
      <Formik
        initialValues={{name: user.name, mobile:user.mobile,gender:user.gender,businessName:user.businessName,businessType:user.businessType,address:user.address,zipCode:user.zipCode}}
        onSubmit={(values)=>{
          updateUser({values,message: "Updating Details please wait..."})
          setIsEditing(false)
        }}
        validationSchema={validationSchema}
      >
        {({dirty, resetForm})=>(
        <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProfileField label='Name' name="name" readOnly={!isEditing}/>
          <ProfileField label="Mobile" name="mobile" readOnly={!isEditing} />
          <ProfileField label="Gender" name="gender" type="select" readOnly={!isEditing} />
          <ProfileField label="Business Name" name="businessName" readOnly={!isEditing} />
          <ProfileField label="Business Type" type="select" name="businessType" readOnly={!isEditing} />
          <ProfileField label="Address" name="address" readOnly={!isEditing} />
          <ProfileField label="Zip Code" name="zipCode" readOnly={!isEditing} />
          {!isEditing && <Button type='button' handleClick={()=>setIsEditing(true)}>Edit</Button>}
          {isEditing && <button type="submit" disabled={!dirty} className={`text-white px-4 py-1 rounded ${ dirty ? "bg-red-900" : "bg-red-300"} w-full`}>Change Details</button>}
          {isEditing && <Button type='button' handleClick={()=>{
            setIsEditing(false)
            resetForm()
          }}>Discard</Button>}
          
        </Form>)}
        
      </Formik>
      {isEditionEmail && <ChangeEmail hide={()=>setIsEditingEmail(false)}/>}
      {isEditionPic && <ChangeImg hide={()=>setIsEditingPic(false)} />}
    </div>
  );
}

function ProfileField({
  label,
  name,
  readOnly,
  type
}: {
  label: string;
  name: string;
  readOnly: boolean;
  type?: string
}) {
  return (
    <div className="border rounded p-3">
      <label htmlFor="value" className="sr-only">{label}</label>
      <FormikInput name={name} label={label} type={type ? type : "text"} className="font-medium border-none" readonly={readOnly} placeholder="Not Provided"/>
    </div>
  );
}

const mapStateToProps=(state: State)=>({
    user:userSelector(state)
})

const mapDispatchToProps={
    deleteAccount,
    logoutAction,
    setCustomersAction,
    updateUser
}

const connectedComp=connect(mapStateToProps,mapDispatchToProps)

type Redux_props=ConnectedProps<typeof connectedComp>

export default connectedComp(UserProfile);