import "./ImageCard.css";

interface ImageProps {
    imgName: string;
}

function ImageCard({ imgName }: ImageProps) {
    return (
        <div className="imageCard">
            <img className="storyImg" src={imgName} alt={"you're missing out!"} />
        </div>
    );
}

export default ImageCard;