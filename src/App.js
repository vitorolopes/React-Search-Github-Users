import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';


function App() {
  return (
    <Router>

      <Routes>

        <Route exact path='/' element={ <Dashboard/> }/>

        <Route path='/login' element={ <Login/> }/>
        
        <Route path='*' element={ <Error/> }/>

      </Routes>

    </Router>
  );
}

export default App;
