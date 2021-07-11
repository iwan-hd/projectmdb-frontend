import React, {useState}from 'react';
import {useStyles} from './style.js';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import GRService from '../../../config/api/gr.js';
import 'date-fns';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import DateFnsUtils from '@date-io/date-fns';
import Switch from '@material-ui/core/Switch';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


export default function AddPn() {
    const classes = useStyles();
    const MySwal = withReactContent(Swal)
  const [form, setForm] = useState({
    grPeriode : "",
    grCode : "",
    tanggal : "",
    kunci : ""
  });

  
const [error, setError] = useState({
    grPeriode : "",
    grCode : "",
    tanggal : "",
    kunci : true
  });

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setError({
     tanggal:""
      // titik 3 ini berarti isi field dari object error nya
      //[date.target.name] :''
    })
  
  };
const [isSubmitting, setIsSubmitting] = useState(false)

const validate = () => {

    const newError= {...error};  // object dari state error -> ada partCode dan partName
  
    if (!form.grPeriode) {
      newError.grPeriode = "GR Periode harus diisi";
    }
  
    if (!form.grCode) {
      newError.grCode = "GR Code harus di isi";
    }
  
    if (!selectedDate) {
      newError.tanggal = "Tanggal harus di isi";
    }
  
    // if (!form.kunci) {
    //     newError.kunci = "Kunci harus di isi";
    //   }
    
    return newError
  
  }


  const handleChange = e => {

    setForm({
      ...form,
      [e.target.name] : [e.target.value]
    })
  
    setError({
      ...error,
      // titik 3 ini berarti isi field dari object error nya
      [e.target.name] :''
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
      var data = { grPeriode : form.grPeriode.toString(), grCode : form.grCode.toString(), tanggal : selectedDate.toString(),kunci : (form.kunci === true) ? '1' : '0'}
      console.log(data)
      await GRService.addGr(data)
      .then(response => {
        console.log(response.data);

        if (response.data.status === 200) {
          
          MySwal.fire({
         
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
                kunci : false 
              })
              setIsSubmitting(false)
              window.location.href = '/grlist'
              
            }
          })

        } else {
          
          MySwal.fire({
          
            icon: 'error',
            title: `${response.data.message}`,
            showConfirmButton: true,
            width: '80%',
           // timer: 1500
          }).then((result) => {
            if (result.isConfirmed) {
              setIsSubmitting(false)
              
            }
          })

        }
       

        
      })
      .catch(err => {
        console.log(err);
        alert(err.message)
        setIsSubmitting(false)
      })
  }


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
      {/* <TextField
        fullWidth
        type="text"
        id="tanggal"
        name="tanggal"
        label="tanggal"
        variant="filled"
        value={form.tanggal}
        color="secondary"
        size="medium"
        onChange={handleChange}
        required
        helperText={error.tanggal}
        error={error.tanggal?true:false}
        disabled={isSubmitting}
      /> */}

   {/* <TextField
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
          Save
        </Button>

    
    </form>
    </MuiPickersUtilsProvider>
  );
}
