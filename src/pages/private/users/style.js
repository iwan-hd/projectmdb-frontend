import { makeStyles , useTheme} from '@material-ui/core/styles';
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
        minWidth: 320,
        maxWidth: 500,
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
      },
      chips: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      chip: {
        margin: 2,
      },
      noLabel: {
        marginTop: theme.spacing(3),
      },
    },
  }));
