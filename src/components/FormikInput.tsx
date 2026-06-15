import { Field, ErrorMessage } from "formik";
import type { ReactNode } from "react";
import businessTypes from "../Tools_And_Data/businessTypes";

export default function FormikInput({
  className = "",
  name,
  type,
  label,
  placeholder,
  readonly,
}: {
  className?: string;
  name: string;
  type: string;
  label: string;
  placeholder: string;
  readonly?: boolean;
}) {
  const inputClass = `
    w-full
    rounded-xl
    border
    border-slate-300
    bg-white

    px-4
    py-3

    text-slate-700
    placeholder:text-slate-400

    outline-none

    transition-all
    duration-200

    focus:border-indigo-500
    focus:ring-4
    focus:ring-indigo-500/20

    ${className}
  `;

  let MyField: ReactNode;

  if (type === "select" && name === "businessType") {
    MyField = (
      <>
        <Field
          id={name}
          name={name}
          type="text"
          list="business-types"
          placeholder={placeholder}
          readOnly={readonly ?? false}
          className={inputClass}
        />

        <datalist id="business-types">
          {businessTypes.map((type) => (
            <option key={type} value={type} />
          ))}
        </datalist>
      </>
    );
  } else if (type === "select" && name === "gender") {
    MyField = (
      <>
        <Field
          id={name}
          name={name}
          type="text"
          list="gender-options"
          placeholder={placeholder}
          readOnly={readonly ?? false}
          className={inputClass}
        />

        <datalist id="gender-options">
          <option value="male" />
          <option value="female" />
          <option value="other" />
        </datalist>
      </>
    );
  } else {
    MyField = (
      <Field
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        readOnly={readonly ?? false}
        className={inputClass}
      />
    );
  }

  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="
          mb-1
          block
          text-sm
          font-medium
          text-slate-700
        "
      >
        {label}
      </label>

      {MyField}

      <ErrorMessage
        name={name}
        component="div"
        className="
          mt-1
          text-xs
          font-medium
          text-red-500
        "
      />
    </div>
  );
}