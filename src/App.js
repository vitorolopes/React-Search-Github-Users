import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';


function App() {
  return (

    <AuthWrapper>
      
      <Router>

        <Routes>

            <Route exact path='/' element={ 
                                    <PrivateRoute>
                                      <Dashboard/>
                                    </PrivateRoute> 
                                  }
            />
        
          <Route path='/login' element={ <Login/> }/>
          
          <Route path='*' element={ <Error/> }/>

        </Routes>

      </Router>

    </AuthWrapper>
  );
}

export default App;
