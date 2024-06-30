import React, { useState } from "react";
import { ThemeProvider, createTheme, CssBaseline, Button } from "@mui/material";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Button onClick={() => setDarkMode(!darkMode)}>Toggle Theme</Button>
      {/* Add other components here */}
    </ThemeProvider>
  );
}

export default App;
