import React, {useState, useEffect} from 'react';
//import Axios from 'axios';  diganti jadi function users.js

import UserService from '../../../config/api/users.js';
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
import {useStyles} from './style.js';

export default function Users() {

    const [users, setUsers] = useState([]);
    const history = useHistory();

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

    return (
        <div style={{padding : 10}}>
           <Typography variant="h4" component="h4" align="center"> 
             Halaman Daftar Users
            </Typography>
            <br></br>

            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Nama</TableCell>
                            <TableCell>Foto</TableCell>
                            <TableCell>User Name</TableCell>
                            <TableCell>Action x</TableCell>
                        </TableRow>
                    </TableHead>


                    <TableBody>
                            {users && users.map((user, index) => {
                            return <TableRow hover key={index}>
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{user.nama}</TableCell>
                                <TableCell>{user.foto}</TableCell>
                                <TableCell>{user.username}</TableCell>
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



                {/* <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                    </tr>    
                </thead>
                <tbody>
                   {users && users.map((user, index) => {
                       return <tr key={index}>
                           <td>{user.id}</td>
                           <td>{user.userName}</td>
                       </tr>
                   })}
                </tbody> */}
          
        </div>
    )
}
