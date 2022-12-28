import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateStory.css";
import FunnyButton from "./FunnyButton";
import { useGlobal, useLocalization } from "./LocalizationProvider";

type OnSetOption = (option: number) => void;
interface DropdownProps {
    options: string[],
    label: string,
    onSetOption: OnSetOption;
}

function Dropdown(props: React.PropsWithChildren<DropdownProps>) {
    let [option, setOption] = useState<number>(0);
    const handleChange = (e: SelectChangeEvent<number>) => {
        setOption(e.target.value as number);
        props.onSetOption(e.target.value as number);
    };
    return (
        <FormControl>
            <InputLabel sx={{ fontFamily: "Rubik Bubbles" }}>{props.children}</InputLabel>
                <Select
                    value={option}
                    label={props.label}
                    onChange={handleChange}
                    sx={{ width: "15em" }}
                >
                    {props.options.map((option, idx) => 
                        <MenuItem key={idx} value={idx}>{option}</MenuItem>
                    )}
                </Select>
        </FormControl>
    );
}

function CreateStory() {
    const global = useGlobal();
    const local = useLocalization();
    const languagesGlobal: string[] = global("msg-langs") as string[];
    const levelsGlobal: string[] = global("msg-lvls") as string[];
    const languagesLocal: string[] = local("msg-langs") as string[];
    const levelsLocal: string[] = local("msg-lvls") as string[];
    let [target, setTarget] = useState<string>(languagesGlobal[0]);
    let [level, setLevel] = useState<string>(levelsGlobal[0]);
    const navigate = useNavigate();
    const onSetTarget = (targetIdx: number) => {
        setTarget(languagesGlobal[targetIdx]);
    };
    const onSetLevel = (lvlIdx: number) => {
        setLevel(levelsGlobal[lvlIdx]);
    };
    const onSubmit = () => {
        navigate(`/story/${target}/${level}`);
    };
    return (
        <div className="createStory">
            <h2>{local("msg-create-story")}</h2>
            <Dropdown onSetOption={onSetTarget} options={languagesLocal} label={"Language"}>{local("msg-choose-lang")}</Dropdown>
            <Dropdown onSetOption={onSetLevel} options={levelsLocal} label={"Level"}>{local("msg-choose-lvl")}</Dropdown>
            <FunnyButton onClick={onSubmit}>Create Story</FunnyButton>
        </div>
    );
}

export default CreateStory;