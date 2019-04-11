import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


//URL to JSON data for my github repos
const url = 'https://api.github.com/users/oscarfabiani/repos';


//XHR (XMLHttpRequest) example
const request = new XMLHttpRequest();
request.open('GET', url, true);
request.onload = function() {
  // begin accessing JSON data here
  var data2 = JSON.parse(this.response);
  console.log('XHR:', data2[0].name, data2[0].created_at);
}
request.send()

//Fetch example
fetch(url)
  .then(result => result.json())
  .then(result => {
    console.log('Fetch:', result[0].full_name);
  })
  .catch(err => {
    console.log('error: ', err)
  })


//A component that displays JSON data as an accordian.
class Accordian extends React.Component {
  state = {
    data: [],
    currentIndex: -1
  }
  handleClick = (i) => {
    this.setState (prevState => {
      return {currentIndex: prevState.currentIndex === i ? -1 : i}
    })
  }
  componentDidMount() {
    fetch(url)
      .then(response => response.json())
      .then(response => {
        this.setState({
          data: response
        })
      })
  }
  render() {
    const {data, currentIndex} = this.state;
    const repoRenders = data.map((repo, i) => {
      return (
        <Repo
          key={repo.id}
          index={i}
          name={repo.name}
          desc={repo.description}
          currentIndex={currentIndex}
          handleClick={this.handleClick}/>
      )
    })
    return (
      <div>
        {repoRenders}
      </div>
    )
  }
}

class Repo extends React.Component {
  handleClick = () => {
    const {index, handleClick} = this.props;
    handleClick(index);
  }
  render() {
    const {index, name, desc, currentIndex} = this.props;
    let current = currentIndex === index;
    return (
      <ul className='holder'>
        <li className='question'onClick={this.handleClick}>{name}</li>
        {current && <li className={current ? 'answer open' : 'answer'}>{desc}</li>}
      </ul>
    )
  }
}


ReactDOM.render(
  <Accordian />,
  document.getElementById('root')
);