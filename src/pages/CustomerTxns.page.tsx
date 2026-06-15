import { connect, type ConnectedProps } from "react-redux";
import withParams from "../hocs/withParams";
import type { State } from "../store/store";
import { customerSelector } from "../selectors/customerSelectors";
import ShowTxns from "../components/ShowTxns";
import AddEntry from "../components/AddEntry";
import Button from "../components/Button";
import { useState } from "react";
import {
  addGiven,
  addTaken,
  deleteCustomer,
} from "../reducers/customerSlice";
import { useNavigate } from "react-router-dom";

interface Props {
  params: Record<string, string>;
}

type CustomerTxnsProps = Props & Redux_props;

function CustomerTxns({
  customer,
  addGiven,
  addTaken,
  params,
  deleteCustomer,
}: CustomerTxnsProps) {
  const navigate = useNavigate();

  const customerId = params["customerId"];

  const [addingTake, setAddingTake] = useState(false);
  const [addingGive, setAddingGive] = useState(false);

  function handleTakenSubmit(values: any) {
    addTaken({
      values,
      customerId,
      message: "Adding Transaction...",
    });

    setAddingTake(false);
  }

  function handleGivenSubmit(values: any) {
    addGiven({
      values,
      customerId,
      message: "Adding Transaction...",
    });

    setAddingGive(false);
  }

  const balance = customer.totalTake - customer.totalGive;

  return (
    <main className="relative min-h-screen bg-slate-50">
      {/* Transaction List */}
      <section className="h-[calc(100vh-220px)] overflow-hidden p-4">
        <ShowTxns
          onClick={() => {
            setAddingGive(false);
            setAddingTake(false);
          }}
          deleteCustomer={() => {
            deleteCustomer({
              customerId: customer.customerId,
              message: "Deleting Customer...",
            });

            navigate(-1);
          }}
          customer={customer}
        />
      </section>

      {/* Modal */}
      {(addingGive || addingTake) && (
        <>
          <div
            className="
              fixed
              inset-0
              z-40
              bg-black/40
              backdrop-blur-sm
            "
            onClick={() => {
              setAddingGive(false);
              setAddingTake(false);
            }}
          />

          <div
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

              p-6

              shadow-2xl
            "
          >
            {addingTake && (
              <AddEntry
                heading="Add Given"
                handleSubmit={handleTakenSubmit}
              />
            )}

            {addingGive && (
              <AddEntry
                heading="Add Received"
                handleSubmit={handleGivenSubmit}
              />
            )}
          </div>
        </>
      )}

      {/* Bottom Summary Card */}
      <section
        className="
          fixed
          bottom-0
          left-0
          right-0

          border-t
          border-slate-200

          bg-white

          shadow-[0_-4px_20px_rgba(0,0,0,0.08)]

          p-4
        "
      >
        <div className="max-w-5xl mx-auto">
          {/* Balance Card */}
          <div
            className="
              mb-4

              rounded-2xl

              bg-linear-to-r
              from-indigo-600
              to-indigo-700

              p-4

              text-white
            "
          >
            <p className="text-sm opacity-80">
              Current Balance
            </p>

            <h2 className="mt-1 text-3xl font-bold">
              ₹{balance}
            </h2>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              handleClick={() => {
                setAddingGive(true);
                setAddingTake(false);
              }}
            >
              Money Received
            </Button>

            <Button
              type="button"
              handleClick={() => {
                setAddingTake(true);
                setAddingGive(false);
              }}
            >
              Money Given
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

const mapStateToProps = (
  state: State,
  ownProps: Props
) => {
  const customerId = ownProps.params["customerId"];

  return {
    customer: customerSelector(state, customerId),
  };
};

const mapDispatchToProps = {
  addTaken,
  addGiven,
  deleteCustomer,
};

const connectedComp = connect(
  mapStateToProps,
  mapDispatchToProps
);

type Redux_props = ConnectedProps<typeof connectedComp>;

export default withParams(
  connectedComp(CustomerTxns)
);