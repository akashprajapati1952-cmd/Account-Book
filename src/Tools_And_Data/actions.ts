import { addCustomer, addGiven, addTaken, deleteCustomer, removeCustomerErrorAction, searchCustomer, setCustomersAction, setQueryAction } from "../reducers/customerSlice";
import { getDashboard, getRecentTransactions } from "../reducers/dashboardSlice";
import { setAddingCustomer, setAddingGiven, setAddingReceived } from "../reducers/formsState";
import { deleteAccount, getEmailChangeOtp, getForgetPasswordOtp, logoutAction, removeUserErrorAction, updateUser, uploadImg, userLogin, userRelogin, userSignup, userVerify, verifyEmailChangeOtp, verifyForgetPasswordOtp } from "../reducers/userSlice";

const actions: Record<string, Function> = {deleteCustomer,

    removeCustomerErrorAction,
    setCustomersAction,
    addCustomer,
    searchCustomer,
    addTaken,
    addGiven,
    getRecentTransactions,
    getDashboard,
    uploadImg,
    getEmailChangeOtp,
    verifyEmailChangeOtp,
    getForgetPasswordOtp,
    verifyForgetPasswordOtp,
    updateUser,
    userSignup,
    userVerify,
    userLogin,
    userRelogin,
    deleteAccount,
    logoutAction,
    removeUserErrorAction,
    setAddingReceived,
    setAddingGiven,
    setAddingCustomer,
    setQueryAction
    
}

export default actions