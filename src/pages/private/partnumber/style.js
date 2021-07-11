import { makeStyles } from '@material-ui/core/styles';
import theme from "../../../config/theme/theme";

export const useStyles = makeStyles(theme => ({
    table: {
      minWidth: 650,
      padding  : theme.spacing(1),
      marginTop : theme.spacing(2)
    },
    form: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));


