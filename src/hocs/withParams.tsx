import type { ComponentType } from "react";
import { useParams } from "react-router-dom";
interface WithParams{params: Record<string,string>}
const withParams=<P extends WithParams>(Component: ComponentType<P>)=>(
    
     (props: Omit<P, keyof WithParams>)=>{
        const params=useParams()
        return <Component {...(props as P)} params={params}/>}
)

export default withParams;
