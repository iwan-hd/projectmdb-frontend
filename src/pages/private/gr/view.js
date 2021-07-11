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
import  Button  from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
export default function ViewGR({match}) {
    
    console.log(match.params.id);
    const [gr, setGR] = useState({});
    const ID = match.params.id;
    const classes = useStyles();
    const [amount, setAmount] = useState(0)

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

    const addRow = (e) => {

    }

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

        <br/><br/>

        <Grid container alignItems="center" justify="center">
           <TableContainer component={Paper}>
           <Table className={classes.table} size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>PN</TableCell>
                        <TableCell>PN Name</TableCell>
                        <TableCell>Qty</TableCell>
                        <TableCell>Unit Price</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>PN001</TableCell>
                        <TableCell>Pulpen</TableCell>
                        <TableCell>
                        <TextField
                            fullWidth
                                type="number"
                                id="qty"
                                name="qty"
                                label="Jumlah Barang"
                                variant="filled"
                                // value={form.grCode}
                                color="secondary"
                                size="medium"
                                // onChange={handleChange}
                                // required
                                // helperText={error.grCode}
                                // error={error.grCode?true:false}
                                // disabled={isSubmitting}
                            />

                        </TableCell>
                        <TableCell>
                        <TextField
                            fullWidth
                                type="number"
                                id="unit_price"
                                name="unit_price"
                                label="Harga Satuan"
                                variant="filled"
                                // value={form.grCode}
                                color="secondary"
                                size="medium"
                                // onChange={handleChange}
                                // required
                                // helperText={error.grCode}
                                // error={error.grCode?true:false}
                                // disabled={isSubmitting}
                            />
                        </TableCell>
                        <TableCell>{amount}</TableCell>
                        <TableCell><Button onClick={addRow}>Add</Button></TableCell>
                </TableRow>
                   
                        {/* {gr && gr.map((Gr, index) => {
                            //map seperti for looping
                            //partnumbers suatu array, ada isinya, sedangkan Partnumber = var 1 object
                            //index mulai dari 0,1,2,3...
                        return <TableRow hover key={index}>
                                 <TableCell>{index + 1}</TableCell>
                                 <TableCell>{Gr.id}</TableCell>
                                 <TableCell>{Gr.grPeriode}</TableCell>
                                 <TableCell>{Gr.grCode}</TableCell>
                                 <TableCell>{formatDate(Gr.tanggal)}</TableCell>
                                 <TableCell>{(Gr.kunci == 1) ? "Locked":"Open"} </TableCell>
                                 <TableCell>
                                    <Tooltip title="View">
                                        <IconButton aria-label="View" size="small"
                                            component = {Link} to={`/grlist/view/${Gr.id}`}
                                         >

                                        <VisibilityIcon  fontSize="small"/>
                                           
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Edit">
                                        <IconButton aria-label="Edit" size="small"
                                            component = {Link} to={`/grlist/edit/${Gr.id}`}
                                         >

                                        <EditIcon fontSize="small"/>
                                           
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Delete">
                                        <IconButton onClick={() => handleDelete(Gr.id)}size="small">
                                     
                                            <DeleteIcon fontSize="small"/>
                                        </IconButton>
                                       
                                    </Tooltip>
                                     
                                 </TableCell>
                               </TableRow>
                        })} */}
                </TableBody>
            </Table>
        </TableContainer>
        </Grid>
        </div>
    )
}
