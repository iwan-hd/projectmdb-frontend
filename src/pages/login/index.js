import React , {useState} from 'react';
import useStyles from './style.js';

//material ui 
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typograpy from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import {Link,Redirect} from 'react-router-dom';
import AuthService from '../../config/api/auth';


export default function Login(props) {

    const classes = useStyles();
    const {location}= props;

    const [form, setForm] = useState({
        username : '',
        password : ''
    });

    const [error, setError] = useState({
        username : '',
        password : ''
    });    


    const [submitting, setSubmitting] = useState(false);

    const [message,setMessage] = useState("");


    const validate = () => {
        const newError = {...error};
    
    //console.log(form.username.length);
        if (!form.username){
            newError.username = "Username harus di isi !";
                 } else if(form.username.length < 3) {
            newError.username = "UserName minimal 3 Character";
         }
 
        if (!form.password){
        newError.password = "Password harus di isi !";
        } 
        else if(form.password.length < 6) {
        newError.password = "Password minimal 6 Character";
        }

    return newError;
  };
    
    const handleChange = e => {
    
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });

        setError({
            ...error,
            [e.target.name] : ''

        })
    }

    const handleSubmit =  e=>{
        e.preventDefault();
        const findErrors = validate();

        if (Object.values(findErrors).some( err => err != '')) {
            setError(findErrors);
        } else {
            
            // try {
                
                setSubmitting(true);
                AuthService.login(form.username,form.password)
                .then(() => {
                    props.history.push('/');
                    window.location.reload();  // supaya prg awal bisa ambil data yg di localstorage spt password dan user yg login

                },
                (error) => {
                    const newError = (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                      error.message || 
                      error.toString();
                    
                      setMessage(newError.error);
                      setError(newError);
                      setSubmitting(false);
                }
                );
                
        }

        
    }

    return <Container maxWidth="xs">
        <Paper className={classes.paper}>
            <Typograpy
            component="h1"
            variant="h5"
            className={classes.title, classes.blue}
            >
            <VpnKeyIcon className={classes.iconRight} />
                Halaman Login
            </Typograpy>

            {message && (
            alert({message})
            
          )}
            <form  onSubmit={handleSubmit} noValidate>

                <TextField
                    id="username"
                    type="text"
                    name="username"
                    margin="normal"
                    label="Username"
                    fullWidth
                    required
                    value={form.username}
                    onChange={handleChange}
                    helperText={error.username}
                    error={error.username?true:false}
                    disabled={submitting}
                    
                />

                <TextField
                    id="password"
                    type="password"
                    name="password"
                    margin="normal"
                    label="Password"
                    fullWidth
                    required
                    value={form.password}
                    onChange={handleChange}
                    helperText={error.password}
                    error={error.password?true:false}
                    disabled={submitting}

                    
                />

                <div  className={classes.buttonStyle}>
                <Button
                        type="submit"
                        color="primary"
                        variant ="contained"
                        size="large"
                        disabled={submitting}


                    >
                        Login
                </Button>
                   


                </div>
                  
            </form>
             
        </Paper>
           
        </Container>
    
}

