import React, {useState, useEffect} from 'react'
import PartNumberService from '../../../config/api/partnumber.js'
import { useHistory } from "react-router-dom";

//import material-ui
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
import {useStyles} from './style.js'

export default function PartNumber() {
// membuat state pn dalam fungsi setpartnumbers, dalam array 
const [partnumbers, setpartnumbers] = useState([]);

const classes = useStyles();
// buat ngelink ke halaman yg di mau
const history = useHistory();

useEffect(() => {
    PartNumberService.getAll().then(res=>{
        // ambil dari postman
        const {datatabel, message, status} = res.data;
        if (message == 'success') {
            setpartnumbers(datatabel.body)
        } else {
            alert(message);
        }
    })
    .catch(error => {
        alert(error);
    })
  

}, [])

return (
    <div style={{padding : 10}}>
        <Typography variant="h4" component="h4" align="center"> 
         Halaman Daftar Part Number
        </Typography>
        <br></br>
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell>Part Code</TableCell>
                        <TableCell>Part Name</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                        {partnumbers && partnumbers.map((PartNumber, index) => {
                            //map seperti for looping
                            //partnumbers suatu array, ada isinya, sedangkan Partnumber = var 1 object
                            //index mulai dari 0,1,2,3...
                        return <TableRow hover key={index}>
                                 <TableCell>{index + 1}</TableCell>
                                 <TableCell>{PartNumber.id}</TableCell>
                                 
                                 <TableCell>{PartNumber.partCode}</TableCell>
                                 <TableCell>{PartNumber.partName}</TableCell>
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
}
