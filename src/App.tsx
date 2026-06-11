import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup.page';
import Login from './pages/Login.page';
import ProtectedRoutes from './Tools/ProtectedRoutes';
import CustomerList from './pages/CustomerList.page';
import Header from './components/Header';
import { useAppDispatch } from './store/store';
import { useEffect } from 'react';
import { userRelogin } from './reducers/userSlice';
import CustomerTxns from './pages/CustomerTxns';

 

function App() {
  const dispatch=useAppDispatch();
  useEffect(()=>{
    dispatch(userRelogin())
  },[])

  return (
    <div className='flex flex-col items-center h-dvh '>
      <Header/>
      <div className='flex flex-col grow w-full '>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoutes/>}>
          <Route path='/' element={<CustomerList/>}/>
          <Route path="/customer/:customerId" element={<CustomerTxns/>}/>
        </Route>
      </Routes>
      </div>
    </div>
  )
}
 

export default App
