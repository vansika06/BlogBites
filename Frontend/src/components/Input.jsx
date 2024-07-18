import React ,{useId,forwardRef }from 'react'
const Input=forwardRef(function Input({
    label,
    type="text",
    className="",
    ...props
},ref){
    const id=useId();
    return(
        <div className='w-full md:flex md:items-center md:justify-center mb-6'>
            {
                label && ( <div class="md:w-1/3">
                <label className='class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4' htmlFor={id}>{label}</label>
                </div>)
            }
            <div class="md:w-2/3">
            <input type={type} className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 flex h-10 border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`} ref={ref} {...props} id={id}/>
            
            </div>
        </div>
    )
})
export default Input