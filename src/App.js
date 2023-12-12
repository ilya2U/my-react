import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import Navbar from './components/UI/Navbar/Navbar';
import { AppRouter } from './components/AppRouter';
import { AuthContext } from './components/context';

function App() {
  return (
    <AuthContext.Provider>
      <BrowserRouter>
          <Navbar/>
          <AppRouter/>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;