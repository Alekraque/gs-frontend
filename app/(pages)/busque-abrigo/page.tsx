// 'use client';

// import { useState } from 'react';
// import dynamic from 'next/dynamic';
// import axios from 'axios';

// const MapView = dynamic(() => import('../../components/mapView'), { ssr: false });

// type Shelter = {
//   titulo: string;
//   descricao: string;
//   latitude: number;
//   longitude: number;
// };

// export default function BusqueAbrigo() {
//   const BASE_URL = 'http://localhost:8080'
//   const [cep, setCep] = useState('')
//   const [position, setPosition] = useState<{ lat: number; lng: number }>({
//     lat: -23.55052,
//     lng: -46.63331,
//   });

//   const [abrigos, setAbrigos] = useState<Shelter[]>([]);

//   const handleSearch = async () => {
//     if (!cep.match(/^\d{8}$/)) {
//       alert('Digite um CEP válido com 8 números.');
//       return;
//     }

//     try {
//       // Etapa 1: buscar endereço via ViaCEP
//       const viaCepRes = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
//       const viaCepData = await viaCepRes.json();

//       if (viaCepData.erro) {
//         alert('CEP não encontrado na base do ViaCEP.');
//         return;
//       }

//       const { logradouro, localidade, uf } = viaCepData;
//       if (!logradouro) {
//         alert('Endereço sem logradouro definido, tente outro CEP.');
//         return;
//       }

//       const fullAddress = `${logradouro}, ${localidade}, ${uf}`;

//       // Etapa 2: buscar coordenadas via Nominatim
//       const nominatimRes = await fetch(
//         `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}`
//       );
//       const nominatimData = await nominatimRes.json();

//       if (!nominatimData || nominatimData.length === 0) {
//         alert(`Não foi possível localizar o CEP ${cep} no mapa.`);
//         return;
//       }

//       const { lat, lon } = nominatimData[0];
//       const latitude = parseFloat(lat);
//       const longitude = parseFloat(lon);
//       setPosition({ lat: latitude, lng: longitude });

//       // Etapa 3: buscar abrigos no backend
//       const abrigosRes = await axios.get(`${BASE_URL}/abrigos`);
//       if (!abrigosRes) {
//         alert('Erro ao buscar abrigos próximos.');
//         return
//       }
//       const abrigosData = await abrigosRes.data;
//       setAbrigos(abrigosData);
//       console.log('Abrigos encontrados:', abrigosData);

//     } catch (error) {
//       console.error('Erro ao buscar localização ou abrigos:', error);
//       alert('Erro ao buscar localização ou abrigos. Tente novamente.');
//     }
//   };

//   return (
    
//     <main className="flex flex-col items-center justify-center gap-4 p-6 bg-white min-h-screen">
//       <h1 className="text-2xl font-bold text-rose-800">Encontre Abrigos Próximos</h1>
//       <div className="flex gap-2 bg-white">
//         <input
//           type="text"
//           placeholder="Digite seu CEP (ex: 01001000)"
//           value={cep}
//           onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))}
//           className="p-2 rounded text-black"
//         />
//         <button onClick={handleSearch} className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer">
//           Localizar
//         </button>
//       </div>
//       <MapView position={position} abrigos={abrigos} />
//       {abrigos.length > 0 && (
//         <div className="w-full max-w-md mt-6">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Abrigos mais próximos:</h2>
//             <ul className="space-y-4">
//             {abrigos.map((abrigo, index) => (
//                 <li key={index} className="p-4 bg-rose-100 border border-rose-300 rounded shadow">
//                 <h3 className="font-bold text-rose-800">{abrigo.titulo}</h3>
//                 <p className="text-gray-700">{abrigo.descricao}</p>
//                 <p>{abrigo.latitude}, {abrigo.longitude}</p>
//                 </li>
//             ))}
//             </ul>
            
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

// Importação dinâmica para evitar SSR do Leaflet
const MapView = dynamic(() => import('../../components/mapView'), { ssr: false });

export default function BusqueAbrigo() {
  const BASE_URL = 'http://localhost:8080';

  const [cep, setCep] = useState('');
  const [abrigos, setAbrigos] = useState<Shelter[]>([]);
  const [location, setLocation] = useState<[number, number] | null>([-23.55052, -46.63331]);

  const handleSearch = async () => {
    if (!cep.match(/^\d{8}$/)) {
      alert('Digite um CEP válido com 8 números.');
      return;
    }

    try {
      const viaCepRes = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const viaCepData = await viaCepRes.json();

      if (viaCepData.erro) {
        alert('CEP não encontrado.');
        return;
      }

      const { logradouro, localidade, uf } = viaCepData;
      if (!logradouro) {
        alert('Endereço sem logradouro, tente outro CEP.');
        return;
      }

      // Usa nominatim para buscar coordenadas do CEP
      const endereco = `${logradouro}, ${localidade}, ${uf}`;
      const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endereco)}`);
      const geoData = await geoRes.json();

      if (geoData.length === 0) {
        alert('Não foi possível localizar o endereço no mapa.');
        return;
      }

      const { lat, lon } = geoData[0];
      setLocation([parseFloat(lat), parseFloat(lon)]);

      // Busca todos os abrigos
      const abrigosRes = await axios.get(`${BASE_URL}/abrigos`);
      const embaralhados = [...abrigosRes.data].sort(() => 0.5 - Math.random());
      setAbrigos(embaralhados.slice(0, 3));
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
          <h2 className="text-xl font-semibold text-center text-gray-800 my-4">Abrigos sugeridos próximos ao CEP que voce inseriu </h2> 
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

