import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ViewUser from './view.js';
import EditUser from './edit.js'
import ListUser from './list.js';
import AddUser from './add.js';
import Typography from '@material-ui/core/Typography';


export default function Users() {
    return (

        <div style={{padding : 10}}>
        <Typography variant="h4" component="h4" align="center"> 
        <Switch>
               {/* Buat Title */}

                <Route path="/users/add" children="Add User" />
                <Route path="/users/view/:id" children="Halaman Detail Users" />
                <Route path="/users/edit/:id" children="Edit USER" />
                <Route path="/users" children="Halaman Daftar USER" />
                
              
            </Switch>
        </Typography>
        <br></br>

        <Switch>
           <Route path="/users/add" component={AddUser} /> 
           <Route path="/users/view/:id" component={ViewUser} /> 
           <Route path="/users/edit/:id" component={EditUser} />
           <Route path="/users" component={ListUser} />
          
        </Switch>

           
    </div>
    )
}
