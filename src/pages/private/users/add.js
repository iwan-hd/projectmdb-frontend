import React, {useState}from 'react';
import {useStyles} from './style.js'
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import 'date-fns';
import UserService from '../../../config/api/users.js'
import DateFnsUtils from '@date-io/date-fns';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import {  useTheme} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import AuthService from '../../../config/api/auth.js'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const names = [
  'admin',
  'user_pn',
  'user_gr',
  'user',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
export default function AddUser() {
    const classes = useStyles();
    const MySwal = withReactContent(Swal)
    const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChangeSelect = (event) => {
    setPersonName(event.target.value);
  };

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPersonName(value);
  };

    const [form, setForm] = useState({
        nama : "",
        username : "",
        foto : "",
        createdAt : "",
        createdBy : "",
        password : "",
        roles : []
    });
  
    const [error, setError] = useState({
        nama : '',
        username : '',
        foto : '',
        createdAt : "",
        createdBy : "",
        password : "",
        roles : ""
      });

      const [selectedDate, setSelectedDate] = React.useState(new Date());

      const handleDateChange = (date) => {
        setSelectedDate(date);
        setError({
          createdAt:""
          // titik 3 ini berarti isi field dari object error nya
          //[date.target.name] :''
        })
      
      };
      const [isSubmitting, setIsSubmitting] = useState(false)
      const validate = () => {

        const newError= {...error};  // object dari state error -> ada partCode dan partName
      
        if (!form.nama) {
          newError.nama = "nama harus diisi";
        }
        if (!form.username) {
          newError.username = "Username harus diisi";
        } else if(form.username.toString().length < 3) {
          console.log(form.username.toString().length );
          newError.username = "UserName minimal 3 Character";
        } else if(form.username.toString().length > 20) {
            newError.username = "UserName maximal 20 Character";
       }
        
        

        // if (!form.foto) {
        //   newError.foto = "foto harus di isi";
        // }
      
        if (!selectedDate) {
          newError.createdAt = "Created At di isi";
        }
        
        // if (!form.createdBy) {
        //     newError.createdBy = "Created By di isi";
        // }
      
        
        if (!form.password) {
          newError.password = "Password di isi";
      }

        
        if (!form.roles) {
             newError.roles = "Roles di isi";
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
      // console.log(personName);
     ////  console.log(AuthService.getCurrentUser().nama);
        setIsSubmitting(true)
  
      
        var data = { username : form.username.toString(), nama : form.nama.toString(), createdAt : selectedDate.toString(), password : form.password.toString(), role : personName ,
        createdBy : AuthService.getCurrentUser().nama , foto : form.foto.toString()  }
        console.log(data)
        await UserService.addUser(data)
        .then(response => {
          console.log(response.data);
          MySwal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Data Register Successfully !`,
            showConfirmButton: true,
           // timer: 1500
          }).then((result) => {
            if (result.isConfirmed) {
              
              setForm({
                username : '',
                nama : '',
                createdAt : '',
                password : '',
                roles : '' 
              })
              setIsSubmitting(false)
              window.location.href = '/users'
              
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
         <FormControl className={classes.formControl}>
         <TextField
        fullWidth
          // textnya memenuhi containernya
          type="text"
          id="nama"
          name="nama"
          label="nama"
          variant="filled"
          value={form.nama}
          color="secondary"
          size="large"
          onChange={handleChange}
          required
          helperText={error.nama}
          error={error.nama?true:false}
          disabled={isSubmitting}
        />
         </FormControl>
      
         <FormControl className={classes.formControl}>
         <TextField
        fullWidth
          // textnya memenuhi containernya
          type="text"
          id="username"
          name="username"
          label="username"
          variant="filled"
          value={form.username}
          color="secondary"
          size="large"
          onChange={handleChange}
          required
          helperText={error.username}
          error={error.username?true:false}
          disabled={isSubmitting}
        />
         </FormControl>

         <FormControl className={classes.formControl}>
       <TextField
       fullWidth
          type="text"
          id="foto"
          name="foto"
          label="foto"
          variant="filled"
          value={form.foto}
          color="secondary"
          size="large"
          onChange={handleChange}
          //required
          helperText={error.foto}
          error={error.foto?true:false}
          disabled={isSubmitting}
        />
        </FormControl>

        <FormControl className={classes.formControl}>
       <KeyboardDatePicker
          fullWidth
          margin="normal"
          id="date-picker-dialog"
          name="createdAt"
          label="createdAt"
          format="yyyy-MM-dd"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        //  onChange={handleChange}
          required
          helperText={error.createdAt}
          error={error.createdAt?true:false}
          disabled={isSubmitting}
        />
 </FormControl>

{/*   
        <TextField
          fullWidth
          type="text"
          id="createdBy"
          name="createdBy"
          label="createdBy"
          variant="filled"
          value={form.createdBy}
          color="secondary"
          size="medium"
          onChange={handleChange}
          required
          helperText={error.createdBy}
          error={error.createdBy?true:false}
          disabled={isSubmitting}
        /> */}
   {/* <FormControl className={classes.formControl}>
  <TextField
          fullWidth
          type="text"
          id="roles"
          name="roles"
          label="roles"
          variant="filled"
          value={form.roles}
          color="secondary"
          size="large"
          onChange={handleChange}
          required
          helperText={error.roles}
          error={error.roles?true:false}
          disabled={isSubmitting}
        />
</FormControl> */}
<FormControl className={classes.formControl}>
        <TextField
          fullWidth
          type="password"
          id="password"
          name="password"
          label="password"
          variant="filled"
          value={form.password}
          color="secondary"
          size="large"
          onChange={handleChange}
          //required
          helperText={error.password}
          error={error.password?true:false}
          disabled={isSubmitting}
        />
</FormControl>


<FormControl className={classes.formControl}>
<InputLabel id="demo-mutiple-chip-label">Roles</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={personName}
          onChange={handleChangeSelect}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
  
        </FormControl>


        <br></br>
         <Button variant="contained" color="secondary" onClick={handleSubmit} disabled={isSubmitting}>
            Save
          </Button>
  
      </form>
       </MuiPickersUtilsProvider>
    );
  }
  