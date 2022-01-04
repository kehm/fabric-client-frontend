import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';
// Importing unstable_ to get rid of findDOMNode warnings in strict mode (fix in material-ui v5)

/**
 * Create Material UI theme
 */
const materialTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#60A5FA',
        },
        secondary: {
            main: '#000000',
        },
    },
});

export default materialTheme;
