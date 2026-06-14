import Alert from "./Message";


function Test() {
    return (
        <Alert alert="User login Success" removeAlert={()=>console.log("Alert Removed")}/>
    )
}

export default Test;
