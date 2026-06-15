
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
    <div className="relative mx-auto w-full max-w-4xl p-4 md:p-6">
      <div className="absolute right-4 top-4 z-20">
  <button
    type="button"
    aria-label="Open menu"
    onClick={() => setIsMenuOpen(!isMenuOpen)}
    className="rounded-xl p-2 hover:bg-slate-100"
  >
    <ImMenu size={18} />
  </button>

  {isMenuOpen && (
    <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
        <Link
          to="/"
          className="block px-4 py-3 hover:bg-slate-50"
        >
          Customers
        </Link>

        <Link
          to="/dashboard"
          className="block px-4 py-3 hover:bg-slate-50"
        >
          Dashboard
        </Link>

        <button
          type="button"
          onClick={() => {
            logoutAction();
            setIsMenuOpen(false);
          }}
          className="w-full px-4 py-3 text-left hover:bg-slate-50"
        >
          Logout
        </button>

        <button
          type="button"
          className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50"
          onClick={() => {
            setIsDeleting(true);
            setIsMenuOpen(false);
          }}
          >
            Delete Account
          </button>
        </div>)}
      </div> 
      
      <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={user.img ? user.img : "/face.png"}
              alt={user.name}
              className="h-32 w-32 rounded-full border-4 border-indigo-100 object-cover"
            />

            <button
              type="button"
              aria-label="Change profile picture"
              onClick={() => setIsEditingPic(true)}
              className="absolute bottom-1 right-1 rounded-full bg-indigo-600 p-2 text-white shadow-md"
            >
              <FaEdit />
            </button>
          </div>

          <h2 className="mt-4 text-3xl font-bold text-slate-800">
            {user.name}
          </h2>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-slate-500">
              {user.email}
            </span>

            <button
              type="button"
              aria-label="Change email"
              onClick={() => setIsEditingEmail(true)}
              className="text-indigo-600"
            >
              <FaEdit />
            </button>
          </div>
        </div>
      </div>
      {isDeleting && (
         <>
            <div
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsDeleting(false)}
            />

            <div className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 shadow-2xl">
              <h3 className="text-xl font-bold text-slate-800">
                  Delete Account
              </h3>

              <p className="mt-3 text-slate-600">
                Are you sure you want to delete your account?
              </p>

              <div className="mt-6 flex gap-3">
                <Button
                  type="button"
                  handleClick={() => {
                    deleteAccount({
                      message: "Deleting Account Please wait...",
                    });
                    setIsDeleting(false);
                  }}
                >
                  Delete
                </Button>

                <Button
                  type="button"
                  handleClick={() => setIsDeleting(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
         </>
        )}
      <Formik
        initialValues={{name: user.name, mobile:user.mobile,gender:user.gender,businessName:user.businessName,businessType:user.businessType,address:user.address,zipCode:user.zipCode}}
        onSubmit={(values)=>{
          updateUser({values,message: "Updating Details please wait..."})
          setIsEditing(false)
        }}
        validationSchema={validationSchema}
      >
        {({dirty, resetForm})=>(
        <Form className="grid grid-cols-1 gap-4 rounded-3xl bg-white p-5 shadow-sm md:grid-cols-2">
          <ProfileField label='Name' name="name" readOnly={!isEditing}/>
          <ProfileField label="Mobile" name="mobile" readOnly={!isEditing} />
          <ProfileField label="Gender" name="gender" type="select" readOnly={!isEditing} />
          <ProfileField label="Business Name" name="businessName" readOnly={!isEditing} />
          <ProfileField label="Business Type" type="select" name="businessType" readOnly={!isEditing} />
          <ProfileField label="Address" name="address" readOnly={!isEditing} />
          <ProfileField label="Zip Code" name="zipCode" readOnly={!isEditing} />
          <div className="md:col-span-2 flex gap-3">
            {!isEditing ? (
              <Button
                type="button"
                handleClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            ) : (
              <>
                <button
                  type="submit"
                  disabled={!dirty}
                  className={`
                    w-full rounded-xl py-3 font-semibold text-white
                    ${
                      dirty
                      ? "bg-indigo-600"
                      : "bg-indigo-300"
                    }
                  `}
                >
                  Save Changes
                </button>

                <Button
                  type="button"
                  handleClick={() => {
                  setIsEditing(false);
                  resetForm();
                  }}
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
          
        </Form>)}
        
      </Formik>
      {isEditionEmail && (
        <>
          <div
            className="
              fixed
              inset-0
              z-40

            bg-black/40
              backdrop-blur-sm
            "
            onClick={() => setIsEditingEmail(false)}
          />

          <ChangeEmail
            hide={() => setIsEditingEmail(false)}
          />
        </>
      )}
      {isEditionPic && (
  <>
    <div
      className="
        fixed
        inset-0
        z-40

        bg-black/40
        backdrop-blur-sm
      "
      onClick={() => setIsEditingPic(false)}
    />

    <ChangeImg
      hide={() => setIsEditingPic(false)}
    />
  </>
)}
    </div>
  );
}

function ProfileField({
  label,
  name,
  readOnly,
  type,
}: {
  label: string;
  name: string;
  readOnly: boolean;
  type?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <FormikInput
        name={name}
        label={label}
        type={type ?? "text"}
        readonly={readOnly}
        placeholder="Not Provided"
      />
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