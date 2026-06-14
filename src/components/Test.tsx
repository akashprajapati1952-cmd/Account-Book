import Alert from "./Message";


function Test() {
    return (
        <Alert alert={{message:"User login Success", type: "warning"}} removeAlert={()=>console.log("Alert Removed")}/>
    )
}

export default Test;
