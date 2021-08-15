import React, {useState, useEffect} from 'react'

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from "@material-ui/core/TableCell";
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import PartNumberService from '../../../config/api/gr.js';
import GrSubService from '../../../config/api/grsub.js';
import {useStyles} from './style.js';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Button  from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import AddIcon from '@material-ui/icons/Add';
import Add from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveIcon from '@material-ui/icons/Remove';
import Tooltip from '@material-ui/core/Tooltip';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
export default function ViewGR({match}) {
    
    console.log(match.params.id);
    const [gr, setGR] = useState({});
    const ID = match.params.id;
    const classes = useStyles();
    const [amountRow,setAmountRow] =  useState(0);

    const MySwal = withReactContent(Swal);
    const [grsub,setGrSub] = useState([]);

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
      
        GrSubService.getGrIdx(ID).then(res=>{
            // ambil dari postman

            console.log(res);
            const {datatabel, message, status} = res.data;
            if (message == 'success') {
                setGrSub(datatabel.body);
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


    const handleDelete = idx => {
 
        MySwal.fire({
            title: 'Are you sure remove this data?',
            text: "You won't be able to repeat this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
            GrSubService.deleteGr(idx)
                .then(response => {
                        console.log(response)
                        MySwal.fire(
                            {
                                title :  `${response.data.datatabel}`,
                                icon : 'success',
                                showConfirmButton: false,
    
                            }
                            
                          )
                          window.location.reload()
                       
                })
                .catch(err => {
                    console.log(err)
                })
                // location.reload();
                
            }
          })
    
      
        
    };



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
<br></br>
<br></br>
        <Grid container spacing={3}>
                        
                          <Grid item xs={3}>
                         
                          </Grid>
                        </Grid>   
        <Grid container alignItems="center" justify="center">
           <TableContainer component={Paper}>
           <Table className={classes.table} size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>PN</TableCell>
                    
                        <TableCell>Qty</TableCell>
                        <TableCell>Unit Price</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
              
              
                <TableBody>
                   {grsub && grsub.map((Gridx,index) => {

                    return <TableRow hover key={index}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{Gridx.idPn}</TableCell>
                              <TableCell>{Gridx.qty}</TableCell>
                              <TableCell>{Gridx.unitprice}</TableCell>
                              <TableCell>{Gridx.qty* Gridx.unitprice}</TableCell>
                             
                              <TableCell>
                                <Tooltip title="Delete"> 
                                 <IconButton onClick={() => handleDelete(Gridx.id)}size="small">    
                                     <DeleteIcon fontSize="small"/>
                                 </IconButton>
                                </Tooltip>  

                              </TableCell>
                              
                          </TableRow>

                   })}

                </TableBody>

             </Table>   

             </TableContainer>
             </Grid>

</div>


        
    )
}
