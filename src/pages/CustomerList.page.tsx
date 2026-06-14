import { connect, type ConnectedProps } from "react-redux"
import type { CustomersWithId } from "../models"
import { customerListSelector} from "../selectors/customerSelectors"
import type { State } from "../store/store"
import { Form, Formik } from "formik"
import { 
  addCustomer,
  searchCustomer
} from "../reducers/customerSlice"
import FormikInput from "../components/FormikInput"
import { userSelector } from "../selectors/userSelectors"
import { useEffect, useState } from "react"
import Custommer from "../components/Customer"
import { ImCross } from "react-icons/im";
import * as Yup from 'yup'

function CustomerList({
  customers,
  addCustomer,
  searchCustomer,
  user,
  searchResults
}: Redux_props) {

  const [isAdding, setIsAdding]=useState(false)
  const [search,setSearch]=useState("");
  const displayCustomers =search.trim() ? Object.values(searchResults || {}) : customers || [];

    function handleSubmit(values: any){
       addCustomer({values,message: "Adding Customer"});
       setIsAdding(false)
       
    }
    return ( <main className="h-full w-full relative ">
        <div className="p-2">

          <input
              type="text"
              placeholder="Search customer..."
              value={search}
              onChange={(e)=>{
                const value=e.target.value;
                setSearch(value);
                if(value.trim()){
                  searchCustomer({query:value});
                }
                
              }}
              className="border p-2 rounded-md w-full"
          />

        </div>
        {displayCustomers.length !== 0 ? <section className="flex flex-col items-center p-2 gap-2">
            {displayCustomers.map((c: CustomersWithId)=><Custommer key={c.name} customer={c} total={c.totalTake- c.totalGive}/>)}
        </section>:<div>No customers found</div>}
        {!isAdding && <button type="button" onClick={()=>setIsAdding(!isAdding)} className="bg-indigo-600 w-full p-1 rounded-md absolute bottom-0 "><b>Add Customer</b></button>}
        {isAdding && <Formik
          initialValues={{name: '', mobile: ''}}
          validationSchema={Yup.object({
            name: Yup.string().required(),
            mobile: Yup.string().matches(/^[0-9]{10}$/,"Mobile number should be 10 digits long").required()
          })}
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

 user:userSelector(state),

 searchResults:
 state.customer.searchResults

})
const mapDispatchToProps={

 addCustomer,

 searchCustomer

}

const connectedComp=connect(mapStateToProps,mapDispatchToProps)

type Redux_props=ConnectedProps<typeof connectedComp>

export default connectedComp(CustomerList);

