import { Button, TextareaAutosize } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FunnyButton from "./FunnyButton";
import "./Test.css";

interface TestProps {
    questions: string[];
}

function Finish() {
    const navigate = useNavigate();
    const returnStart = () => {
        return navigate("/");
    };

    return (
        <div className="flush">
            <h3>Good job!</h3>
            <FunnyButton onClick={returnStart}>Return to Start</FunnyButton>
        </div>
    )
}

function Test(props: TestProps) {
    let [done, setDone] = useState(false);
    const onDone = () => {
        setDone(true);
    };
    return (
        <div className="flush test">
            <h3 className="heading">Test</h3>
            <ul style={{ listStyleType: "none", padding: 0 }}>
                {props.questions.map((q, idx) =>
                    <div key={idx} className="question">
                        <li>{`${q}?`}</li>
                        <TextareaAutosize minRows={3} />
                    </div>
                )}
            </ul>
            {done ? <Finish /> : <FunnyButton onClick={onDone}>Submit Answers</FunnyButton>}
        </div>
    );
}

export default Test;