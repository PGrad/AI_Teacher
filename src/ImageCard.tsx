import "./ImageCard.css";

interface ImageProps {
    imgName: string;
}

function ImageCard(props: ImageProps) {
    return (
        <div className="imageCard">
            <img className="storyImg" src={props.imgName} alt={"you're missing out!"} />
        </div>
    );
}

export default ImageCard;