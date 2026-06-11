import { connect, type ConnectedProps } from "react-redux"
import type { CustomersWithId } from "../models"
import { customerListSelector} from "../selectors/customerSelectors"
import type { State } from "../store/store"
import { Form, Formik } from "formik"
import { addCustomer } from "../reducers/customerSlice"
import FormikInput from "../components/FormikInput"
import { userSelector } from "../selectors/userSelectors"
import { useEffect, useState } from "react"
import Custommer from "../components/Customer"
import { ImCross } from "react-icons/im";

function CustomerList({customers, addCustomer,user}: Redux_props) {

  const [isAdding, setIsAdding]=useState(false)
  useEffect(()=>{
    localStorage.setItem(user.mobile,JSON.stringify(customers))
    },[customers,user])

    function handleSubmit(values: any){
       addCustomer(values);
       setIsAdding(false)
       
    }
    return ( <main className="h-full w-full relative ">
        {customers.length !== 0 ? <section className="flex flex-col items-center p-2 gap-2">
            {customers.map((c: CustomersWithId)=><Custommer key={c.name} customer={c} total={c.totalTake- c.totalGive}/>)}
        </section>:<div>No customers found</div>}
        {!isAdding && <button type="button" onClick={()=>setIsAdding(!isAdding)} className="bg-indigo-600 w-full p-1 rounded-md absolute bottom-0 "><b>Add Customer</b></button>}
        {isAdding && <Formik
          initialValues={{name: '', mobile: ''}}
          onSubmit={handleSubmit}
          
        >
            <Form className='mx-auto w-60 flex flex-col items-center gap-4 fixed left-[calc(50vw-120px)] top-[calc(50vh-120px)] bg-yellow-300 px-5 py-8 rounded-2xl'>
              <ImCross className="absolute top-3 right-3 cursor-pointer" onClick={()=>setIsAdding(false)}/>
              <FormikInput name='name' type='text' placeholder="Enter Customer name" label='Customer Name'/>
              <FormikInput name='mobile' type='text' placeholder="Enter Customer mobile number" label='Customer Mobile Number'/>
              <button type='submit' className="bg-indigo-700 w-full rounded-md p-1 mt-3 ">Add Customer</button>
            </Form>
        </Formik>}
    </main>) 
}
const mapStateToProps=(state: State)=>({
  customers: customerListSelector(state),
  user: userSelector(state)
})
const mapDispatchToProps={
  addCustomer,
}

const connectedComp=connect(mapStateToProps,mapDispatchToProps)

type Redux_props=ConnectedProps<typeof connectedComp>

export default connectedComp(CustomerList);

