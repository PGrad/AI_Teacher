import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateStory.css";

type OnSetOption = (option: string) => void;
interface DropdownProps {
    options: string[],
    label: string,
    onSetOption: OnSetOption;
}

function Dropdown(props: React.PropsWithChildren<DropdownProps>) {
    let [option, setOption] = useState<string>(props.options[0]);
    const handleChange = (e: SelectChangeEvent<string>) => {
        setOption(e.target.value);
        props.onSetOption(e.target.value);
    };
    return (
        <FormControl>
            <InputLabel>{props.children}</InputLabel>
                <Select
                    value={option}
                    label={props.label}
                    onChange={handleChange}
                    sx={{ width: "15em" }}
                >
                    {props.options.map((option, idx) => 
                        <MenuItem key={idx} value={option}>{option}</MenuItem>
                    )}
                </Select>
        </FormControl>
    );
}

function CreateStory() {
    const languages: string[] = ["English", "Spanish", "Portuguese"];
    const levels: string[] = ["Preschool", "High-school", "College"];
    let [lang, setLang] = useState<string>(languages[0]);
    let [level, setLevel] = useState<string>(levels[0]);
    const navigate = useNavigate();
    const onSetLanguage = (lang: string) => {
        setLang(lang);
    };
    const onSetLevel = (lvl: string) => {
        setLevel(lvl);
    };
    const onSubmit = () => {
        navigate(`/story/${lang}/${level}`);
    };
    return (
        <div className="createStory">
            <Dropdown onSetOption={onSetLanguage} options={languages} label={"Language"}>Choose Language:</Dropdown>
            <Dropdown onSetOption={onSetLevel} options={levels} label={"Level"}>Choose Level:</Dropdown>
            <Button variant="contained" onClick={onSubmit}>Create Story</Button>
        </div>
    );
}

export default CreateStory;