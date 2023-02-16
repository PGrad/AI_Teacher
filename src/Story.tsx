import { useEffect, useState } from 'react';
import Api from './api';
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
  let [storyHeading, setStoryHeading] = useState<string>("");
  let [storyText, setStoryText] = useState<string[]>([]);
  let [storyImg, setStoryImg] = useState<string>("");
  let [storyQuestions, setStoryQuestions] = useState<string[]>([]);
  let [showTest, setShowTest] = useState<boolean>(false);

  useEffect(() => {
    Api.getStoryText(`write me a story with a title in ${target} at a ${level} reading level and then make 4 questions in ${base} based on the story.`).then((data) => {
      let text = makeReadable(data.data.choices[0].text!);
      const questions = getQuestions(text.splice(text.length - 1)[0]);
      const title = text[1].split(":")[1];
      setStoryHeading(title);
      text = text.slice(2);
      text.splice(text.length - 1);
      setStoryText(text);
      setStoryQuestions(questions);
      Api.getStoryImage(text[1]).then((data) => {
        setStoryImg(data.data.data[0].url!);
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