import { useNavigate } from "react-router-dom";
import type { CustomersWithId } from "../models";

export default function Customer({
  customer,
  total,
}: {
  customer: CustomersWithId;
  total: number;
}) {
  const navigate = useNavigate();

  const isPositive = total >= 0;

  return (
    <article
      onClick={() => navigate("/customer/" + customer.customerId)}
      className="
        group
        w-full
        cursor-pointer

        rounded-2xl
        border
        border-slate-200

        bg-white

        p-4

        shadow-sm
        transition-all
        duration-200

        hover:-translate-y-1
        hover:shadow-lg
        hover:border-indigo-300
      "
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex items-center gap-3">
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center

              rounded-full

              bg-indigo-100

              text-lg
              font-bold
              text-indigo-700
            "
          >
            {customer.name?.charAt(0)?.toUpperCase()}
          </div>

          <div className="min-w-0">
            <h2
              className="
                truncate
                text-base
                font-semibold
                text-slate-800
              "
            >
              {customer.name}
            </h2>

            <p className="text-sm text-slate-500">
              Customer Account
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-slate-500 mb-1">
            Balance
          </p>

          <div
            className={`
              inline-flex
              items-center
              rounded-full
              px-3
              py-1

              text-sm
              font-bold

              ${
                isPositive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }
            `}
          >
            ₹ {Math.abs(total)}
          </div>
        </div>
      </div>
    </article>
  );
}