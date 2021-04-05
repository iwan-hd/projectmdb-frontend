import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ViewPN from './view.js';
import  ListPN from './list.js'

export default function PartNumber() {
    return (

        <Switch>
           <Route path="/partnumbers/view/:id" component={ViewPN} /> 
           <Route path="/partnumbers" component={ListPN} />
          
        </Switch>
    )
}
