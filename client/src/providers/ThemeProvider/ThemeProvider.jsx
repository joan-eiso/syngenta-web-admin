import { ThemeProvider as JSSThemeProvider } from "react-jss";

import theme from "./theme";

const ThemeProvider = ( { children } ) => {
  return (
    <JSSThemeProvider theme={theme}>{children}</JSSThemeProvider>
  )
}

export default ThemeProvider;
