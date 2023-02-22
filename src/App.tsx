import { createTheme, Theme, ThemeProvider, useMediaQuery } from "@mui/material";
import { useEffect, useMemo } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import * as Api from "./Api";
import CreateStory from "./CreateStory";
import { LocalizationProvider } from "./LocalizationProvider";
import Story from "./Story";

export default function App() {
    const prefersDarkMode: boolean = useMediaQuery('(prefers-color-scheme: dark)');

    const theme: Theme = useMemo(() =>
        createTheme({
            palette: {
                mode: prefersDarkMode ? "dark" : "light"
            }
        }),
        [prefersDarkMode]
    );

    useEffect(() => {
        Api.init();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider lang={navigator.language.split("-")[0]}>
                <HashRouter basename='/'>
                    <Routes>
                        <Route path="/" element={<CreateStory />} />
                        <Route path="/story/:target/:level" element={<Story />} />
                    </Routes>
                </HashRouter>
            </LocalizationProvider>
        </ThemeProvider>
    );
}