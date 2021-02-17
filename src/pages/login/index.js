import React from 'react'
import useStyles from './style.js';

//material ui 
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typograpy from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

export default function Login() {

    const classes = useStyles();
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

            <form >

                <TextField
                    id="loginId"
                    type="text"
                    name="loginId"
                    margin="normal"
                    label="Username"
                    fullWidth
                    required

                />

                <TextField
                    id="password"
                    type="password"
                    name="password"
                    margin="normal"
                    label="Password"
                    fullWidth
                    required
                    
                />

                <div  className={classes.buttonStyle}>
                <Button
                        type="submit"
                        color="primary"
                        variant ="contained"
                        size="large"
                       

                    >
                        Login
                    </Button>
                   


                </div>
                  
            </form>
             
        </Paper>
           
        </Container>
    
}
