import React, { useMemo } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { motion } from "framer-motion";
import './App.css'
import Stats from './pages/Stats';
import Home from './pages/Home/Home';
import Navbar from './components/navbar';
import Background from './components/background';

export default function App() {
    
    return (
        <div className='wrapper'>
            
            <Background
                header={<Navbar />}
                center={
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/stats" element={<Stats />} />
                    </Routes>
                }
                // footer={<p>test</p>}
            />
        </div>
    );
}
