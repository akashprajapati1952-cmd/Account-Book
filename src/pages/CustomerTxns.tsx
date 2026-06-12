import { connect, type ConnectedProps } from "react-redux"
import withParams from "../hocs/withParams"
import type { State } from "../store/store"
import { customerSelector } from "../selectors/customerSelectors"
import ShowTxns from "../components/ShowTxns"
import { Field, Form, Formik } from "formik"
import FormikInput from "../components/FormikInput"
import Button from "../components/Button"

interface Props{
    params: Record<string,string>
}
type CustomerTxnsProps=Props & Redux_props
function CustomerTxns({customer}:CustomerTxnsProps){
  
  function handleSubmit(values: any){
      console.log(values)
  }

  return (
    <div className="flex grow flex-col ">
      <ShowTxns customer={customer}/>
      <Formik 
        initialValues={{amount: '', note:''}}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormikInput name='amount' type='string' label="Amount" placeholder="Enter amount here"/>
          <FormikInput name='note' type='string' label="Note" placeholder="Enter Note"/>
          <Button type='submit'>Add Entry</Button>
        </Form>
      </Formik>
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
  
}

const connectedComp=connect(mapStateToProps,mapDispatchToProps)

type Redux_props=ConnectedProps<typeof connectedComp>
export default withParams(connectedComp(CustomerTxns))