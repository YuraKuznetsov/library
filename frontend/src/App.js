import './App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from "./components/Header";
import AuthProvider from "./components/AuthProvider";
import AppRouter from "./router/AppRouter";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Header />
                <main>
                    <AppRouter />
                </main>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
