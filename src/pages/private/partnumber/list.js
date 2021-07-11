import React, {useState, useEffect} from 'react'
import PartNumberService from '../../../config/api/partnumber.js'
import { useHistory } from "react-router-dom";
import { Route, Switch, NavLink, Link } from 'react-router-dom'

//import material-ui
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow'
import TableCell from "@material-ui/core/TableCell";
import TableContainer from '@material-ui/core/TableContainer';
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import EditIcon from '@material-ui/icons/Edit';
import {useStyles} from './style.js'
import { Tab } from '@material-ui/core';

export default function ListPN() {
// membuat state pn dalam fungsi setpartnumbers, dalam array 
const [partnumbers, setpartnumbers] = useState([]);

const classes = useStyles();
// buat ngelink ke halaman yg di mau
const history = useHistory();

//Switch alert=> dialog
const MySwal = withReactContent(Swal)


useEffect(() => {
    PartNumberService.getAll().then(res=>{
        console.log(res);
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
        PartNumberService.deletePartNumber(idx)
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
    <>
        
         <Button variant="contained" color="secondary" onClick={() => { window.location.href='/partnumbers/add' }}>
          Add PN
        </Button>
        
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell>Part Code</TableCell>
                        <TableCell>Part Name</TableCell>
                        <TableCell>Stock</TableCell>
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
                                 <TableCell>{PartNumber.stock}</TableCell>
                                 <TableCell>
                                    <Tooltip title="View">
                                        <IconButton aria-label="View" size="small"
                                        component = {Link} to={`/partnumbers/view/${PartNumber.id}`}
                                        >

                                            <VisibilityIcon  fontSize="small"/>
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Edit">
                                        <IconButton aria-label="Edit" size="small"
                                        component = {Link} to={`/partnumbers/edit/${PartNumber.id}`}
                                        >

                                            <EditIcon fontSize="small"/>
                                        </IconButton>
                                        
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton onClick={() => handleDelete(PartNumber.id)}size="small">
                                     
                                            <DeleteIcon fontSize="small"/>
                                        </IconButton>
                                       
                                    </Tooltip>
                                     
                                 </TableCell>
                               </TableRow>
                        })}
                </TableBody>
            </Table>
        </TableContainer>
        </>

   
)
}
