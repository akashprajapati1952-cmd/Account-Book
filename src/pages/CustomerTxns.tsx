import { connect, type ConnectedProps } from "react-redux"
import withParams from "../hocs/withParams"
import type { State } from "../store/store"
import { customerSelector } from "../selectors/customerSelectors"
import ShowTxns from "../components/ShowTxns"
import AddEntry from "../components/AddEntry"
import Button from "../components/Button"
import { useState } from "react"
import { addGiven, addTaken } from "../reducers/customerSlice"


interface Props{
    params: Record<string,string>
}
type CustomerTxnsProps=Props & Redux_props
function CustomerTxns({customer, addGiven,addTaken,params}:CustomerTxnsProps){
  const customerId=params['customerId']
  const [addingTake, setAddingTake]=useState(false)
  const [addingGive, setAddingGive]=useState(false)
  console.log(customerId)
  function handleTakenSubmit(values: any){
    addTaken({values,customerId})
    setAddingTake(false)
    console.log(values)
  }
  function handleGivenSubmit(values: any){
    addGiven({values,customerId})
    setAddingGive(false)
    console.log(values)
  }

  return (
    <div  className="flex grow flex-col relative bg-red-600">
      <ShowTxns onClick={()=>{
          setAddingGive(false)
          setAddingTake(false)
        }} 
        customer={customer}
      />
      
      { (addingGive || addingTake) && (<div className="absolute left-[calc(50%-140px)] top-[calc(50%-100px)] p-5 bg-green-500 rounded-lg">
          
          {addingTake && <AddEntry heading="Add Given" handleSubmit={handleTakenSubmit}/>}
          {addingGive && <AddEntry heading="Add Recieved" handleSubmit={handleGivenSubmit}/>}
      </div>)}
      <div className="flex justify-between px-2 mb-3">
        <p><b>Total:</b></p>
        <p><b>₹{customer.totalTake-customer.totalGive}</b></p>
      </div>
      <div className="flex">
        
        <Button type='button' handleClick={()=>{
          setAddingGive(true)
          setAddingTake(false)
          }}>Add Recieved</Button>
        <Button type='button' handleClick={()=>{
          setAddingTake(true)
          setAddingGive(false)
          }}>Add Given</Button>
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
    addGiven
}

const connectedComp=connect(mapStateToProps,mapDispatchToProps)

type Redux_props=ConnectedProps<typeof connectedComp>
export default withParams(connectedComp(CustomerTxns))