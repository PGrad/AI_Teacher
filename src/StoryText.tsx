import "./StoryText.css";

interface StoryTextProps {
    paragraphs: string[];
}

function StoryText(props: StoryTextProps) {
    return (
        <div>
            {props.paragraphs.map((pgraph, idx) => 
                <p key={idx} className="storyText">{pgraph}</p>
            )}
        </div>
    );
}

export default StoryText;