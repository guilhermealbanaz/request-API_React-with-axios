import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import Adm from './paginas/Administracao/Restaurante/AdministracaoRestaurantes';
import FormularioRestaurante from './paginas/Administracao/Restaurante/FormularioRestaurante';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin/restaurantes" element={<Adm />} />
      <Route path="/admin/restaurantes/novo" element={<FormularioRestaurante/>} />
    </Routes>
  );
}

export default App;
