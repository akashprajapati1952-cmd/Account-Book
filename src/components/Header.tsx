import { connect, type ConnectedProps } from "react-redux"
import { userSelector } from "../selectors/userSelectors"
import type { State } from "../store/store"

const Header=({user}: Redux_props)=>{
    return(
        <header className="bg-gray-800 text-white p-2 h-15 flex justify-between items-center gap-2 w-full">
            <h1><b>Account Book</b></h1>
            <img className=" h-full rounded-full object-cover" src={user.img ? user.img : '/face.png'} alt="logo"/>
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
