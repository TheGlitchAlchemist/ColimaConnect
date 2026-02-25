import { useEffect, useState } from 'react';
import api from './services/api';

interface Negocio {
  id: number;
  name: string;
  category: string;
  address: string;
  city: string;
}

function App() {
  const [negocios, setNegocios] = useState<Negocio[]>([]);

  useEffect(() => {
    // Traemos los datos de la base de datos
    api.get('/negocios')
      .then(res => setNegocios(res.data))
      .catch(err => console.error("Error al conectar con ColimaConnect:", err));
  }, []);

  return (
    <div className="min-h-screen bg-colima-bg p-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-black text-colima-dark">
          Colima<span className="text-colima-blue">Connect</span>
        </h1>
        <p className="text-slate-500">Explora los mejores servicios locales</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {negocios.map((n) => (
          <div key={n.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <span className="text-xs font-bold uppercase tracking-wider text-colima-blue bg-blue-50 px-3 py-1 rounded-full">
              {n.category}
            </span>
            <h2 className="text-2xl font-bold text-colima-dark mt-3">{n.name}</h2>
            <p className="text-slate-600 mt-1">{n.address}</p>
            <p className="text-slate-400 text-sm italic">{n.city}, Colima</p>
            
            <button className="w-full mt-6 bg-colima-dark text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">
              Agendar Cita
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;