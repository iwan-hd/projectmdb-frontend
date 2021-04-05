import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles( theme => ({

    blue : {
         color : theme.palette.primary.main
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding:theme.spacing(2),
      },
    title : {
        marginBottom : theme.spacing(6)
    },
    buttonStyle : {
        marginTop :  theme.spacing(6),
     
    },
    iconRight  : {
        marginRight: theme.spacing(1)
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
        alignItems:"center"
      },
}));


export default useStyles;