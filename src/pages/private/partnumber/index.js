import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ViewPN from './view.js';
import  ListPN from './list.js';
import AddPn from './add.js';
import Typography from '@material-ui/core/Typography';
import Edit from "./edit.js";

export default function PartNumber() {
    return (

        <div style={{padding : 10}}>
        <Typography variant="h4" component="h4" align="center"> 
        <Switch>
               {/* Buat Title */}

               <Route path="/partnumbers/add" children="Add PartNumber" />

                <Route path="/partnumbers/view/:id" children="Halaman Detail PartNumber" />
                <Route path="/partnumbers/edit/:id" children="Edit PartNumber" />
                <Route path="/partnumbers" children="Halaman Daftar PartNumber" />
                
            </Switch>
        </Typography>
        <br></br>


       
       
        <Switch>
           <Route path="/partnumbers/add" component={AddPn} />
           <Route path="/partnumbers/view/:id" component={ViewPN} /> 
           <Route path="/partnumbers/edit/:id" component={Edit} />
           <Route path="/partnumbers" component={ListPN} />
          
        </Switch>

           
    </div>
    )
}
