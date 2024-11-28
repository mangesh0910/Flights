import { createTheme } from "@mui/system";

export const theme = createTheme({
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    border: "none",// Removes the outline
                    ':focus': {
                        border: '2px solid blue'
                    }
                },
            },
        },
    },
});