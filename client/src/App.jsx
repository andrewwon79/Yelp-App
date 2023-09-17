import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { Home } from './routes/Home';
import { UpdatePage } from './routes/UpdatePage';
import { RestaurantdetailPage } from './routes/RestaurantdetailPage';
import { RestaurantsContextProvider } from './context/RestaurantContexts';
//for new React, Switch replaced by Routes
//component replaced by element
//<Route exact path="/" component={Home}/> is OLD
//<Route exact path="/" element={Home}/> is NEW
const App = () => {
    return (
        <RestaurantsContextProvider>
            <div className='container'>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route exact path="/restaurants/:id/update" element={<UpdatePage/>}/>
                        <Route exact path="/restaurants/:id" element={<RestaurantdetailPage/>}/>
                    </Routes>
                </Router>
            </div>;
        </RestaurantsContextProvider>
    );
};

export default App;