import React from 'react';
import { Route,Switch,Redirect } from 'react-router-dom'
import AuthService from '../config/api/auth.js';

export default function PrivateRoad({component:Component,...restProps}) {

    const user = AuthService.getCurrentUser();
    return (
       <Route
       {...restProps}

       render={props => {
           return user ? 
           <Component {...props} />
           :
           <Redirect to={{
               pathname : "/login",
               state : {
                   from : props.location
               }
           }} />
       }}
       />
    )
}
