import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout/AppLayout.tsx';
import { Home, Plans, Products, Themes, Login, Signup, Account } from './pages/index.ts';
import GeneratePlan from './pages/GeneratePlan/GeneratePlan.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/products" element={<Products />} />
          <Route path="/themes" element={<Themes />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/account" element={<Account />} />
          <Route path="/plans/generate" element={<GeneratePlan />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
