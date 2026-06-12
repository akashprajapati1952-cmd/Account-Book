import { Form, Formik } from "formik";
import FormikInput from "./FormikInput";
import Button from "./Button";
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
                <Button type='submit'>Add Entry</Button>
            </Form>
        </Formik>
    )
    
}

export default AddEntry;