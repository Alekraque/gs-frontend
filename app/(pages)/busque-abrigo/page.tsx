// 'use client';

// import { useState } from 'react';
// import axios from 'axios';
// import dynamic from 'next/dynamic';

// type Shelter = {
//   titulo: string;
//   descricao: string;
//   latitude: number;
//   longitude: number;
// };

// const MapView = dynamic(() => import('../../components/mapview/mapView'), { ssr: false });

// export default function BusqueAbrigo() {
//   const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_API || 'https://api-java-1gus.onrender.com'

//   const [cep, setCep] = useState('');
//   const [abrigos, setAbrigos] = useState<Shelter[]>([]);
//   const [location, setLocation] = useState<[number, number] | null>([-23.55052, -46.63331]);

//   const handleSearch = async () => {
//     if (!cep.match(/^\d{8}$/)) {
//       alert('Digite um CEP válido com 8 números.');
//       return;
//     }

//     try {
//       const viaCepRes = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
//       const viaCepData = await viaCepRes.json();

//       if (viaCepData.erro) {
//         alert('CEP não encontrado.');
//         return;
//       }

//       const { logradouro, localidade, uf } = viaCepData;
//       if (!logradouro) {
//         alert('Endereço sem logradouro, tente outro CEP.');
//         return;
//       }

//       const endereco = `${logradouro}, ${localidade}, ${uf}`;
//       const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`);
//       const geoData = await geoRes.json();

//       if (geoData.length === 0) {
//         alert('Não foi possível localizar o endereço no mapa.');
//         return;
//       }

//       const { lat, lon } = geoData[0];
//       setLocation([parseFloat(lat), parseFloat(lon)]);

//       // Busca todos os abrigos
//       const abrigosRes = await axios.get(`${BASE_URL}/abrigos`);
//       const embaralhados = [...abrigosRes.data].sort(() => 0.5 - Math.random());
//       setAbrigos(embaralhados.slice(0, 3));
//     } catch (error) {
//       console.error('Erro ao buscar dados:', error);
//       alert('Erro ao buscar dados. Tente novamente.');
//     }
//   };

//   return (
//     <main className="flex flex-col items-center gap-6 p-6 bg-white min-h-screen">
//       <h1 className="text-2xl font-bold text-rose-800">Encontre Abrigos</h1>
//       <div className="flex gap-2">
//         <input
//           type="text"
//           placeholder="Digite seu CEP"
//           value={cep}
//           onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))}
//           className="p-2 rounded text-black border"
//         />
//         <button onClick={handleSearch} className="bg-red-600 text-white px-4 py-2 rounded">
//           Buscar
//         </button>
//       </div>

//       {location && (
//         <div className="w-full max-w-2xl h-96">
//           <MapView position={{ lat: location[0], lng: location[1] }} abrigos={[]} />
//         </div>
//       )}

//       {abrigos.length > 0 && (
//         <div className="w-full max-w-md mt-24">
//           <h2 className="text-xl font-semibold text-center text-gray-800 my-4">Abrigos sugeridos próximos ao CEP que voce inseriu </h2> 
//           <ul className="space-y-4">
//             {abrigos.map((abrigo, index) => (
//               <li key={index} className="p-4 bg-rose-100 border border-rose-300 rounded shadow">
//                 <h3 className="font-bold text-rose-800">{abrigo.titulo}</h3>
//                 <p className="text-gray-700">{abrigo.descricao}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </main>
//   );
// }

'use client';

import { useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';

type Shelter = {
  titulo: string;
  descricao: string;
  latitude: number;
  longitude: number;
};

const MapView = dynamic(() => import('../../components/mapview/mapView'), { ssr: false });

export default function BusqueAbrigo() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_API || 'https://api-java-1gus.onrender.com';

  const [cep, setCep] = useState('');
  const [abrigos, setAbrigos] = useState<Shelter[]>([]);
  const [location, setLocation] = useState<[number, number] | null>([-23.55052, -46.63331]);

  const handleSearch = async () => {
    if (!cep.match(/^\d{8}$/)) {
      alert('Digite um CEP válido com 8 números.');
      return;
    }

    try {
      console.log('Buscando dados do CEP:', cep);
      const viaCepRes = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const viaCepData = await viaCepRes.json();
      console.log('Resposta ViaCEP:', viaCepData);

      if (viaCepData.erro) {
        alert('CEP não encontrado.');
        return;
      }

      const { logradouro, localidade, uf } = viaCepData;
      if (!logradouro) {
        alert('Endereço sem logradouro, tente outro CEP.');
        return;
      }

      const endereco = `${logradouro}, ${localidade}, ${uf}`;
      console.log('Endereço para geolocalização:', endereco);
      const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`);
      const geoData = await geoRes.json();
      console.log('Resposta do Nominatim:', geoData);

      if (geoData.length === 0) {
        alert('Não foi possível localizar o endereço no mapa.');
        return;
      }

      const { lat, lon } = geoData[0];
      setLocation([parseFloat(lat), parseFloat(lon)]);
      console.log('Localização definida:', [parseFloat(lat), parseFloat(lon)]);

      const abrigosRes = await axios.get(`${BASE_URL}/abrigos`);
      console.log('Resposta da API de abrigos:', abrigosRes.data);

      const embaralhados = [...abrigosRes.data].sort(() => 0.5 - Math.random());
      const selecionados = embaralhados.slice(0, 3);
      console.log('Abrigos embaralhados e selecionados:', selecionados);
      setAbrigos(selecionados);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      alert('Erro ao buscar dados. Tente novamente.');
    }
  };

  return (
    <main className="flex flex-col items-center gap-6 p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-rose-800">Encontre Abrigos</h1>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Digite seu CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))}
          className="p-2 rounded text-black border"
        />
        <button onClick={handleSearch} className="bg-red-600 text-white px-4 py-2 rounded">
          Buscar
        </button>
      </div>

      {location && (
        <div className="w-full max-w-2xl h-96">
          <MapView position={{ lat: location[0], lng: location[1] }} abrigos={[]} />
        </div>
      )}

      {abrigos.length > 0 && (
        <div className="w-full max-w-md mt-24">
          <h2 className="text-xl font-semibold text-center text-gray-800 my-4">
            Abrigos sugeridos próximos ao CEP que voce inseriu
          </h2> 
          <ul className="space-y-4">
            {abrigos.map((abrigo, index) => (
              <li key={index} className="p-4 bg-rose-100 border border-rose-300 rounded shadow">
                <h3 className="font-bold text-rose-800">{abrigo.titulo}</h3>
                <p className="text-gray-700">{abrigo.descricao}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
