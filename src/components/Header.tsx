import { connect, type ConnectedProps } from "react-redux"
import { userSelector } from "../selectors/userSelectors"
import type { State } from "../store/store"
import { useNavigate } from "react-router-dom"

const Header=({user}: Redux_props)=>{
    const navigate=useNavigate()
    return(
        <header className="bg-gray-800 text-white p-2 h-15 flex justify-between items-center gap-2 w-full">
            <h1><b>Account Book</b></h1>
            <img onClick={()=>navigate('/userProfile')} className="h-10 w-10 rounded-full object-cover" src={user.img ? user.img : '/face.png'} alt="logo"/>
        </header>
    )
}

const mapStateToProps=(state: State)=>({
  user: userSelector(state)
})
const mapDispatchToProps={

}

const connectedComp=connect(mapStateToProps,mapDispatchToProps)

type Redux_props=ConnectedProps<typeof connectedComp>

export default connectedComp(Header);
