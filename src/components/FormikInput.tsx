import {Field, ErrorMessage} from 'formik';
import type { ReactNode } from 'react';
export default function FormikInput({className, name, type,label,placeholder}: {className?: string, name: string, type: string, label: string, placeholder: string}) {
    let MyField: ReactNode;
    if(type === "select" && name === 'bussinessType'){
      MyField=<Field id={name} name={name}>
        {({ field }: any) => (
          <select {...field} id={name} title={label} aria-label={label} aria-labelledby={`${name}-label`} className={`bg-white text-gray-700 placeholder:text-gray-400 border-2 border-blue-500 focus:outline-none focus:bg-yellow-400  rounded-md px-1 `+ className}>
            <option value="" disabled>{placeholder}</option>
            <option value='retail'>Retail</option>
            <option value='wholesale'>Wholesale</option>
            <option value='service'>Service</option>
          </select>
        )}
      </Field>
    }else if(type === "select" && name === 'gender'){
      MyField=<Field id={name} name={name}>
        {({ field }: any) => (
          <select {...field} id={name} title={label} aria-label={label} aria-labelledby={`${name}-label`} className={`bg-white text-gray-700 placeholder:text-gray-400 border-2 border-blue-500 focus:outline-none focus:bg-yellow-400  rounded-md px-1 `+ className}>
            <option value="" disabled>{placeholder}</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='other'>Other</option>
          </select>
        )}
      </Field>
    }else{
      MyField=<Field id={name} type={type} name={name} placeholder={placeholder} className={`bg-white text-gray-700 placeholder:text-gray-400 border-2 border-blue-500 focus:outline-none focus:bg-yellow-400  rounded-md px-1 `+ className}/>
    }
    return (<div className='flex flex-col gap-1 w-full'>
      <label htmlFor={name} id={`${name}-label`} className='text-sm font-medium text-gray-700'>{label}:</label>
      {MyField}
      <ErrorMessage name={name} component="div" className='text-sm text-red-500'/>
    </div>)
}