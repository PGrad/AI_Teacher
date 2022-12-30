import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import CreateStory from './CreateStory';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import Story from './Story';
import Api from './api';
import { LocalizationProvider } from './LocalizationProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

Api.init();
root.render(
  <LocalizationProvider lang={navigator.language.split("-")[0]}>
    <HashRouter basename='/'>
      <Routes>
        <Route path="/" element={<CreateStory />} />
        <Route path="/story/:target/:level" element={<Story />} />
      </Routes>
    </HashRouter>
  </LocalizationProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
