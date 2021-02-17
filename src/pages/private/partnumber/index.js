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

export default function PartNumber() {
// membuat state pn dalam fungsi setpartnumbers, dalam array 
const [partnumbers, setpartnumbers] = useState([]);

// buat ngelink ke halaman yg di mau
const history = useHistory();

useEffect(() => {
    Axios.get('http://localhost:8090/api/v1/partnumbers')
    .then(res=>{

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
        <Typography variant="h3" component="h4">
         Halaman Daftar Part Number
        </Typography>
   
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell>Part Code</TableCell>
                        <TableCell>Part Name</TableCell>
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
                               </TableRow>
                        })}
                </TableBody>
            </Table>
        </TableContainer>

      
    </div>
)
}
