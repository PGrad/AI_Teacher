import { useState } from "react";
import Api from "./api";

interface TestProps {
    questions: string[];
}

function Test(props: TestProps) {
    return (
        <div>
            <h3>Test</h3>
            <ul style={{ listStyleType: "none" }}>
                {props.questions.map((q, idx) =>
                    <div key={idx}>
                        <li>{`${q}?`}</li>
                        <textarea />
                    </div>
                )}
            </ul>
        </div>
    );
}

export default Test;