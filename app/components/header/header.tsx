import Image from "next/image"
import Link from "next/link"

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
                    <Link href="/#como-funciona" className="ml-4 hover:underline text-rose-800 hover:font-bold duration-200">Como Funciona</Link>
                    <Link href="/#sobre" className="ml-4 hover:underline text-rose-800 hover:font-bold duration-200">Sobre</Link>
                    <Link href="/#contato" className="ml-4 hover:underline text-rose-800 hover:font-bold duration-200">Contato</Link>
                </nav>
            </div>
        </header>
    )
}
