import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikInput from "./FormikInput";
import { useState } from "react";
import Countdown from "./Timer";
import {
  getEmailChangeOtp,
  verifyEmailChangeOtp,
} from "../reducers/userSlice";
import { connect, type ConnectedProps } from "react-redux";
import { ImCross } from "react-icons/im";

interface Props {
  hide: () => void;
}

const ChangeEmail = ({
  getOtp,
  verifyOtp,
  hide,
}: Redux_props & Props) => {
  const [isFirst, setIsFirst] = useState(true);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validationSchema = Yup.object({
    newEmail: Yup.string()
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email"
      )
      .required(),
    newEmailOtp: Yup.string()
      .matches(/^[0-9]{6}$/, "Please enter a valid OTP")
      .required(),
    oldEmailOtp: Yup.string()
      .matches(/^[0-9]{6}$/, "Please enter a valid OTP")
      .required(),
  });

  return (
    <Formik
      initialValues={{
        newEmail: "",
        newEmailOtp: "",
        oldEmailOtp: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        verifyOtp({
          values: {
            newEmailOtp: values.newEmailOtp,
            oldEmailOtp: values.oldEmailOtp,
          },
          message: "Verifying OTP please wait...",
        });

        hide();
      }}
    >
      {({ values }) => (
        <Form
          className="
            fixed
            left-1/2
            top-1/2
            z-50

            w-[92%]
            max-w-md

            -translate-x-1/2
            -translate-y-1/2

            rounded-3xl
            border
            border-slate-200

            bg-white

            p-6

            shadow-2xl
          "
        >
          <button
            type="button"
            aria-label="Close modal"
            onClick={hide}
            className="
              absolute
              right-4
              top-4

              rounded-lg
              p-2

              transition

              hover:bg-slate-100
            "
          >
            <ImCross size={14} />
          </button>

          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-slate-800">
              Change Email
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Verify both email addresses to continue
            </p>
          </div>

          <div className="space-y-4">
            <FormikInput
              name="newEmail"
              label="New Email"
              placeholder="Enter new email"
              type="email"
            />

            <button
              type="button"
              disabled={
                isOtpSent ||
                !regex.test(values.newEmail)
              }
              onClick={() => {
                setIsOtpSent(true);

                getOtp({
                  newEmail: values.newEmail,
                  message: "Sending OTP",
                });

                if (isFirst) {
                  setIsFirst(false);
                }
              }}
              className="
                w-full

                rounded-xl

                bg-indigo-600

                py-3

                font-semibold
                text-white

                transition-all

                hover:bg-indigo-700

                disabled:cursor-not-allowed
                disabled:bg-slate-400
              "
            >
              {isFirst ? (
                "Send OTP"
              ) : isOtpSent ? (
                <div className="flex justify-center gap-2">
                  Resend OTP in
                  <Countdown
                    timerEnd={() =>
                      setIsOtpSent(false)
                    }
                  />
                </div>
              ) : (
                "Resend OTP"
              )}
            </button>

            <FormikInput
              name="oldEmailOtp"
              label="Old Email OTP"
              placeholder="Enter old OTP"
              type="text"
            />

            <FormikInput
              name="newEmailOtp"
              label="New Email OTP"
              placeholder="Enter new OTP"
              type="text"
            />

            <button
              type="submit"
              className="
                mt-2

                w-full

                rounded-xl

                bg-indigo-600

                py-3

                font-semibold
                text-white

                transition-all

                hover:bg-indigo-700

                active:scale-[0.98]
              "
            >
              Change Email
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const mapDispatchToProps = {
  getOtp: getEmailChangeOtp,
  verifyOtp: verifyEmailChangeOtp,
};

const connectedComp = connect(
  undefined,
  mapDispatchToProps
);

type Redux_props = ConnectedProps<
  typeof connectedComp
>;

export default connectedComp(ChangeEmail);