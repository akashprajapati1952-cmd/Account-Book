
import type { State } from "../store/store";
import { createSelector } from "@reduxjs/toolkit";

const formsStateSelector = (state: State) => state.formsState;
export const addingReceivedSelector = createSelector(formsStateSelector, (formsState) => formsState.addingReceived);
export const addingGivenSelector = createSelector(formsStateSelector, (formsState) => formsState.addingGiven);
export const addingCustomerSelector = createSelector(formsStateSelector, (formsState) => formsState.addingCustomer);