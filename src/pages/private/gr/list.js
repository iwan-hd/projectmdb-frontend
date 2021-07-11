//1.Library dasar React
import React, {useState, useEffect} from 'react'
//import Axios from 'axios';
import GrService from '../../../config/api/gr.js'

import { useHistory } from "react-router-dom";  //kalo ada kurung kurawal {} itu suatu funtion
import { Route, Switch, NavLink, Link } from 'react-router-dom'

//2.import material-ui
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow'
import TableCell from "@material-ui/core/TableCell";
import TableContainer from '@material-ui/core/TableContainer';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import {useStyles} from './style.js';
import DeleteIcon from '@material-ui/icons/Delete';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import EditIcon from '@material-ui/icons/Edit';

//import Typography from '@material-ui/core/Typography';



export default function ListGr() {

    const [gr, setGrs] = useState(useState([]));
    const history=useHistory();
    
    const classes = useStyles();
    //Switch alert=> dialog
    const MySwal = withReactContent(Swal);
   
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
            GrService.deleteGr(idx)
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
        <div style={{padding : 0}}>
        {/* <Typography variant="h3" component="h4">
         Halaman Daftar GR
        </Typography>  */}
        {/* Typography (jsx) = h1 (html)  */}
   
        <Button variant="contained" color="secondary" onClick={() => { window.location.href='/grlist/add' }}>
          Add GR
        </Button>

        <TableContainer component={Paper}>
           <Table className={classes.table} size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell>Periode</TableCell>
                        <TableCell>Nr GR</TableCell>
                        <TableCell>Tanggal</TableCell>
                        <TableCell>Kunci</TableCell>
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
                        })}
                </TableBody>
            </Table>
        </TableContainer>

      
    </div>

    )   
    // end returm
}

