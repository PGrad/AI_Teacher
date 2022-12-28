import { useEffect, useState } from 'react';
import Api from './api';
import './Story.css';
import ImageCard from './ImageCard';
import StoryText from './StoryText';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import Test from './Test';

function makeReadable(text: string): string[] {
    return text.split("\n\n");
}

function getQuestions(sents: string[]): string[] {
  const qs: string[] = [];
  for (const s in sents) {
    const i = s.search(/[0-9][.]|[0-9][:]/);
    console.log(i);
    const j = s.indexOf("?");
    qs.push(s.substring(i, j + 1));
  }
  return qs;
}

function Story() {
  const { lang, level } = useParams();
  let [storyText, setStoryText] = useState<string[]>([]);
  let [storyImg, setStoryImg] = useState<string>("");
  let [storyQuestions, setStoryQuestions] = useState<string[]>([]);
  let [showTest, setShowTest] = useState<boolean>(false);

  useEffect(() => {
    Api.getStoryText(`write me a story in ${lang} at a ${level} reading level and then make four numbered questions in English based on the story as well as 4 numbered answers to the questions.`).then((data) => {
      const text = makeReadable(data.data.choices[0].text!);
      const questions = getQuestions(text.splice(text.length - 2));
      text.splice(text.length - 1);
      setStoryText(text);
      setStoryQuestions(questions);
      Api.getStoryImage(text[1]).then((data) => {
        setStoryImg(data.data.data[0].url!);
      });
    });
  }, []);

  const onClick = () => {
    setShowTest(true);
  };

  return (
    storyImg ?
    <div className='app'>
      <ImageCard imgName={storyImg} />
      <StoryText paragraphs={storyText} />
      {showTest ? <Test questions={storyQuestions} /> : <Button variant="contained" onClick={onClick}>Take the Test</Button>}
    </div> : <h1>Loading...</h1>
  );
}

export default Story;