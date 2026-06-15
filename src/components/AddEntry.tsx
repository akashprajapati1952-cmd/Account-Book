import { Form, Formik } from "formik";
import FormikInput from "./FormikInput";
import * as Yup from "yup";

function AddEntry({
  handleSubmit,
  heading,
}: {
  handleSubmit: (values: any) => void;
  heading: string;
}) {
  const validationSchema = Yup.object({
    amount: Yup.string().required("Amount is required"),
    note: Yup.string().required("Note is required"),
  });

  return (
    <Formik
      initialValues={{
        amount: "",
        note: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="flex w-full flex-col gap-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800">
            {heading}
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Record transaction details
          </p>
        </div>

        <FormikInput
          name="amount"
          type="number"
          label="Amount"
          placeholder="Enter amount"
        />

        <FormikInput
          name="note"
          type="text"
          label="Note"
          placeholder="Enter note"
        />

        <button
          type="submit"
          className="mt-2 w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white  shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md active:scale-[0.98]"
        >
          Add Entry
        </button>
      </Form>
    </Formik>
  );
}

export default AddEntry;