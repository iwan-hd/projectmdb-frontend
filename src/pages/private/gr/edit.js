import React, {useState, useEffect}from 'react';
import {useStyles} from './style.js';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import GRService from '../../../config/api/gr.js';
import PartNumberService from '../../../config/api/partnumber.js';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from "@material-ui/core/TableCell";
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import DateFnsUtils from '@date-io/date-fns';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Add from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Hidden from '@material-ui/core/Hidden';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


export default function Edit({match}) {
    const classes = useStyles();
    const MySwal = withReactContent(Swal)
    const [form, setForm] = useState({
    id  : "",
    grPeriode : "",
    grCode : "",
    tanggal : "",
    kunci : ""
  });

  const [formSub, setFormSub] = useState([
    {
    idGr : "",
    idPn : "",
    qty : 0,
    unitPrice : 0,
    amount : 0,
    index : 0
},

]);
const [error, setError] = useState({
    id : "",
    grPeriode : "",
    grCode : "",
    tanggal : "",
    kunci : ""
  });
   
  
  const ID = match.params.id;
  const [isSubmitting, setIsSubmitting] = useState(false)


  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const [pnList, setPnList] = React.useState([]);
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setError({
     tanggal:""
      // titik 3 ini berarti isi field dari object error nya
      //[date.target.name] :''
    })
  
  }; 



  useEffect(() => {
    GRService.getId(ID).then(res=>{
        // ambil dari postman
      
        const {datatabel, message, status} = res.data;
        if (message == 'success') {
      //    console.log(res.data);
         setForm({
          id : datatabel.body.id,
          grPeriode : datatabel.body.grPeriode,
          grCode : datatabel.body.grCode,
          tanggal : datatabel.body.tanggal,
          kunci : (datatabel.body.kunci === 1) ? true : false
         })
        } else {
            alert(message);
        }
    })
    .catch(error => {
        alert(error);
    })
  

    PartNumberService.getAll().then(res => {
     
      const {datatabel , message, status} = res.data;
      if (message == "success") {
        // console.log(datatabel.body);
        setPnList(datatabel.body)
       
      } else {
        alert(message);
      }
    })
    .catch(error => {
      alert(error)
    })
}, [])


const addRow = (e) => {
  const forms = formSub ;
  forms.push()
 setFormSub((formSub) => [
  ...formSub,
  {
      idGr : "",
      idPn : "",
      qty : 0,
      unitPrice : 0,
      amount : 0,
      index : 0
  }
]);   
}


  const validate = () => {
  
      const newError= {...error};  // object dari state error -> ada partCode dan partName
    
      if (!form.grPeriode || form.grPeriode == "") {
        newError.grPeriode = "GR Periode harus diisi";
      }
    
      if (!form.grCode || form.grCode == "" ) {
        newError.grCode = "GR Code harus di isi";
      }
    
      if (!form.tanggal || form.tanggal == "") {
        newError.tanggal = "Tanggal harus di isi";
      }
    
      // if (!form.kunci || form.kunci == "") {
      //     newError.kunci = "Kunci harus di isi";
      //   }
      
      return newError
    
    }


    const handleChange = e => {

        setForm({
          ...form,
         [e.target.name] : [e.target.value],
        // kunci : e.target.value,
          
        })
      
        setError({
          ...error,
          // titik 3 ini berarti isi field dari object error nya
          [e.target.name] :''
        })
      
      
      }

      const handleChangeSub =  index => e =>  {
      //  console.log([e.target.value]);
     
      
         const forms =  formSub;
         const newForms = forms.map((form2,idx) =>
         {
    //    console.log(form.qty);

          if (index == idx) {
            return {
              ...form2,
              [e.target.name] : e.target.value,
               idGr : form.id,
               amount :form2.qty* form2.unitPrice,
            }
          } else {
            return {
              ...form2,
           
            }
            }       

    });
   // console.log(newForms);
   setFormSub(newForms);

  

  }


      const handleChecked = e => {

        setForm({     
          kunci :  e.target.checked,
          grCode : form.grCode,
          grPeriode : form.grPeriode,
          tanggal : form.tanggal
        })
      
        setError({
          // ...error,
          // titik 3 ini berarti isi field dari object error nya
          kunci :''
        })
      
      
      }


      

    const removeRow =(index) => {
    
      setFormSub(  [...formSub.slice(0,index), ...formSub.slice(index+1)]);
    //  console.log(formSub);
  }


    const handleChangeSelect = index => e =>  {
      
        const name =  e.target.value;
        const idx = [index]

      
         const forms =  formSub;
         const newForms = forms.map((form,idx) =>
         {
        
          if (index == idx) {
            return {
              ...form,
              idPn : name,
              index : index,
             
            }
          }else {
            return {
              ...form,
           
            }
            }       

    });
     console.log( document.getElementById('test').value);
   setFormSub(  newForms);

  }


