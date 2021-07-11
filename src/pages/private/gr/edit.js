import React, {useState, useEffect}from 'react';
import {useStyles} from './style.js';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import GRService from '../../../config/api/gr.js';
import 'date-fns';

import DateFnsUtils from '@date-io/date-fns';
import Switch from '@material-ui/core/Switch';
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
          console.log(res.data);
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
  

}, [])



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


const handleSubmit =  async e => {
    e.preventDefault();  //tetap di halaman ini, spy nga lari ke Halaman lain

    const findErrors = validate();
  

    if (Object.values(findErrors).some(err => err != '')) {
      setError(findErrors);

  } else {
      setIsSubmitting(true)

     console.log(form.grPeriode);
      var data = { grPeriode : form.grPeriode.toString(), grCode : form.grCode.toString(), tanggal : selectedDate.toString(), kunci : (form.kunci === true) ? '1' : '0'}
      console.log(data)
     
      await GRService.updateGr(data,ID)
      .then(response => {
        console.log(response.data);
        MySwal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${response.data.message}`,
          showConfirmButton: true,
         // timer: 1500
        }).then((result) => {
          if (result.isConfirmed) {
            
            setForm({
              grPeriode : '',
              grCode : '',
              tanggal : '',
              kunci : '' 
            })
            setIsSubmitting(false)
            window.location.href = '/grlist'
            
          }
        })

        
      })
      .catch(err => {
        console.log(err);
        alert(err.message)
        setIsSubmitting(false)
      })
  }


  }




    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <form className={classes.form} noValidate autoComplete="off">
           {/* matiin Validasi bawaan/ automatis dari Reactnya , autocomplete= histori ketikan di field dimatikan, jadi nga ada sisa ketikan sebelumnya*/}
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
    
    
          <br></br>
           <Button variant="contained" color="secondary" onClick={handleSubmit} disabled={isSubmitting}>
              Update
            </Button>
    
        
        </form>
        </MuiPickersUtilsProvider>
    
    )
}
