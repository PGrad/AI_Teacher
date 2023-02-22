import { useEffect, useState } from 'react';
import * as Api from './Api';
import './Story.css';
import ImageCard from './ImageCard';
import StoryText from './StoryText';
import { useParams } from 'react-router-dom';
import Test from './Test';
import { useLangContext } from './LocalizationProvider';
import FunnyButton from './FunnyButton';
import BlankImg from "./blank.jpg";

function makeReadable(text: string): string[] {
    return text.split("\n\n");
}

function getQuestions(sentence: string): string[] {
  const sents = sentence.split("?");
  sents.splice(sents.length - 1);
  sents[0] = sents[0].slice(sents[0].indexOf("1."))
  return sents;
}

function Story() {
  const { target, level } = useParams();
  const base = useLangContext();
  const [storyHeading, setStoryHeading] = useState<string>("");
  const [storyText, setStoryText] = useState<string[]>([]);
  const [storyImg, setStoryImg] = useState<string>("");
  const [storyQuestions, setStoryQuestions] = useState<string[]>([]);
  const [showTest, setShowTest] = useState<boolean>(false);

  useEffect(() => {
    Api.getStoryText(`write me a story with a title in ${target} at a ${level} reading level and then make 4 questions in ${base} based on the story.`).then((data) => {
      const text = data.data.choices[0].text;
      if (!text)
        throw Error("Couldn't generate text.");

      let readableText = makeReadable(text);
      const questions = getQuestions(readableText.splice(readableText.length - 1)[0]);
      const title = readableText[1].split(":")[1];
      setStoryHeading(title);
      readableText = readableText.slice(2);
      readableText.splice(readableText.length - 1);
      setStoryText(readableText);
      setStoryQuestions(questions);
      Api.getStoryImage(readableText[1]).then((data) => {
        const url = data.data.data[0].url;
        if (!url)
          throw Error("Couldn't generate image.");

        setStoryImg(url);
      });
    });
  }, [target, level, base]); // These should never change, but the linter wants them added to the dependencies.

  const onClick = () => {
    setShowTest(true);
  };

  return (
    <div className={`story ${storyImg ? "paused" : ""}`}>
      <section className='story-text'>
        <h1 style={{ textAlign: "center" }}>{storyHeading}</h1>
        <StoryText paragraphs={storyText} />
      </section>
      { storyImg ? (
        <section className='story-test'>
          {showTest ?
            <Test questions={storyQuestions} /> :
            <FunnyButton onClick={onClick}>Take the Test</FunnyButton>
          }
        </section>): ""
      }
      <div className='img'>
        <div className='img-card'>
          <ImageCard imgName={storyImg ? storyImg : BlankImg} />
        </div>
      </div>
    </div>
  );
}

export default Story;