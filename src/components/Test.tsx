import type { Customer } from "../models";


function Test({customer}: {customer: Customer}) {
    return (
        <article className="flex  mx-2 my-2 h-10 justify-between items-center px-2 rounded-md shadow-[inset_0px_0px_40px_10px_#03fc77]">
            <h1><i>{customer.name}</i></h1>
            <b className="text-green-700">Rs 1000</b>
        </article>
    )
}

export default Test;
