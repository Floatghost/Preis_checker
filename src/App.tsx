import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Stats from './pages/Stats';
import Home from './pages/Home/Home';
import Navbar from './components/navbar';

export default function App() {
    return (
        <div className='wrapper'>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/stats" element={<Stats />} />
            </Routes>
        </div>
    );
}