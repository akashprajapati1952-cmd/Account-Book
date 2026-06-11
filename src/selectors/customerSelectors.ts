import { createSelector } from "@reduxjs/toolkit";
import type { State } from "../store/store";

export const customersSelector=(state: State)=> state.customers

export const customerListSelector=createSelector(customersSelector,(customers)=>Object.values(customers.customers))

export const customerSelector=(state: State, customerId: string)=>state.customers.customers[customerId]

export const customerLoadingSelector=createSelector(customersSelector,(customers)=>customers.loading)

export const customerErrorSelector=createSelector(customersSelector,(customers)=>customers.error)