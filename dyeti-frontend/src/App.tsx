import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Themes from './pages/Themes.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/themes'} element={<Themes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
