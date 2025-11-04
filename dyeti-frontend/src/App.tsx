import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout/AppLayout.tsx';
import {
  Home,
  Plans,
  Products,
  Themes,
  Login,
  Signup,
  GeneratePlan,
  SetConstraint,
  ChooseMethod,
} from './pages/index.ts';
import { PlanGenerationProvider } from './components/providers/PlanGenerationProvider/PlanGenerationProvider.tsx';
function PlanGenScope() {
  return (
    <PlanGenerationProvider>
      <Outlet />
    </PlanGenerationProvider>
  );
}
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
          <Route element={<PlanGenScope />}>
            <Route path="/plans/generate" element={<GeneratePlan />} />
            <Route path="/plans/constraints" element={<SetConstraint />} />
            <Route path="/plans/method" element={<ChooseMethod />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
