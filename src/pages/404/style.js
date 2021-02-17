import { makeStyles } from "@material-ui/styles";
import theme from "../../config/theme/theme";

const useStyles = makeStyles(theme => ({

    paperCss : {
        marginTop  :theme.spacing(8),
        padding  :theme.spacing(6),
        textAlign :"center"
    }

}));


export default useStyles;