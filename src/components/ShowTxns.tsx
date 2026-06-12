import type { CustomersWithId } from "../models";

function ShowTxns({customer, onClick}: {customer: CustomersWithId, onClick: ()=>void}){
    
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
    ].sort((a, b) =>{
      const dateDiff= new Date(a.date).getTime() - new Date(b.date).getTime()
      if(dateDiff !== 0)return dateDiff;
      return(Number(a.id.split('_')[1])-Number(b.id.split('_')[1]))
    });
    return (
      <div onClick={onClick} className="grow ">
        <h2 className="text-xl font-bold mb-4 text-center">
          {customer.name}
        </h2>

        <div className="space-y-4">
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
                className={`w-72 rounded-lg p-3 shadow border ${
                  txn.type === "give"
                  ? "bg-red-50 border-red-200"
                  : "bg-green-50 border-green-200"
                }`}
            >
                <div className="font-semibold text-lg">
                    ₹{txn.amount}
                </div>

                <div className="text-sm text-gray-500">
                    {new Date(txn.date).toLocaleDateString()}
                </div>

                {txn.note && (
                    <div className="mt-2 text-sm">
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

export default ShowTxns