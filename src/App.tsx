import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup.page';
import Login from './pages/Login.page';
import ProtectedRoutes from './Tools_And_Data/ProtectedRoutes';
import CustomerList from './pages/CustomerList.page';
import Header from './components/Header';
import { useAppDispatch, type State } from './store/store';
import { useEffect } from 'react';
import { removeUserErrorAction, userRelogin } from './reducers/userSlice';
import CustomerTxns from './pages/CustomerTxns.page';
import UserProfile from './pages/UserProfile.page';
import ForgotPasswordPage from './pages/ForgotPassword.page';
import Test from './pages/VoicePlayground.page';
import Message from './components/Message';
import { connect, type ConnectedProps } from 'react-redux';
import { removeCustomerErrorAction } from './reducers/customerSlice';
import { customerErrorSelector } from './selectors/customerSelectors';
import { userErrorSelector } from './selectors/userSelectors';
import Dashboard from "./pages/Dashboard.page";
import AboutPage from './pages/About.page';

 

function App({
  userMessage,
  removeUserError,
  customerMessage,
  removeCustomerError,
}: Redux_props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userRelogin({ message: "" }));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {(userMessage.message || customerMessage.message) && (
        <div className="fixed top-20 left-1/2 z-100 w-[95%] max-w-md -translate-x-1/2">
          {userMessage.message ? (
            <Message
              alert={userMessage}
              removeAlert={removeUserError}
            />
          ) : (
            <Message
              alert={customerMessage}
              removeAlert={removeCustomerError}
            />
          )}
        </div>
      )}

      <main className="mx-auto w-full max-w-7xl flex-1">
        <Routes>
          <Route path="/test" element={<Test />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/forgotPassword"
            element={<ForgotPasswordPage />}
          />

          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<CustomerList />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/customer/:customerId"
              element={<CustomerTxns />}
            />
            <Route
              path="/userProfile"
              element={<UserProfile />}
            />
          </Route>
        </Routes>
      </main>
    </div>
  );
}
 
const mapStateToProps=(state: State)=>{
  
  return {
    customerMessage: customerErrorSelector(state),
    userMessage:userErrorSelector(state)
  }
}
const mapDispatchToProps={
    removeUserError: removeUserErrorAction,
    removeCustomerError: removeCustomerErrorAction
}

const connectedComp=connect(mapStateToProps,mapDispatchToProps)

type Redux_props=ConnectedProps<typeof connectedComp>

export default connectedComp(App)
