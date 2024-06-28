import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../controller/private_route';
import dashboard from '../pages/dashboard';
import product from '../pages/product';
import order from '../pages/order';
import Login from '../pages/login';
import LogOut from '../pages/log_out';

const routes = () => (
    <Routes>
        <Route>
            <Route path='/login' Component={Login} />
            <Route element= {<PrivateRoute />}>
                <Route path='/' Component={dashboard} />
                <Route path='/product' Component={product} />
                <Route path='/order' Component={order} />
                <Route path='/logout' Component={LogOut} />
            </Route>
        </Route>
    </Routes>
);

export default routes;