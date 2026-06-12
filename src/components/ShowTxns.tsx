import { useState } from "react";
import type { CustomersWithId } from "../models";
import { ImMenu } from "react-icons/im";
import Button from "./Button";


function ShowTxns({customer, onClick,deleteCustomer}: {customer: CustomersWithId, onClick: ()=>void,deleteCustomer: ()=>void}){
  const [isMenuOpen,setIsMenuOpen]=useState(false)
  const [isDeleting, setIsDeleting]=useState(false)
    
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
      <div onClick={onClick} className="relative flex flex-col h-[70dvh]">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold mb-4 text-center">
            {customer.name}
          </h2>
          <ImMenu onClick={()=>setIsMenuOpen(!isMenuOpen)} />
        </div>
        {isMenuOpen && <div className="absolute top-5 right-1 border-2 px-2 rounded-lg bg-gray-500">
          <button type="button" onClick={()=>{
            setIsDeleting(true)
            setIsMenuOpen(false)
          }}>Delete Customer</button>
        </div>}
        {isDeleting && <div className="absolute top-1/2 left-[calc(50%-140px)] w-70 bg-rose-700 p-2 rounded-lg space-y-2">
          <p className="text-center">Are you sure to delete customer named {customer.name}?</p>
          <div className="flex gap-2">
            <Button type="button" handleClick={deleteCustomer}>Delete</Button>
            <Button type="button" handleClick={()=>setIsDeleting(false)}>Back</Button>
          </div>
        </div>}

        <div className="grow space-y-4 overflow-y-auto max-h-full">
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