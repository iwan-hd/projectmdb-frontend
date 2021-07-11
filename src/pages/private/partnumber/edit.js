import React, {useState, useEffect}from 'react';
import {useStyles} from './style.js'
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import PartNumberService from '../../../config/api/partnumber.js';


export default function Edit({match}) {


    const classes = useStyles();
    const MySwal = withReactContent(Swal)
    const [form, setForm] = useState({
      id : '',
      partCode : '',
      partName : '',
      stock : 0
  });
  
  const [error, setError] = useState({
    partCode : '',
    partName : '',
    stock : ''
  });
  


    const ID = match.params.id;

    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
      PartNumberService.getId(ID).then(res=>{
          // ambil dari postman
        
          const {datatabel, message, status} = res.data;
          if (message == 'success') {
            console.log(res.data);
           setForm({
            id : datatabel.body.id,
            partCode : datatabel.body.partCode,
            partName : datatabel.body.partName,
            stock : datatabel.body.stock
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
      
        if (!form.partCode || form.partCode == "") {
          newError.partCode = "Part Code harus diisi";
        }
      
        if (!form.partName || form.partName == "") {
          newError.partName = "Part Name harus di isi";
        }
      
        if (!form.stock || form.stock == "") {
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
          var data = { partCode : form.partCode.toString(), partName : form.partName.toString(), stock : form.stock.toString(), id : form.id.toString() }
          console.log(data)
       
          await PartNumberService.updatePartNumber(data,ID)
       
          .then(response => {
            console.log(response.data.message);
            MySwal.fire({
              position: 'top-end',
              icon: 'success',
              title: `${response.data.message}`,
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
      
      <TextField
      fullWidth
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
          Update
        </Button>

    
    </form>
  );


    
}
