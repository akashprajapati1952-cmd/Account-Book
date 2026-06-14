import { createSelector } from "@reduxjs/toolkit"
import type { State } from "../store/store"

const userStateSelector=(state: State)=>state.user
export const userSelector=createSelector(userStateSelector,(userState)=>userState.user)
export const userErrorSelector=createSelector(userStateSelector,(userState)=>userState.error)