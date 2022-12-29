import "./ImageCard.css";

interface ImageProps {
    imgName: string;
}

function ImageCard(props: ImageProps) {
    return (<img className="storyImg" src={props.imgName} alt={"you're missing out!"} />);
}

export default ImageCard;