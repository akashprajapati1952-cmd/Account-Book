import {useEffect} from 'react';

interface AlertProps {
    alert: string;
    removeAlert: ()=>void
}

function Alert({alert,removeAlert}: AlertProps) {
  useEffect(() => {
      if(alert) {
        const timer = setTimeout(() => {
          removeAlert();
        }, 5* 1000);
        return () => clearTimeout(timer);
      }
  },[alert])
  
  if(!alert) {
    return null;
  }

  console.log('alert rendered')
  
  return (
    <div className='w-[90%]  z-50 bg-gray-500  flex items-center justify-between border border-gray-500 pr-2 rounded fixed top-20 left-1/2 -translate-x-1/2 -translate-y-1/2  '>
      <p>{alert}</p>
      <button type='button' className=' h-full ' onClick={()=>removeAlert()}>Dismiss</button>
  
    </div>
  )
 
}


export default (Alert);