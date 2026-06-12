export default function Button({type, children}:{type: 'submit' | 'reset' | 'button'; children: string}){
    return <button type={type} className=' text-white px-4 py-1 rounded bg-red-900 w-full'>{children}</button>
}