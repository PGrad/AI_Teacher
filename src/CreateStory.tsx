import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateStory.css";
import { useLocalization } from "./LocalizationProvider";

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
    const local = useLocalization();
    const languages: string[] = local("msg-langs") as string[];
    const levels: string[] = local("msg-lvls") as string[];
    let [target, setTarget] = useState<string>(languages[0]);
    let [level, setLevel] = useState<string>(levels[0]);
    const navigate = useNavigate();
    const onSetTarget = (target: string) => {
        setTarget(target);
    };
    const onSetLevel = (lvl: string) => {
        setLevel(lvl);
    };
    const onSubmit = () => {
        navigate(`/story/${target}/${level}`);
    };
    return (
        <div className="createStory">
            <Dropdown onSetOption={onSetTarget} options={languages} label={"Language"}>{local("msg-choose-lang")}</Dropdown>
            <Dropdown onSetOption={onSetLevel} options={levels} label={"Level"}>{local("msg-choose-lvl")}</Dropdown>
            <Button variant="contained" onClick={onSubmit}>Create Story</Button>
        </div>
    );
}

export default CreateStory;