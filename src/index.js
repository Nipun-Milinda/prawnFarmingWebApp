import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Nh3 from "./pages/Nh3";
import WaterInputOutputSystem from "./pages/waterInputOutputSystem";
import Ph from "./pages/Ph";
import ReportAnalize from "./pages/ReportAnalize";
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="nh3" element={<Nh3 />} />
          <Route path="ph" element={<Ph />} />
          <Route path="waterSystem" element={<WaterInputOutputSystem />} />
          <Route path="report" element={<ReportAnalize />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);




