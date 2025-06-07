import Image from "next/image"

export const Header = () => {
    return (
        <header className="bg-white text-white py-2 px-4 shadow-md">
            <div className="max-w-9xl mx-auto flex justify-between items-center">
                <Image
                    alt="logo"
                    src="/logo.png"
                    width={100}
                    height={0}
                />
                <nav>
                    <a href="/#como-funciona" className="ml-4 hover:underline text-rose-800 hover:font-bold duration-200">Como Funciona</a>
                    <a href="/#sobre" className="ml-4 hover:underline text-rose-800 hover:font-bold duration-200">Sobre</a>
                    <a href="/#contato" className="ml-4 hover:underline text-rose-800 hover:font-bold duration-200">Contato</a>
                </nav>
            </div>
        </header>
    )
}
