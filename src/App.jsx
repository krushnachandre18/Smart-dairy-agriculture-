import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login";
import Dashboard from "./pages/farmer/Dashboard";
import Cows from "./pages/farmer/cows";

import Payments from "./pages/dairy/payments";
import Feed from "./pages/farmer/Feed";
import Financial from "./pages/farmer/Financial";

import AIChatbot from "./pages/farmer/AIChatbot";
import DairyDashboard from "./pages/dairy/DairyDashboard";
import Farmers from "./pages/dairy/Farmers";
import MilkVerification from "./pages/dairy/MilkVerification";
import CenterSettings from "./pages/dairy/CenterSettings";
import Register from "./pages/Register";
import DailyReports from "./pages/dairy/DailyReports";
import MilkCollection from "./pages/dairy/milkcollection";
import FarmerMilkCollection from "./pages/farmer/ViewMilkCollection";
import Profile from "./pages/farmer/Profile";

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
          path="/dairy/milkcollection"
          element={<MilkCollection />}
        />

        <Route
          path="/dairy/payments"
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
  path="/dairy/DailyReports"
  element={<DailyReports />}
/>

<Route
  path="/farmer/ai-chatbot"
  element={<AIChatbot />}
/>
<Route
  path="/dairy/dashboard"
  element={<DairyDashboard />}
/>
<Route path="/dairy/Farmers" element={<Farmers />} />
<Route
  path="/dairy/milk-verification"
  element={<MilkVerification />}
/>
<Route
  path="/dairy/center-settings"
  element={<CenterSettings />}
/>
<Route path="/register" element={<Register />} />
<Route
  path="/farmer/ViewMilkCollection"
  element={<FarmerMilkCollection />}
/>
<Route
  path="/farmer/profile"
  element={<Profile />}
/>
      </Routes>
    </BrowserRouter>
  );
}


export default App;