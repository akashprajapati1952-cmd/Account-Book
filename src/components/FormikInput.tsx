import {Field, ErrorMessage} from 'formik';
import type { ReactNode } from 'react';
import businessTypes from '../Tools_And_Data/businessTypes'
export default function FormikInput({className, name, type,label,placeholder,readonly}: {className?: string, name: string, type: string, label: string, placeholder: string, readonly?: boolean}) {
    let MyField: ReactNode;
    if(type === "select" && name === 'businessType'){
      MyField=<><Field id={name} name={name} type="text" list="datalist"  placeholder={placeholder} readOnly={readonly? readonly : false} className={`bg-white text-gray-700 placeholder:text-gray-400 border-2 border-blue-500 focus:outline-none focus:bg-yellow-400  rounded-md px-1 `+ className}/>
        
          <datalist id='datalist'>
            
            {businessTypes.map((type)=><option key={type} value={type}/>)}
          </datalist></>
        
      
    }else if(type === "select" && name === 'gender'){
      MyField=<><Field id={name} name={name} type="text" list="datalist2"  placeholder={placeholder} readOnly={readonly? readonly : false} className={`bg-white text-gray-700 placeholder:text-gray-400 border-2 border-blue-500 focus:outline-none focus:bg-yellow-400  rounded-md px-1 `+ className}/>
        
          <datalist id='datalist2'>
            
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='other'>Other</option>
          </datalist>
       </>
     
    }else{
      MyField=<Field id={name} type={type} name={name} placeholder={placeholder} readOnly={readonly? readonly : false} className={`bg-white text-gray-700 placeholder:text-gray-400 border-2 border-blue-500 focus:outline-none focus:bg-yellow-400  rounded-md px-1 `+ className}/>
    }
    return (<div className='flex flex-col gap-1 w-full'>
      <label htmlFor={name} id={`${name}-label`} className='text-sm font-medium text-gray-700'>{label}:</label>
      {MyField}
      <ErrorMessage name={name} component="div" className='text-sm text-red-500'/>
    </div>)
}