const CustomButton = ({ label, onClick, icon }: any) => {
    return (
        <button
            className="flex border border-zinc-50 py-1 px-4 rounded-md font-semibold cursor-pointer hover:bg-gray-400"
            onClick={onClick}
        >
            {icon && icon}
            {label}
        </button>
    )
}

export default CustomButton;