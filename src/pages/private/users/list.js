import React, {useState, useEffect} from 'react';
//import Axios from 'axios';  diganti jadi function users.js

import UserService from '../../../config/api/users.js';
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
import { Typography } from '@material-ui/core';

export default function ListUser() {

    const [users, setUsers] = useState([]);
    const history = useHistory();
    const MySwal = withReactContent(Swal);

    useEffect(() => {
    ////  Axios.get('http://localhost:8090/api/v1/users') di ganti jadi
    UserService.getAll()
      .then(response => {
          const {datatabel, message, status} = response.data;
          if (message == 'success') {
              setUsers(datatabel.body)
          } else {
              alert(message);
          }
      })
      .catch(error => {
          alert(error)
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
            UserService.deleteUser(idx)
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
            <Button variant="contained" color="secondary" onClick={() => { window.location.href='/users/add' }}>
               Add USER
            </Button>

            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Nama</TableCell>
                            <TableCell>Foto</TableCell>
                            <TableCell>User Name</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Created By</TableCell>
                            
                            
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>


                    <TableBody>
                            {users && users.map((user, index) => {
                            return <TableRow hover key={index}>
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{user.nama}</TableCell>
                                <TableCell>{user.foto}</TableCell>
                                <TableCell>{user.userName}</TableCell>
                                <TableCell>{formatDate(user.createdAt)}</TableCell>
                                <TableCell>{user.roles.map((role, index) => {
                                    return <Typography key={role.id} component="h6">{role.name}</Typography>
                                })}</TableCell>
                                <TableCell>{user.createdBy}</TableCell>
                                
                                
                                <TableCell>
                                    <Tooltip title="View">
                                        <IconButton aria-label="View" size="small"
                                        component = {Link} to={`/users/view/${user.id}`}
                                        >
                                            <VisibilityIcon  fontSize="small"/>
                                        </IconButton>
                                    </Tooltip>
                                     

                                    <Tooltip title="Edit">
                                        <IconButton aria-label="Edit" size="small"
                                            component = {Link} to={`/users/edit/${user.id}`}
                                         >

                                             <EditIcon fontSize="small"/>
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Delete">
                                        <IconButton onClick={() => handleDelete(user.id)}size="small">
                                     
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
