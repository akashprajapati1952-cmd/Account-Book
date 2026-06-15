import { connect, type ConnectedProps } from "react-redux";
import { customerListSelector } from "../selectors/customerSelectors";
import type { State } from "../store/store";
import { Form, Formik } from "formik";
import {
  addCustomer,
  onCustomerLoading,
  searchCustomer,
} from "../reducers/customerSlice";
import FormikInput from "../components/FormikInput";
import { useEffect, useState } from "react";
import Custommer from "../components/Customer";
import { ImCross } from "react-icons/im";
import * as Yup from "yup";

function CustomerList({
  customers,
  addCustomer,
  searchCustomer,
  searchResults,
  loading,
  onLoading,
}: Redux_props) {
  const [isAdding, setIsAdding] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.trim()) {
        searchCustomer({
          query: search,
        });
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [search]);

  const displayCustomers =
    !loading && search ? Object.values(searchResults) : customers;

  function handleSubmit(values: any) {
    addCustomer({ values, message: "Adding Customer" });
    setIsAdding(false);
  }

  return (
    <main className="relative min-h-screen bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto p-4">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
            Customers
          </h1>

          <input
            type="text"
            placeholder="Search customer..."
            value={search}
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);

              if (!loading && value) onLoading(true);
              if (!value) onLoading(false);
            }}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              py-3
              text-slate-700
              shadow-sm
              outline-none
              transition
              focus:border-indigo-500
              focus:ring-2
              focus:ring-indigo-500/30
            "
          />
        </div>
      </div>

      {/* Customer List */}
      {displayCustomers.length !== 0 ? (
        <section className="max-w-5xl mx-auto p-4 pb-28 flex flex-col gap-3">
          {displayCustomers.map((c: any) => (
            <Custommer
              key={c.customerId || c.name}
              customer={c}
              total={c.totalTake - c.totalGive}
            />
          ))}
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
          <div className="text-6xl mb-4">👥</div>

          <h2 className="text-xl font-semibold text-slate-700">
            No Customers Found
          </h2>

          <p className="text-slate-500 mt-2">
            Add a customer to start tracking transactions.
          </p>
        </div>
      )}

      {/* Floating Button */}
      {!isAdding && (
        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className="
            fixed
            bottom-6
            right-6
            z-30

            rounded-full
            bg-indigo-600
            px-6
            py-3

            text-white
            font-semibold

            shadow-xl

            transition
            hover:bg-indigo-700
            hover:scale-105
          "
        >
          + Add Customer
        </button>
      )}

      {/* Modal */}
      {isAdding && (
        <>
          <div
            className="
              fixed
              inset-0
              z-40
              bg-black/40
              backdrop-blur-sm
            "
            onClick={() => setIsAdding(false)}
          />

          <Formik
            initialValues={{ name: "", mobile: "" }}
            validationSchema={Yup.object({
              name: Yup.string().required(),
              mobile: Yup.string()
                .matches(
                  /^[0-9]{10}$/,
                  "Mobile number should be 10 digits long"
                )
                .required(),
            })}
            onSubmit={handleSubmit}
          >
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
                bg-white

                px-6
                py-6

                shadow-2xl
              "
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800">
                  Add Customer
                </h2>

                <ImCross
                  className="
                    cursor-pointer
                    text-slate-500
                    transition
                    hover:text-red-500
                  "
                  onClick={() => setIsAdding(false)}
                />
              </div>

              <div className="space-y-4">
                <FormikInput
                  name="name"
                  type="text"
                  placeholder="Enter customer name"
                  label="Customer Name"
                />

                <FormikInput
                  name="mobile"
                  type="text"
                  placeholder="Enter mobile number"
                  label="Mobile Number"
                />
              </div>

              <button
                type="submit"
                className="
                  mt-6
                  w-full

                  rounded-xl
                  bg-indigo-600

                  py-3

                  font-semibold
                  text-white

                  transition
                  hover:bg-indigo-700
                "
              >
                Add Customer
              </button>
            </Form>
          </Formik>
        </>
      )}
    </main>
  );
}

const mapStateToProps = (state: State) => ({
  customers: customerListSelector(state),
  searchResults: state.customers.searchResults,
  loading: state.customers.seaching,
});

const mapDispatchToProps = {
  addCustomer,
  searchCustomer,
  onLoading: onCustomerLoading,
};

const connectedComp = connect(
  mapStateToProps,
  mapDispatchToProps
);

type Redux_props = ConnectedProps<typeof connectedComp>;

export default connectedComp(CustomerList);