import { Form, Formik } from "formik";
import FormikInput from "./FormikInput";
import * as Yup from 'yup'

function AddEntry({handleSubmit,heading}:{handleSubmit: (values: any)=>void; heading: string}){
    const validationSchema=Yup.object({
        amount: Yup.string().required(),
        note: Yup.string().required()
    })
    return (
        <Formik 
            initialValues={{amount: '', note:''}}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form className="w-60 flex flex-col items-center gap-2">
                <h1 className="text-lg"><b>{heading}</b></h1>
                <FormikInput name='amount' type='number' label="Amount" placeholder="Enter amount here"/>
                <FormikInput name='note' type='string' label="Note" placeholder="Enter Note"/>
                <button type='submit' className=' text-white px-4 py-1 rounded bg-red-900 w-full'>Add Entry</button>
            </Form>
        </Formik>
    )
    
}

export default AddEntry;