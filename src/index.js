import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import CommentFeed from './containers/CommentFeed'

const comments = [
  {
    author: 'Ian Wilson',
    text: 'A boats a boat but a mystery box could be anything.',
  },
  {
    author: 'Max Powers Jr',
    text: 'Krypton sucks.',
  },
  {
    author: 'Kent Beck',
    text: 'Red, Green, Refactor.',
  },
]

ReactDOM.render(
  <CommentFeed comments={comments} />,
  document.getElementById('root')
)

registerServiceWorker();