const handleSubmit =  async e => {
  const newFormsAmount  = formSub.map((form2,idx) =>
  {

    console.log(form2);
     return {
       ...form2,
        amount :form2.qty* form2.unitPrice,
     }
 

});
setFormSub(newFormsAmount);
var p = formSub.map((test) => 
 test
);
alert(JSON.stringify(p));
  //   e.preventDefault();  //tetap di halaman ini, spy nga lari ke Halaman lain

  //   const findErrors = validate();
  

  //   if (Object.values(findErrors).some(err => err != '')) {
  //     setError(findErrors);

  // } else {
  //     setIsSubmitting(true)

  //    console.log(form.grPeriode);
  //     var data = { grPeriode : form.grPeriode.toString(), grCode : form.grCode.toString(), tanggal : selectedDate.toString(), kunci : (form.kunci === true) ? '1' : '0'}
  // //    console.log(data)
     
  //     await GRService.updateGr(data,ID)
  //     .then(response => {
  //       console.log(response.data);
  //       MySwal.fire({
  //         position: 'top-end',
  //         icon: 'success',
  //         title: `${response.data.message}`,
  //         showConfirmButton: true,
  //        // timer: 1500
  //       }).then((result) => {
  //         if (result.isConfirmed) {
            
  //           setForm({
  //             grPeriode : '',
  //             grCode : '',
  //             tanggal : '',
  //             kunci : '' 
  //           })
  //           setIsSubmitting(false)
  //           window.location.href = '/grlist'
            
  //         }
  //       })

        
  //     })
  //     .catch(err => {
  //    //   console.log(err);
  //       alert(err.message)
  //       setIsSubmitting(false)
  //     })
  // }


  }

  console.log(formSub);
  const partnumbers = pnList;

	let partNumberList = partnumbers.length > 0
		&& partnumbers.map((item, i) => {
		return (
			<option key={i} value={item.partCode}>{item.partName}</option>
		)
	}, this);

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <form className={classes.form} noValidate autoComplete="off">
           {/* matiin Validasi bawaan/ automatis dari Reactnya , autocomplete= histori ketikan di field dimatikan, jadi nga ada sisa ketikan sebelumnya*/}
           <Grid container spacing={4}>
           <Grid item xs={4}>
          <TextField
          fullWidth
            // textnya memenuhi containernya
            type="text"
            id="grPeriode"
            name="grPeriode"
            label="GR Periode"
            variant="filled"
            value={form.grPeriode}
            color="secondary"
            size="medium"
            onChange={handleChange}
            required
            helperText={error.grPeriode}
            error={error.grPeriode?true:false}
            disabled={isSubmitting}
          />
         </Grid>
         <Grid item xs={4}>
         
         <TextField
         fullWidth
            type="text"
            id="grCode"
            name="grCode"
            label="GR Name"
            variant="filled"
            value={form.grCode}
            color="secondary"
            size="medium"
            onChange={handleChange}
            required
            helperText={error.grCode}
            error={error.grCode?true:false}
            disabled={isSubmitting}
          />


          <TextField
         fullWidth
            type="text"
            id="grCode"
            name="grCode"
            label="GR Name"
            variant="filled"
            value={form.grCode}
            color="secondary"
            size="medium"
            onChange={handleChange}
            required
            helperText={error.grCode}
            error={error.grCode?true:false}
            disabled={isSubmitting}
          />
         </Grid>

         <Grid item xs={4}>
         
          <KeyboardDatePicker
              fullWidth
              margin="normal"
              id="date-picker-dialog"
              name="tanggal"
              label="Tanggal"
              format="yyyy-MM-dd"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            //  onChange={handleChange}
              required
              helperText={error.tanggal}
              error={error.tanggal?true:false}
              disabled={isSubmitting}
            />

         </Grid>

