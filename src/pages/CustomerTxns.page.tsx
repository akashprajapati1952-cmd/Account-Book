import { connect, type ConnectedProps } from "react-redux"
import withParams from "../hocs/withParams"
import type { State } from "../store/store"
import { customerSelector } from "../selectors/customerSelectors"
import ShowTxns from "../components/ShowTxns"
import AddEntry from "../components/AddEntry"
import Button from "../components/Button"
import { useState } from "react"
import { addGiven, addTaken, deleteCustomer } from "../reducers/customerSlice"
import { useNavigate } from "react-router-dom"


interface Props{
    params: Record<string,string>
}
type CustomerTxnsProps=Props & Redux_props
function CustomerTxns({customer, addGiven,addTaken,params,deleteCustomer}:CustomerTxnsProps){
  const navigate=useNavigate()
  const customerId=params['customerId']
  const [addingTake, setAddingTake]=useState(false)
  const [addingGive, setAddingGive]=useState(false)
 
  function handleTakenSubmit(values: any){
    addTaken({values,customerId, message:'Adding Transaction...'})
    setAddingTake(false)
    console.log(values)
  }
  function handleGivenSubmit(values: any){
    addGiven({values,customerId, message:'Adding Transaction...'})
    setAddingGive(false)
   
  }

  return (
    <div  className="flex h-full flex-col relative bg-red-600 p-3 gap-5">
      <ShowTxns onClick={()=>{
          setAddingGive(false)
          setAddingTake(false)
        }} 
        deleteCustomer={()=>{deleteCustomer({customerId:customer.customerId, message:"Deleting Customer..."})
          navigate(-1)
        }}
        customer={customer}
      />
      
      { (addingGive || addingTake) && (<div className="absolute left-[calc(50%-140px)] top-[calc(50%-100px)] p-5 bg-green-500 rounded-lg">
          
          {addingTake && <AddEntry heading="Add Given" handleSubmit={handleTakenSubmit}/>}
          {addingGive && <AddEntry heading="Add Recieved" handleSubmit={handleGivenSubmit}/>}
      </div>)}
      <div className="flex flex-col justify-evenly h-[calc(30dvh-60px)] ">
        <div className="flex justify-between px-2  bg-amber-500 rounded-md">
          <p><b>Total:-</b></p>
          <p><b>₹{customer.totalTake-customer.totalGive}</b></p>
        </div>
        <div className="flex">
        
          <Button type='button' handleClick={()=>{
            setAddingGive(true)
            setAddingTake(false)
            }}>Money Recieved</Button>
          <Button type='button' handleClick={()=>{
            setAddingTake(true)
            setAddingGive(false)
            }}>Money Given</Button>
        </div>
      </div>
    </div>
  )
}
   
   

const mapStateToProps=(state: State, ownProps: Props)=>{
  const customerId=ownProps.params["customerId"]
  return {
    customer: customerSelector(state,customerId)
  }
}
const mapDispatchToProps={
    addTaken,
    addGiven,
    deleteCustomer
}

const connectedComp=connect(mapStateToProps,mapDispatchToProps)

type Redux_props=ConnectedProps<typeof connectedComp>
export default withParams(connectedComp(CustomerTxns))