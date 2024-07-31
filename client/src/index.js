import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Client from './pages/Client';
import Manager from './pages/Manager';
import './assets/styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Client />} />
                <Route path="/manager" element={<Manager />} />
            </Routes>
        </Router>
    </React.StrictMode>
);