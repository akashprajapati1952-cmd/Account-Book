import { addCustomer, addGiven, addTaken, deleteCustomer, onCustomerLoading, removeCustomerErrorAction, searchCustomer, setCustomersAction } from "../reducers/customerSlice";
import { getDashboard, getRecentTransactions } from "../reducers/dashboardSlice";
import { deleteAccount, getEmailChangeOtp, getForgetPasswordOtp, logoutAction, removeUserErrorAction, updateUser, uploadImg, userLogin, userRelogin, userSignup, userVerify, verifyEmailChangeOtp, verifyForgetPasswordOtp } from "../reducers/userSlice";

const actions: Record<string, Function> = {deleteCustomer,
    onCustomerLoading,
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
    removeUserErrorAction
}

export default actions