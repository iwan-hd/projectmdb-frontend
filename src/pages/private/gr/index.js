import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ViewGR from './view.js';
import  ListGR from './list.js';
import AddGR from './add.js';
import Typography from '@material-ui/core/Typography';

import Edit from './edit.js';

export default function Gr() {
return(

    <div style={{padding : 10}}>
    <Typography variant="h4" component="h4" align="center"> 
    <Switch>
           {/* Buat Title */}

           <Route path="/grlist/add" children="Add GR" />
           <Route path="/grlist/edit/:id" children="Halaman Edit GR" />
           
            <Route path="/grlist/view/:id" children="Halaman Detail GR" />
            <Route path="/grlist" children="Halaman List GR" />
          
    
        </Switch>
    </Typography>
    <br></br>

    <Switch>
       <Route path="/grlist/add" component={AddGR} />
       <Route path="/grlist/edit/:id" component={Edit} /> 
       
       <Route path="/grlist/view/:id" component={ViewGR} /> 
       <Route path="/grlist" component={ListGR} />
      
    </Switch>

       
</div>


)
}
