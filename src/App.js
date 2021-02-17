import React from 'react';
import { Route, Switch } from 'react-router-dom';

//import komponene
import NotFound from './pages/404';
import Login from './pages/login';
import LupaPassword from './pages/private/lupa-password';
import Private from './pages/private';

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
          <Route path="/" component={Private} exact />
          <Route path="/users" component={Private} />
          <Route path="/partnumbers" component={Private} />
          <Route path="/grlist" component={Private} /> 
          <Route path="/lupa-pasword" component={Private} />
          
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>  
        </ThemeProvider>
    </div>
  
   
  );
}

export default App;
