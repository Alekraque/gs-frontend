
# 🛟 Busque Abrigo – Frontend

Aplicação web desenvolvida com **Next.js + TypeScript** que permite ao usuário buscar abrigos emergenciais próximos ao seu CEP, exibindo a localização no mapa e listando sugestões de abrigos.

---

## ⚠️ Ativação da API

A API está hospedada gratuitamente na plataforma **Render**, e por isso pode ficar inativa após um período de inatividade.  
**Antes de usar o site, acesse o link abaixo para "acordar" a API**:

👉 [https://api-java-1gus.onrender.com](https://api-java-1gus.onrender.com)

Espere alguns segundos até que ela seja reativada. Após isso, você poderá usar normalmente o sistema de login e a busca de abrigos.

---

## ⚠️ Aviso importante sobre geolocalização

A geolocalização é feita usando a API pública **Nominatim (OpenStreetMap)**, que **não é uma API nativa brasileira**. Por isso, **pode não encontrar alguns CEPs válidos**.

Caso isso ocorra, digite outro CEP ou utilize um dos seguintes exemplos que funcionam corretamente:

- `06756260`
- `07091000`
- `16520970`
- `11250970`

---

## 🔐 Login

O sistema possui um **login pré-configurado** para testes:

- **Email:** admin@fiap.com
- **Senha:** 1234

Após realizar o login, o usuário pode buscar abrigos por CEP normalmente.

---

## 🚀 Funcionalidades

- Busca de endereço a partir do CEP (ViaCEP).
- Geolocalização do endereço via OpenStreetMap (Nominatim).
- Integração com API Java para listar abrigos disponíveis.
- Exibição de localização no mapa (Leaflet.js).
- Sugestão de 3 abrigos aleatórios próximos à região informada.

---

## 🧪 Tecnologias utilizadas

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Leaflet](https://leafletjs.com/) (via `react-leaflet`)
- [Axios](https://axios-http.com/)
- [ViaCEP API](https://viacep.com.br/)
- [Nominatim API (OpenStreetMap)](https://nominatim.org/)
- Backend: API REST em Java/Quarkus (repositório separado)

---

## 📦 Instalação e uso local

```bash
# 1. Clone o repositório
git clone [https://github.com/seu-usuario/busque-abrigo-frontend.git](https://github.com/Alekraque/gs-frontend)
cd abrigo-ja

# 2. Instale as dependências
npm install

# 3. Configure a variável de ambiente
touch .env.local
```

No arquivo `.env.local`:

```
NEXT_PUBLIC_BASE_URL_API=https://api-java-1gus.onrender.com
```

> Substitua pelo endpoint real da sua API Java, se estiver usando outro serviço (ex: localhost ou Vercel).

```bash
# 4. Rode o projeto localmente
npm run dev

LINK PLDA VERCEL: https://abrigo-ja-nine.vercel.app
```

---

## 🗺️ Como funciona

1. O usuário insere um CEP (somente números).
2. O app consulta o ViaCEP para obter o endereço.
3. O endereço é convertido em coordenadas usando Nominatim (OpenStreetMap).
4. O mapa centraliza nessa posição.
5. A API de abrigos (`/abrigos`) é chamada e retorna uma lista. 3 são embaralhados e exibidos.

---

## 🧩 Estrutura de pastas

```
/components
  └── mapview/      → Componente do mapa (MapView)

/app
  └── busque-abrigos → Página principal com formulário e mapa

/public             → Assets estáticos
```

---

## 🔒 CORS e segurança

A API está com CORS habilitado para:

```
http://localhost:3000
https://abrigo-ja-nine.vercel.app

```

Isso está configurado no backend Quarkus via `application.properties`.

---

## 👨‍💻 Desenvolvido por

Alex Ribeiro Maia – RM557356
Felipe Olecsiuc Damasceno - RM559433
Natália de Oliveira Santos - RM560306

