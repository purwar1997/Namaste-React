import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import AppLayout from './components/AppLayout';
import Home from './components/Home';
import Search from './components/Search';
import Error from './components/Error';
import NotFound from './components/NotFound';
import Restaurant from './components/Restaurant';

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<AppLayout />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path='restaurants/:restaurantId' element={<Restaurant />} />
      <Route path='search' element={<Search />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);
