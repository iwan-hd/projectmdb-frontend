import React from 'react'
import useStyles from './style.js';

//material ui
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

//react-router-dom
import { Link } from "react-router-dom";

export default function NotFound() {

    const classes = useStyles();

    return <Container maxWidth="xs">
        <Paper className={classes.paperCss}>
            <Typography variant="subtitle1">
                Halaman Tidak Ditemukan
            </Typography>
            <Typography variant="h3">
                404
            </Typography>
            <Typography  component={Link} to="/">
                Kembali Ke Beranda
            </Typography>
        </Paper>
    </Container>
}
