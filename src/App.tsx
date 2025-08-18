import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Stats from './pages/Stats';
import Home from './pages/Home/Home';

export default function App() {
    return (
        <div className='wrapper'>
            <nav className='navbar'>
                <h1>Preis Checker</h1>
                <div className='link_wrapper'>
                    <Link to="/">Home</Link> | <Link to="/stats">Stats</Link>
                </div>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/stats" element={<Stats />} />
            </Routes>
        </div>
    );
}