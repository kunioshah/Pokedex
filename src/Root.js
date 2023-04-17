import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";
import App from './App';
import PokeDetails from './components/PokeDetails';

const Root = () => {
    return (
        <Router>
            <Routes>
                <Route 
                  path="/pokemon/"
                  element={<PokeDetails/>}
                />
                <Route 
                  path="/pokemon/:id"
                  element={<PokeDetails/>}
                />
                <Route 
                  path="/"
                  element={<App/>}
                />
            </Routes>
        </Router>
    )
} 

export default Root