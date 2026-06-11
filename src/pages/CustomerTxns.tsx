import { connect, type ConnectedProps } from "react-redux"
import withParams from "../hocs/withParams"
import type { State } from "../store/store"
import { customerSelector } from "../selectors/customerSelectors"

interface Props{
    params: Record<string,string>
}
type CustomerTxnsProps=Props & Redux_props
function CustomerTxns({customer}:CustomerTxnsProps){
   
    return (
        
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