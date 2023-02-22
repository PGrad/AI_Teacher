import "./StoryText.css";

interface StoryTextProps {
    paragraphs: string[];
}

function StoryText({ paragraphs }: StoryTextProps) {
    return (
        <>
            {paragraphs.map((pgraph, idx) => 
                <p key={idx} className="storyText">{pgraph}</p>
            )}
        </>
    );
}

export default StoryText;