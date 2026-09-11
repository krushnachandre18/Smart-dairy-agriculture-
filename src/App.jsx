import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/farmer/Dashboard";
import Cows from "./pages/farmer/cows";
import MilkCollection from "./pages/farmer/milkcollection";
import Payments from "./pages/farmer/payments";
import Feed from "./pages/farmer/Feed";
import Financial from "./pages/farmer/Financial";
import Reports from "./pages/farmer/Reports";
import AIForecast from "./pages/farmer/AIForecast";
import AIExpenseAnalysis from "./pages/farmer/AIExpenseAnalysis";
import AIProfitAnalysis from "./pages/farmer/AIProfitAnalysis";
import AIAnomalyAlert from "./pages/farmer/AIAnomalyAlert";

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
          path="/farmer/milkcollection"
          element={<MilkCollection />}
        />

        <Route
          path="/farmer/payments"
          element={<Payments />}
        />

        <Route
          path="/farmer/Feed"
          element={<Feed />}
        />
        <Route
  path="/farmer/financial"
  element={<Financial />}
/>
<Route
  path="/farmer/reports"
  element={<Reports />}
/>
<Route
  path="/farmer/ai-forecast"
  element={<AIForecast />}
/>
<Route
  path="/farmer/ai-expense-analysis"
  element={<AIExpenseAnalysis />}
/>
<Route
  path="/farmer/ai-profit-analysis"
  element={<AIProfitAnalysis />}
/>
<Route
  path="/farmer/ai-anomaly-alert"
  element={<AIAnomalyAlert />}
/>
      </Routes>
    </BrowserRouter>
  );
}


export default App;