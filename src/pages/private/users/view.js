import React, {useState, useEffect} from 'react'

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from "@material-ui/core/TableCell";
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import UserService from '../../../config/api/users.js';
import users from '../../../config/api/users.js';
export default function ViewUser({match}) {
      
    // console.log(match.params.id);
    const [user, setUser] = useState({});
    const ID = match.params.id;

    useEffect(() => {
        UserService.getId(ID).then(res=>{
            // ambil dari postman
            const {datatabel, message, status} = res.data;
            if (message == 'success') {
                setUser(datatabel.body)
          
            }
        })
        .catch(error => {
            alert(error);
        })
      
    
    }, [1])


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
                        <TableCell>Nomor</TableCell>
                        <TableCell>:</TableCell>
                        <TableCell>{user.id}</TableCell>              
                </TableRow>
                <TableRow>
                        <TableCell>Nama</TableCell>
                        <TableCell>:</TableCell>
                        <TableCell>{user.nama}</TableCell>              
                </TableRow>
                <TableRow>
                        <TableCell>User Name</TableCell>
                        <TableCell>:</TableCell>
                        <TableCell>{user.userName}</TableCell>              
                </TableRow>

                <TableRow>
                        <TableCell>Created At</TableCell>
                        <TableCell>:</TableCell>
                        <TableCell>{formatDate(user.createdAt)}</TableCell>              
                </TableRow>

                <TableRow>
                        <TableCell>Created By</TableCell>
                        <TableCell>:</TableCell>
                        <TableCell>{user.createdBy}</TableCell>              
                </TableRow>
                
                <TableRow>
                        <TableCell>Roles</TableCell>
                        <TableCell>:</TableCell>
                        <TableCell>
                           {user.roles ? user.roles.map(task => { return <Typography>{task.name}</Typography>}) : console.log('Ok')} 
                        </TableCell>
                        {/* <TableCell>{user.roles.map((role, index) => {
                                    return <Typography key={role.id} component="h6">{role.name}</Typography>
                                })}</TableCell>   */}
                </TableRow>

                <TableRow>
                        <TableCell>Foto</TableCell>
                        <TableCell>:</TableCell>
                        <TableCell>{user.foto}</TableCell>              
                </TableRow>
                
             </Table>
               
         </TableContainer>
        </Grid>
        </div>
    )
}

