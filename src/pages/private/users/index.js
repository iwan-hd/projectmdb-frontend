import React, {useState, useEffect} from 'react'
import Axios from 'axios';
import { useHistory } from "react-router-dom";

//import material-ui
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow'
import TableCell from "@material-ui/core/TableCell";
import TableContainer from '@material-ui/core/TableContainer';
import Typography from '@material-ui/core/Typography';

export default function Users() {

    const [users, setUsers] = useState([]);
    const history = useHistory();

    useEffect(() => {
      Axios.get('http://localhost:8090/api/v1/users')
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
            <Typography variant="h3" component="h4">
             Halaman Daftar Users
            </Typography>
       
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell>Nama</TableCell>
                            <TableCell>Foto</TableCell>
                            <TableCell>Loginxx</TableCell>
                            
                        </TableRow>
                    </TableHead>

                    <TableBody>
                            {users && users.map((user, index) => {
                            return <TableRow hover key={index}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.userName}</TableCell>
                                <TableCell>{user.foto}</TableCell>
                                <TableCell>{user.loginId}</TableCell>
                                
                                
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
