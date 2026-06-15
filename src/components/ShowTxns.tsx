import { useState } from "react";
import type { CustomersWithId } from "../models";
import { ImMenu } from "react-icons/im";
import Button from "./Button";
import { Link } from "react-router-dom";

function ShowTxns({
  customer,
  onClick,
  deleteCustomer,
}: {
  customer: CustomersWithId;
  onClick: () => void;
  deleteCustomer: () => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const txns = [
    ...Object.entries(customer.moneyToGive ?? {}).map(([id, txn]) => ({
      id,
      ...txn,
      type: "give" as const,
    })),
    ...Object.entries(customer.moneyToTake ?? {}).map(([id, txn]) => ({
      id,
      ...txn,
      type: "take" as const,
    })),
  ].sort((a, b) => {
    const dateDiff =
      new Date(a.date).getTime() - new Date(b.date).getTime();

    if (dateDiff !== 0) return dateDiff;

    return (
      Number(a.id.split("_")[1]) -
      Number(b.id.split("_")[1])
    );
  });

  return (
   <div
    onClick={onClick}
    className="relative flex h-full min-h-0 flex-col"
   >
      {/* Header */}
      <div className="relative mb-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-700">
            {customer.name?.charAt(0)?.toUpperCase()}
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-2xl font-bold text-slate-800">
              {customer.name}
            </h2>

            <p className="text-sm text-slate-500">
              Customer Ledger
            </p>
          </div>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          title="Open menu"
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
          className="absolute right-4 top-4 rounded-lg p-2 transition hover:bg-slate-100"
        >
          <ImMenu size={18} />
        </button>

        {isMenuOpen && (
          <div className="absolute right-4 top-14 z-20 min-w-44 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
            <Link
              to="/"
              className="block px-4 py-3 text-sm hover:bg-slate-100"
            >
              Customers
            </Link>

            <button
              type="button"
              onClick={() => {
                setIsDeleting(true);
                setIsMenuOpen(false);
              }}
              className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50"
            >
              Delete Customer
            </button>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {isDeleting && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsDeleting(false)}
          />

          <div className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-800">
              Delete Customer
            </h3>

            <p className="mt-3 text-slate-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {customer.name}
              </span>
              ?
            </p>

            <div className="mt-6 flex gap-3">
              <Button
                type="button"
                handleClick={deleteCustomer}
              >
                Delete
              </Button>

              <Button
                type="button"
                handleClick={() => setIsDeleting(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Transactions */}
      <div className="flex-1 min-h-0 space-y-3 overflow-y-auto pr-1">
        {txns.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-3 text-5xl">🧾</div>

            <h3 className="font-semibold text-slate-700">
              No Transactions Yet
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Add your first transaction below.
            </p>
          </div>
        )}

        {txns.map((txn) => (
          <div
            key={txn.id}
            className={`flex ${
              txn.type === "give"
                ? "justify-start"
                : "justify-end"
            }`}
          >
            <div
              className={`
                w-60
                sm:w-75
                rounded-2xl
                border
                p-4
                shadow-sm
                ${
                txn.type === "give"
                ? "border-red-200 bg-red-50"
                : "border-green-200 bg-green-50"
                }
             `}
            >
              <div
                className={`text-xl font-bold ${
                  txn.type === "give"
                    ? "text-red-700"
                    : "text-green-700"
                }`}
              >
                ₹{txn.amount}
              </div>

              <div className="mt-1 text-xs text-slate-500">
                {new Date(txn.date).toLocaleDateString()}
              </div>

              {txn.note && (
                <div className="mt-3 wrap-break-word text-sm text-slate-700">
                  {txn.note}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowTxns;