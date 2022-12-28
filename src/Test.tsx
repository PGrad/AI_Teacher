import { Button, TextareaAutosize } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
            <Button variant="contained" onClick={returnStart}>Return to Start</Button>
        </div>
    )
}

function Test(props: TestProps) {
    let [done, setDone] = useState(false);
    const onDone = () => {
        setDone(true);
    };
    return (
        <div className="flush">
            <h3 className="heading">Test</h3>
            <ul style={{ listStyleType: "none", padding: 0 }}>
                {props.questions.map((q, idx) =>
                    <div key={idx}>
                        <li>{`${q}?`}</li>
                        <TextareaAutosize style={{ width: "400px" }} minRows={3} />
                    </div>
                )}
            </ul>
            {done ? <Finish /> : <Button variant="contained" onClick={onDone}>Submit Answers</Button>}
        </div>
    );
}

export default Test;