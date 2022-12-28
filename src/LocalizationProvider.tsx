import React, { useContext } from "react";
import langJson from "./i8n.json";

function zip<T>(a: T[], b: T[]): [T, T][] {
    const zipped: [T, T][] = [];
    for (let i = 0; i < a.length; ++i) {
        zipped.push([a[i], b[i]])
    }
    return zipped;
}

type AcceptedLang = keyof typeof langJson;

// Surprisingly elegant typing!
export function useLocalization() {
    const lang = useContext(LocalContext);
    const strings = langJson[lang as AcceptedLang];
    
    return (key: keyof typeof strings) => {
        return strings[key];
    }
}

export function useGlobal() {
    const strings = langJson["en"];
    
    return (key: keyof typeof strings) => {
        return strings[key];
    }
}

function isAcceptedLang(lang: string): lang is AcceptedLang {
    switch (lang) {
        case "en":
        case "es":
        case "pt":
            return true;
        default:
            return false;
    }
}

const LocalContext = React.createContext("en");

export function useLangContext() {
    const lang = useContext(LocalContext);
    return lang;
}

interface LocalProps {
    lang: string
}

export function LocalizationProvider(props: React.PropsWithChildren<LocalProps>) {
    // default to this if browser language is unknown.
    let lang: AcceptedLang = "en";
    if (isAcceptedLang(props.lang)) {
        lang = props.lang;
    }

    return (
        <LocalContext.Provider value={lang}>
            {props.children}
        </LocalContext.Provider>
    );
}