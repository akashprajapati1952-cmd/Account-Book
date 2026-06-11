import { useNavigate } from "react-router-dom";
import type { Customer, CustomersWithId } from "../models";

export default function Customer({customer, total}: {customer: CustomersWithId; total: number}){
    const navigate= useNavigate()
    return (
        <article onClick={()=>navigate('/customer/'+customer.customerId)} className="flex h-10 w-full justify-between cursor-pointer items-center px-2 rounded-md shadow-[inset_0px_0px_40px_10px_#03fc77]">
            <h1><i>{customer.name}</i></h1>
            <b className="text-green-700 w-17 text-center">Rs {total}</b>
        </article>
    )
}