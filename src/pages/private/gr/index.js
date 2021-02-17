//1.Library dasar React
import React, {useState, useEffect} from 'react'
import Axios from 'axios';
import { useHistory } from "react-router-dom";  //kalo ada kurung kurawal {} itu suatu funtion

//2.import material-ui
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow'
import TableCell from "@material-ui/core/TableCell";
import TableContainer from '@material-ui/core/TableContainer';
import Typography from '@material-ui/core/Typography';



export default function Gr() {

    const [gr, setGrs] = useState(useState([]));
    const history=useHistory();

     useEffect(() => {
         Axios.get('http://localhost:8090/api/v1/gr')
         .then( res => {
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
    return (
        <div style={{padding : 10}}>
        <Typography variant="h3" component="h4">
         Halaman Daftar GR
        </Typography> 
        {/* Typography (jsx) = h1 (html)  */}
   
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell>Periode</TableCell>
                        <TableCell>Nr GR</TableCell>
                        <TableCell>Tanggal</TableCell>
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
                                 <TableCell>{Gr.tanggal}</TableCell>
                               </TableRow>
                        })}
                </TableBody>
            </Table>
        </TableContainer>

      
    </div>

    )   
    // end returm
}

