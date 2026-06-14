import {useEffect} from 'react';

interface AlertProps {
    alert: {type: string | null,message: string | null};
    removeAlert: ()=>void
}

function Alert({alert,removeAlert}: AlertProps) {
  let color=""
  useEffect(() => {
    
      if(alert.message) {
        const timer = setTimeout(() => {
          removeAlert();
        }, 5* 1000);
        return () => clearTimeout(timer);
      }
  },[alert])
  
  
  if(!alert.message) {
    return null;
  }
  if(alert.type === "success"){
      color=" bg-green-700"
    }else if(alert.type === "warning"){
      color=" bg-yellow-700"
    }else{
      color=" bg-red-700"
    }

  return (
    <div className={`w-[90%]  z-50   flex items-center justify-between border border-gray-500 pr-2 rounded fixed top-20 left-1/2 -translate-x-1/2 -translate-y-1/2 ${color} `}>
      <p className='pl-1'><i>{alert.message}</i></p>
      <button type='button' className=' h-full ' onClick={()=>removeAlert()}>Dismiss</button>
  
    </div>
  )
 
}


export default (Alert);