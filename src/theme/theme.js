import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    "breakpoints": {
        "values": {
            "xs": 0,
            "sm": 600,
            "md": 960,
            "lg": 1280,
            "xl": 1920
        }
    },
    "palette": {
        "type": "light",
        "background": {
            "default": "#fafafa",
            "paper": "#fff"
        },
        "divider": "rgba(0, 0, 0, 0.12)",
        "text": {
            "primary": "rgba(0, 0, 0, 0.87)",
            "secondary": "rgba(0, 0, 0, 0.54)",
            "disabled": "rgba(0, 0, 0, 0.38)"
        },
        "action": {
            "active": "rgba(0, 0, 0, 0.54)",
            "hover": "rgba(0, 0, 0, 0.04)",
            "selected": "rgba(0, 0, 0, 0.08)",
            "disabled": "rgba(0, 0, 0, 0.26)",
            "disabledBackground": "rgba(0, 0, 0, 0.12)"
        }
    }
});

export default theme;

