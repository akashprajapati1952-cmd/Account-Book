import { connect, type ConnectedProps } from "react-redux";
import { userSelector } from "../selectors/userSelectors";
import type { State } from "../store/store";
import React from "react";
import { Navigate , Outlet} from "react-router-dom";     

function ProtectedRoutes({user}: Redux_props){
  return user.email
    ? React.createElement(Outlet)
    : React.createElement(Navigate, { to: "/login", replace: true });
}
const mapStateToProps=(state: State)=>({
  user: userSelector(state)
})

const connectedComp=connect(mapStateToProps,null)

type Redux_props=ConnectedProps<typeof connectedComp>
export default connectedComp(ProtectedRoutes);