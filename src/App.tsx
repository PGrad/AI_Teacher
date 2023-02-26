import { createTheme, Theme, ThemeProvider, useMediaQuery } from "@mui/material";
import { useEffect, useMemo } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import * as Api from "./Api";
import CreateStory from "./CreateStory";
import { LocalizationProvider } from "./LocalizationProvider";
import Story from "./Story";
import { Helmet } from 'react-helmet';

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
        <>
            <Helmet>
                <title>AI Teacher</title>
                <meta
                name="description"
                content="Learn languages with AI!"
                />

                <meta property="og:type" content="website" />
                <meta property="og:title" content="AI Language Teacher" />
                <meta property="og:description" content="Learn languages with AI!"/>
                <meta property="og:url" content="https://pgrad.github.io/AI_Teacher/" />
                <meta property="og:image" content={`${process.env.PUBLIC_URL}/Thumbnail.png`} />

                <meta name="twitter:card" content="summary_large_image"/>
                <meta property="twitter:domain" content="pgrad.github.io"/>
                <meta property="twitter:url" content="https://pgrad.github.io/AI_Teacher/"/>
                <meta name="twitter:title" content="AI Language Teacher"/>
                <meta name="twitter:description" content="Learn languages with AI!"/>
                <meta name="twitter:image" content={`${process.env.PUBLIC_URL}/Thumbnail.png`} />
            </Helmet>
            <ThemeProvider theme={theme}>
                <LocalizationProvider lang={navigator.language.split("-")[0]}>
                    <HashRouter basename='/'>
                        <main>
                            <Routes>
                                <Route path="/" element={<CreateStory />} />
                                <Route path="/story/:target/:level" element={<Story />} />
                            </Routes>
                        </main>
                    </HashRouter>
                </LocalizationProvider>
            </ThemeProvider>
        </>
    );
}