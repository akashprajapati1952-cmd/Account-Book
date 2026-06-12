export default function Button({type, children, handleClick}:{type: 'submit' | 'reset' | 'button'; children: string; handleClick?:()=>void}){
    return <button type={type} onClick={handleClick ? handleClick : undefined} className=' text-white px-4 py-1 rounded bg-red-900 w-full'>{children}</button>
}