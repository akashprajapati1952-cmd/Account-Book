import { connect, type ConnectedProps } from "react-redux";
import { uploadImg } from "../reducers/userSlice";
import { useState } from "react";
import { ImCross } from "react-icons/im";

const ChangeImg = ({
  hide,
  uploadImg,
}: { hide: () => void } & Redux_props) => {
  const [file, setFile] = useState<File | undefined>(undefined);

  function handleBack() {
    hide();
  }

  function handleSave() {
    uploadImg({
      file: file!,
      message: "Uploading Image please wait..",
    });

    hide();
  }

  return (
    <div
      className="
        fixed
        left-1/2
        top-1/2
        z-50

        w-[92%]
        max-w-sm

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

          hover:bg-slate-100
        "
      >
        <ImCross size={14} />
      </button>

      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-slate-800">
          Change Profile Photo
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Upload a new profile picture
        </p>
      </div>

      <div className="flex flex-col items-center gap-5">
        <img
          src={
            file
              ? URL.createObjectURL(file)
              : "/face.png"
          }
          alt="Selected Image"
          className="
            h-32
            w-32

            rounded-full

            border-4
            border-slate-200

            object-cover

            shadow-md
          "
        />

        <label
          htmlFor="img"
          className="
            w-full

            cursor-pointer

            rounded-xl

            border
            border-slate-300

            bg-slate-50

            px-4
            py-3

            text-center
            font-medium

            text-slate-700

            transition

            hover:bg-slate-100
          "
        >
          Select Image
        </label>

        <input
          id="img"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const myfile = e.target.files?.[0];

            if (!myfile) return;

            setFile(myfile);
          }}
        />

        <div className="flex w-full flex-col gap-3">
          <button
            type="button"
            disabled={!file}
            onClick={handleSave}
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
            Save Image
          </button>

          <button
            type="button"
            onClick={handleBack}
            className="
              w-full

              rounded-xl

              border
              border-slate-300

              py-3

              font-semibold

              text-slate-700

              transition

              hover:bg-slate-100
            "
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  uploadImg,
};

const connectedComp = connect(
  undefined,
  mapDispatchToProps
);

type Redux_props = ConnectedProps<
  typeof connectedComp
>;

export default connectedComp(ChangeImg);