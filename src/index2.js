import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
  state = {
    data: [],
  }

  // Code is invoked after the component is mounted/inserted into the DOM tree.
  componentDidMount() {
    const url =
      'https://en.wikipedia.org/w/api.php?action=opensearch&search=Seona+Dancing&format=json&origin=*'

    fetch(url)
      .then(result => result.json())
      .then(result => {
        this.setState({
          data: result,
        })
      })
  }

  render() {
    const { data } = this.state

    const result = data.map((entry, index) => {
      return <li key={index}>{entry}</li>
    })

    return <ul>{result}</ul>
  }
}

const qa = [
  {
    question: "What is react?",
    answer:
      "React is a JavaScript library used to build views which are mainly concentrated on the view part in the MVC model."
  },
  {
    question: "What is JSX ?",
    answer:
      "JSX is JavaScript XML which is used inside the react to write the HTML like syntax inside the javascript it’s just a preprocessor. The jsx we write later converts into the JavaScript with the help of babel."
  },
  {
    question: "What is Nodejs  ?",
    answer:
      "Nodejs is a backend JavaScript framework built on top of v8 JavaScript engine. By using node js you can be built any kind of backend stuff."
  },
  {
    question: "What is npm ?",
    answer:
      "npm is a node package manager which is used to install the libraries created by the other people. By using npm you can install or uninstall packages at any point in time."
  },
  {
    question: "What is react ?",
    answer: "A JavaScript library for building user interfaces"
  }
];

class Accordian extends React.Component {
  state = {
    currentIndex: -1
  }
  handleClick = (i) => {
    this.setState (prevState => {
      return {currentIndex: prevState.currentIndex === i ? -1 : i}
    })
  }
  render() {
    const {currentIndex} = this.state;
    const qaRenders = qa.map((qa, i) => {
      return (
        <QaPair
          key={qa.question}
          index={i}
          question={qa.question}
          answer={qa.answer}
          currentIndex={currentIndex}
          handleClick={this.handleClick}/>
      )
    })
    return (
      <div>
        {qaRenders}
      </div>
    )
  }
}

class QaPair extends React.Component {
  handleClick = () => {
    const {index, handleClick} = this.props;
    handleClick(index);
  }
  render() {
    const {index, question, answer, currentIndex} = this.props;
    return (
      <ul>
        <li onClick={this.handleClick}>{question}</li>
        {index === currentIndex && <li>{answer}</li>}
      </ul>
    )
  }
}


ReactDOM.render(
  <Accordian />,
  document.getElementById('root')
);