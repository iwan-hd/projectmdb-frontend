import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles( theme => ({

    blue : {
         color : theme.palette.primary.main
    },
    paper :{
         marginTop : theme.spacing(8),
         padding : theme.spacing(6),
         textAlign:"center",
    },
    title : {
        marginBottom : theme.spacing(6)
    },
    buttonStyle : {
        marginTop :  theme.spacing(6),
     
    },
    iconRight  : {
        marginRight: theme.spacing(1)
    }
}));


export default useStyles;