// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';     // ✅ correct import
import Home from './pages/Home';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">        {/* pt-20 offsets fixed navbar height */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add other routes here if needed */}
        </Routes>
      </main>
      <Footer />                              {/* ✅ Footer component – stays at bottom */}
    </div>
  );
}

export default App;