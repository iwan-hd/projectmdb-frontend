import React from 'react';
import { Route, Switch } from 'react-router-dom';

//import komponen
import NotFound from './pages/404';
import Login from './pages/login';
import LupaPassword from './pages/private/lupa-password';
import Private from './pages/private';
import PrivateRoad from "./components/PrivateRoad";

// import material-ui
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core';
import theme from './config/theme/theme';

function App() {
  return (
   
    <div>
      <CssBaseline/>
        <ThemeProvider theme={theme}>
        <Switch>
          <PrivateRoad path="/" component={Private} exact />
          <PrivateRoad path="/users" component={Private} />
          <PrivateRoad path="/partnumbers" component={Private} />
     
          <PrivateRoad path="/grlist" component={Private} /> 
          <PrivateRoad path="/lupa-pasword" component={Private} />
          
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>  
        </ThemeProvider>
    </div>
  
   
  );
}

export default App;
