interface ButtonProps {
    children: React.ReactNode
    onClick: () => void
}

export const Button = ({ children, onClick }:ButtonProps) => {
    return (
        <button
            type="button"
            className="w-1/3 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-semibold"
            onClick={onClick}
            >
            {children}
        </button>
    )
}