import { useEffect, useState } from 'react';
import Api from './api';
import './Story.css';
import ImageCard from './ImageCard';
import StoryText from './StoryText';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import Test from './Test';
import { useLangContext } from './LocalizationProvider';

function Loading() {
  const [dots, setDots] = useState<number>(0);
  useEffect(() => {
    setTimeout(() => {
      setDots((dots + 1) % 4);
    }, 500);
  }, [dots])
  const dotStr: string = ".".repeat(dots)
  return (
    <h1 className='loading'>Loading{dotStr}</h1>
  );
}

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
  let [storyText, setStoryText] = useState<string[]>([]);
  let [storyImg, setStoryImg] = useState<string>("");
  let [storyQuestions, setStoryQuestions] = useState<string[]>([]);
  let [showTest, setShowTest] = useState<boolean>(false);

  useEffect(() => {
    Api.getStoryText(`write me a story in ${target} at a ${level} reading level and then make 4 questions in ${base} based on the story.`).then((data) => {
      const text = makeReadable(data.data.choices[0].text!);
      const questions = getQuestions(text.splice(text.length - 1)[0]);
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
    storyImg ?
    <div className='story'>
      <ImageCard imgName={storyImg} />
      <StoryText paragraphs={storyText} />
      {showTest ? <Test questions={storyQuestions} /> : <Button variant="contained" onClick={onClick}>Take the Test</Button>}
    </div> : <Loading />
  );
}

export default Story;