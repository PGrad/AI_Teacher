import { Button } from "@mui/material";
import React from "react";

interface FunnyButtonProps {
    onClick: () => void;
}

export default function FunnyButton(props: React.PropsWithChildren<FunnyButtonProps>) {
    return (
        <Button sx={{ fontFamily: "Rubik Bubbles" }} variant="contained" onClick={props.onClick}>{props.children}</Button>
    );
}