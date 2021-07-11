import React, {useState, useEffect} from 'react'

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from "@material-ui/core/TableCell";
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import PartNumberService from '../../../config/api/partnumber.js';
export default function ViewPN({match}) {
    
    console.log(match.params.id);
    const [partnumbers, setPartnumbers] = useState({});
    const ID = match.params.id;

    useEffect(() => {
        PartNumberService.getId(ID).then(res=>{
            // ambil dari postman
            const {datatabel, message, status} = res.data;
            if (message == 'success') {
                setPartnumbers(datatabel.body)
            } else {
                alert(message);
            }
        })
        .catch(error => {
            alert(error);
        })
      
    
    }, [])





    return (
        <div>
       

        <Grid container alignItems="center" justify="center">
            {/* <Grid item xs={12} sm={6}>
                    
            </Grid> */}
         <TableContainer component={Paper}>
             <Table>
                <TableRow>
                        <TableCell>No PN</TableCell>
                        <TableCell>:</TableCell>
                        <TableCell>{partnumbers.partCode}</TableCell>              
                </TableRow>
                <TableRow>
                        <TableCell>Part Name</TableCell>
                        <TableCell>:</TableCell>
                        <TableCell>{partnumbers.partName}</TableCell>              
                </TableRow>

                <TableRow>
                        <TableCell>Stock</TableCell>
                        <TableCell>:</TableCell>
                        <TableCell>{partnumbers.stock}</TableCell>              
                </TableRow>
             </Table>
               
         </TableContainer>
        </Grid>
        </div>
    )
}
