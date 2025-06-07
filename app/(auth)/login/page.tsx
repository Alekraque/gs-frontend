"use client"
import { InputLogin } from "@/app/components/inputLogin/inputLogin";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { userData } from "@/app/interfaces/userData";
import Notification from "@/app/components/notification/notification";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [showNotification, setShowNotification] = useState<boolean>(false)
  const [notificationType, setNotificationType] = useState({
    type: '',
    title: '',
    description: ''
  })


  useEffect(() => {
    if(showNotification) {
      setTimeout(()=> { setShowNotification(false) }, 3000)
    }
  }, [showNotification])
  const router = useRouter();

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL_API

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (hasError) {
      setHasError(false);
      setErrorMessage("");
    }
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (hasError) {
      setHasError(false);
      setErrorMessage("");
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseURL}/login`, {
        email,
        senha: password,
      });

      const token = response.data.token;
      const userData = {
        name: response.data.userName,
        email: response.data.email,
      }

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(userData));
      router.push("/busque-abrigo");
    } catch (error) {
      setHasError(true);
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || "Erro ao fazer login.");
      } else {
        setErrorMessage("Erro ao fazer login.");
      }
    }
  }

  const handleLogin = () => {

    if(!email || !password) {
      setNotificationType({
        type: "danger",
        title: "Preencha todos os campos",
        description: "Algum campo nao foi preenchido corretamente, tente novamente"
    })
      setShowNotification(true)
      return
  }
        setNotificationType({
            type: 'success',
            title: "Cadastro realizado com sucesso!",
            description: 'Redirecionando para a pagina de login'
        })
            setTimeout(() => router.push("/busque-abrigo"), 2000)
            setShowNotification(true)
    }


  return (

    <div className="flex flex-col justify-center bg-white p-8 rounded-lg shadow-md w-full min-h-screen mx-auto">
      {showNotification &&
        <Notification 
          title= {notificationType.title}
          type={notificationType.type} 
          description={notificationType.description}
          onClose={() => setShowNotification(false)}/>
      }
      <h2 className="text-rose-800 text-5xl font-bold text-center mb-6">Entrar no Abrigo-Já</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <InputLogin
            htmlFor="email"
            placeholder="ex: seuemail@gmail.com"
            type="email"
            onChange={handleEmail}
            value={email}
          >
            Email
          </InputLogin>
        </div>
        <div>
          <InputLogin
            htmlFor="senha"
            placeholder="Digite sua senha"
            type="password"
            onChange={handlePassword}
            value={password}
          >
            Senha
          </InputLogin>
        </div>
        <div className="flex flex-col justify-center items-center">
          <button
          onClick={handleLogin}
            type="submit"
            className="bg-rose-700 text-white px-4 py-2 rounded hover:bg-rose-800 transition"
          >
            Entrar
          </button>

          {hasError && (
            <p className="text-center mt-4 text-red-600 font-bold">{errorMessage}</p>
          )}
        </div>
      </form>
    </div>
  );
}
