import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './App.css';
import Formulario from './componentes/Formulario';

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={Formulario} />
        </Routes>
        <Routes>
          <Route path="/sorteio" element={Formulario} />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
