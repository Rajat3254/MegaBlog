import React, { useId, useState, forwardRef } from 'react';

const Input = forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId();
    const [fileName, setFileName] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
        }
        if (props.onChange) {
            props.onChange(e);
        }
    };

    if (type === "file") {
        return (
            <div className="w-full">
                {label && <label className="inline-block mb-1 pl-1" htmlFor={id}>{label}</label>}
                <div className="relative w-full">
                    <input
                        id={id}
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        ref={ref}
                        {...props}
                        onChange={handleFileChange}
                    />
                    <div className="flex items-center px-3 py-2 rounded-lg bg-white border border-gray-200 w-full pointer-events-none">
                        <span className="flex-shrink-0 px-3 py-1 rounded bg-teal-600 text-white text-sm font-semibold">
                            Choose File
                        </span>
                        <span className="ml-3 text-gray-700 truncate min-w-0" title={fileName}>
                            {fileName || "No file selected"}
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='w-full'>
            {label && <label
                className='inline-block mb-1 pl-1'
                htmlFor={id}>
                {label}
            </label>
            }
            <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
});

export default Input;