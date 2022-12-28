import "./ImageCard.css";

interface ImageProps {
    imgName: string;
}

function ImageCard(props: ImageProps) {
    return (<img className="storyImg" src={props.imgName} />);
}

export default ImageCard;