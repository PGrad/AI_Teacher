import { Button } from "@mui/material";
import React from "react";

interface FunnyButtonProps {
    onClick: () => void;
}

export default function FunnyButton({ onClick, children }: React.PropsWithChildren<FunnyButtonProps>) {
    return (
        <Button
            sx={{
                fontFamily: "Rubik Bubbles",
                fontSize: "1.5em",
                borderRadius: "1em",
                padding: ".5em 1em",
                backgroundColor: "teal",
                color: "white"
            }}
            variant="contained"
            onClick={onClick}
        >
            {children}
        </Button>
    );
}