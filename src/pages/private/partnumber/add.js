import React, {useState}from 'react';
import {useStyles} from './style.js'
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import PartNumberService from '../../../config/api/partnumber.js'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'




export default function AddPn() {
  const classes = useStyles();
  const MySwal = withReactContent(Swal)
const [form, setForm] = useState({
    partCode : '',
    partName : '',
    stock : 0
});

const [error, setError] = useState({
  partCode : '',
  partName : '',
  stock : ''
});


const [isSubmitting, setIsSubmitting] = useState(false)

const validate = () => {

  const newError= {...error};  // object dari state error -> ada partCode dan partName

  if (!form.partCode) {
    newError.partCode = "Part Code harus diisi";
  }

  if (!form.partName) {
    newError.partName = "Part Name harus di isi";
  }

  if (!form.stock) {
    newError.stock = "Stock harus di isi";
  }

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

     console.log(form.partCode);
      var data = { partCode : form.partCode.toString(), partName : form.partName.toString(), stock : form.stock.toString() }
      console.log(data)
      await PartNumberService.addPartNumber(data)
      .then(response => {
        console.log(response.data);
        MySwal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${response.data.mesage}`,
          showConfirmButton: true,
         // timer: 1500
        }).then((result) => {
          if (result.isConfirmed) {
            
            setForm({
              partCode : '',
              partName : '',
              stock : '' 
            })
            setIsSubmitting(false)
            window.location.href = '/partnumbers'
            
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
    <form className={classes.form} noValidate autoComplete="off">
       {/* matiin Validasi bawaan/ automatis dari Reactnya , autocomplete= histori ketikan di field dimatikan, jadi nga ada sisa ketikan sebelumnya*/}
      <TextField
      fullWidth
        // textnya memenuhi containernya
        type="text"
        id="pncode"
        name="partCode"
        label="PN Code"
        variant="filled"
        value={form.partCode}
        color="secondary"
        size="medium"
        onChange={handleChange}
        required
        helperText={error.partCode}
        error={error.partCode?true:false}
        disabled={isSubmitting}
      />
     
     <TextField
     fullWidth
        type="text"
        id="pnname"
        name="partName"
        label="PN Name"
        variant="filled"
        value={form.partName}
        color="secondary"
        size="medium"
        onChange={handleChange}
        required
        helperText={error.partName}
        error={error.partName?true:false}
        disabled={isSubmitting}
      />
     
      <TextField
        fullWidth
        type="text"
        id="stock"
        name="stock"
        label="stock"
        variant="filled"
        value={form.stock}
        color="secondary"
        size="medium"
        onChange={handleChange}
        required
        helperText={error.stock}
        error={error.stock?true:false}
        disabled={isSubmitting}
      />



      <br></br>
       <Button variant="contained" color="secondary" onClick={handleSubmit} disabled={isSubmitting}>
          Save
        </Button>

    
    </form>
  );
}
