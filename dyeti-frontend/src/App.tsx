import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout/AppLayout.tsx';
import {
  Home,
  Plans,
  Products,
  Themes,
  Login,
  Signup,
  PlanDetails,
  GeneratePlan,
  SetConstraint,
  ChooseMethod,
} from '@/pages';
import { PlanGenerationLayout, ProtectedRoute } from '@/components';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/plans" element={<Plans />} />
            <Route path="plans/:planId" element={<PlanDetails />} />
            <Route path="/products" element={<Products />} />
            <Route path="/themes" element={<Themes />} />
            <Route element={<PlanGenerationLayout />}>
              <Route path="/plans/generate" element={<GeneratePlan />} />
              <Route path="/plans/constraints" element={<SetConstraint />} />
              <Route path="/plans/method" element={<ChooseMethod />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
