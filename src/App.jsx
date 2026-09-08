import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/farmer/Dashboard";
import Cows from "./pages/farmer/Cows";
import MilkCollection from "./pages/farmer/MilkCollection";
import Payments from "./pages/farmer/Payments";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/farmer/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/farmer/cows"
          element={<Cows />}
        />

        <Route
          path="/farmer/milk"
          element={<MilkCollection />}
        />

        <Route
          path="/farmer/payments"
          element={<Payments />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