{/*     
       <TextField
            fullWidth
            type="text"
            id="kunci"
            name="kunci"
            label="kunci"
            variant="filled"
            value={form.kunci}
            color="secondary"
            size="medium"
            onChange={handleChange}
            required
            helperText={error.kunci}
            error={error.kunci?true:false}
            disabled={isSubmitting}
          /> */}
    
    <Grid item xs={4}>
    <Switch
    fullWidth
    label="kunci"
    id="kunci"
    size="medium"
    variant="filled"
    required
    helperText={error.kunci}
    error={error.kunci?true:false}
    disabled={isSubmitting}
        checked={form.kunci}
        onChange={handleChecked}
        name="kunci"
        inputProps={{ 'aria-label': 'Kunci' }}
      />
      </Grid>
    
    </Grid>   
          <br></br>
           <Button variant="contained" color="secondary" onClick={handleSubmit} disabled={isSubmitting}>
              Update
            </Button>
    
        
        </form>
        
        <br/><br/>
        <Grid container spacing={3}>
                          <Grid item xs={3}>
                           <IconButton color="primary" onClick={addRow}><Add/></IconButton>
                          </Grid>
                          <Grid item xs={3}>
                         
                          </Grid>
                        </Grid>   
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

                <TableBody>. 
                  { formSub.map((result, index) => {
                      console.log(index);
                      return <TableRow>
                      <TableCell>{index + 1 }</TableCell>
                      <TableCell id="idPn">{result.idPn}</TableCell>
                      <TableCell>
                      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel htmlFor="filled-age-native-simple">Pilih PN</InputLabel>
        <Select
          native
        name = {form.idPn}
          value={form.idPn}
          onChange={ handleChangeSelect(index)}
          // inputProps={{
          //   name: 'idPn',
          //   id: 'filled-age-native-simple',
          // }}
          >
          {partNumberList}
        </Select>
      </FormControl>

                      </TableCell>
                      <TableCell>
                      <TextField
                          fullWidth
                              type="number"
                              id="qty"
                              name="qty"
                              label="Jumlah Barang"
                              variant="filled"
                            // value={form.qty}
                              color="secondary"
                              size="medium"
                               onChange={handleChangeSub(index)}
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
                              id="unitPrice"
                              name="unitPrice"
                              label="Harga Satuan"
                              variant="filled"
                              value={form.unitPrice}
                              color="secondary"
                              size="medium"
                              onChange={handleChangeSub(index)}
                              // required
                              // helperText={error.grCode}
                              // error={error.grCode?true:false}
                              // disabled={isSubmitting}
                          />
                      
{/*                       
                         <Hidden>
                         
                        <TextField
                          fullWidth
                              type="hidden"
                              id="amount"
                              name="amount"
                             // label="amount"
                              variant="filled"
                              value={ result.qty *  result.unitPrice}
                              color="secondary"
                              size="medium"
                              onChange={handleChangeSub(index)}
                              // required
                              // helperText={error.grCode}
                              // error={error.grCode?true:false}
                              // disabled={isSubmitting}
                          />
                          </Hidden> */}

                      </TableCell>
                      <TableCell  id="test">{ result.qty *  result.unitPrice}</TableCell>
                      <TableCell>  <IconButton  color="secondary" onClick={() => removeRow(index)}><RemoveIcon/></IconButton></TableCell>
                  </TableRow>
                      
                  })  }
                         
                        
                  
                </TableBody>
            </Table>
        </TableContainer>
        </Grid>
        </MuiPickersUtilsProvider>
    
    )
}
