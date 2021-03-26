//1.Library dasar React
import React, {useState, useEffect} from 'react'
//import Axios from 'axios';
import GrService from '../../../config/api/gr.js'

import { useHistory } from "react-router-dom";  //kalo ada kurung kurawal {} itu suatu funtion

//2.import material-ui
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow'
import TableCell from "@material-ui/core/TableCell";
import TableContainer from '@material-ui/core/TableContainer';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import {useStyles} from './style.js';

//import Typography from '@material-ui/core/Typography';



export default function Gr() {

    const [gr, setGrs] = useState(useState([]));
    const history=useHistory();

     useEffect(() => {
        GrService.getAll().then( res => {
            const {datatabel, message, status} = res.data;
            if (message == 'success') {
                setGrs(datatabel.body)
            } else {
                alert(message);
            }
         })
         .catch(error=>{
            alert(error);
         })

         
        
     }, [])

     function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [day, month, year].join('/');
    }
    
    return (
        <div style={{padding : 0}}>
        {/* <Typography variant="h3" component="h4">
         Halaman Daftar GR
        </Typography>  */}
        {/* Typography (jsx) = h1 (html)  */}
   
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell>Periode</TableCell>
                        <TableCell>Nr GR</TableCell>
                        <TableCell>Tanggal</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                        {gr && gr.map((Gr, index) => {
                            //map seperti for looping
                            //partnumbers suatu array, ada isinya, sedangkan Partnumber = var 1 object
                            //index mulai dari 0,1,2,3...
                        return <TableRow hover key={index}>
                                 <TableCell>{index + 1}</TableCell>
                                 <TableCell>{Gr.id}</TableCell>
                                 <TableCell>{Gr.grPeriode}</TableCell>
                                 <TableCell>{Gr.grCode}</TableCell>
                                 <TableCell>{formatDate(Gr.tanggal)}</TableCell>
                                 <TableCell>
                                    <Tooltip title="View">
                                        <IconButton aria-label="View" size="small">
                                            <VisibilityIcon  fontSize="small"/>
                                        </IconButton>
                                    </Tooltip>
                                     
                                 </TableCell>
                               </TableRow>
                        })}
                </TableBody>
            </Table>
        </TableContainer>

      
    </div>

    )   
    // end returm
}

