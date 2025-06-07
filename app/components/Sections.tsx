'use client'
import { useRouter } from "next/navigation"

export const HeroSection = () => {
  const router = useRouter()

  const handleLoginPage = () => {
    router.push('/login')
  }
  
    return (
        <section className="bg-white py-16 px-6 text-center">
            <div className="max-w-2xl mx-auto">
            <h2 className="text-rose-800 text-3xl md:text-4xl font-bold mb-4">
                PROCURE O ABRIGO MAIS PRÓXIMO DA SUA LOCALIZAÇÃO
            </h2>
            <p className="text-rose-600 text-lg mb-6">
                Encontre segurança rapidamente com o <strong>Abrigo-Já</strong>.
                Localize abrigos emergenciais em tempo real, direto do seu celular.
            </p>
            <button onClick={handleLoginPage} className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition cursor-pointer">
                Encontrar Abrigo Agora
            </button>
            </div>
        </section>
    )
}


export const FunctionalSection = () => {
    return (
      <section id="como-funciona" className="bg-gray-100 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-rose-800 text-2xl font-semibold mb-8">Como Funciona</h3>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-gray-400 shadow-md rounded-lg p-6">
              <h4 className="font-bold text-lg mb-2">1. Diga-nos onde você está!</h4>
              <p>Com sua permissão, localizamos você automaticamente.</p>
            </div>
            <div className="bg-gray-400 shadow-md rounded-lg p-6">
              <h4 className="font-bold text-lg mb-2">2. Mostramos Abrigos Próximos</h4>
              <p>Receba uma lista com os abrigos mais próximos e seguros.</p>
            </div>
            <div className="bg-gray-400 shadow-md rounded-lg p-6">
              <h4 className="font-bold text-lg mb-2">3. Navegue com Facilidade</h4>
              <p>Obtenha rotas rápidas pelo seu app de navegação favorito.</p>
            </div>
          </div>
        </div>
      </section>
    )
}

export const AboutSection = () => {
  return (
      <section id="sobre" className="bg-white py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-rose-800 text-2xl font-semibold mb-4">Sobre o Projeto</h3>d
          <p className="text-black ">
            O <strong>Abrigo-Já</strong> é uma iniciativa de segurança comunitária
            que visa conectar pessoas a abrigos emergenciais em situações de risco,
            como enchentes, incêndios ou desastres naturais.
          </p>
        </div>
      </section>
  )
}

export const ContactSection = () => {
  return (
      <section id="contato" className="bg-gray-100 py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-rose-800 text-2xl font-semibold mb-4">Entre em Contato Conosco</h3>
          <p className="text-red-700">Tem sugestões ou quer apoiar? Fale conosco pelo e-mail:</p>
          <p className="mt-2 font-medium text-red-600">contato@abrigoja.com.br</p>
        </div>
      </section>
  )
}