import React, {useState, useEffect} from 'react'

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from "@material-ui/core/TableCell";
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import PartNumberService from '../../../config/api/gr.js';
import {useStyles} from './style.js';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Button  from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import AddIcon from '@material-ui/icons/Add';
import Add from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';


export default function ViewGR({match}) {
    
    console.log(match.params.id);
    const [gr, setGR] = useState({});
    const ID = match.params.id;
    const classes = useStyles();
  
    
    

    const [amountRow,setAmountRow] =  useState(0);

    useEffect(() => {
        PartNumberService.getId(ID).then(res=>{
            // ambil dari postman
            const {datatabel, message, status} = res.data;
            if (message == 'success') {
                setGR(datatabel.body)
            } else {
                alert(message);
            }
        })
        .catch(error => {
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
        <div>
       

        <Grid container alignItems="center" justify="center">
            {/* <Grid item xs={12} sm={6}>
                    
            </Grid> */}
         <TableContainer component={Paper}>
             <Table>
                <TableRow>
                        <TableCell>No GR</TableCell>
                        <TableCell>:</TableCell>
                        <TableCell>{gr.grCode}</TableCell>              
                </TableRow>
                <TableRow>
                        <TableCell>GR Date</TableCell>
                        <TableCell>:</TableCell>
                        <TableCell>{formatDate(gr.tanggal)}</TableCell>              
                </TableRow>

                <TableRow>
                        <TableCell>Periode</TableCell>
                        <TableCell>:</TableCell>
                        <TableCell>{gr.grPeriode}</TableCell>              
                </TableRow>
                

                
             </Table>
               
        </TableContainer>

        
        </Grid>

        </div>
    )
}
