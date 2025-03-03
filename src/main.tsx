import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import Reclamation from './components/Reclaimation.tsx'; // Import the Reclamation component
import './index.css';
import Reduceable from './components/Reduceable.tsx';
import Drive from './components/Drive.tsx';
import Encloser from './components/Encloser.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/reclaimation" element={<Reclamation />} />
        <Route path="/reduceable" element={<Reduceable />} />
        <Route path="/drive" element={<Drive />} />
        <Route path="/encloser" element={<Encloser />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
);
