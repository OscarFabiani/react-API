import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


//URL to JSON data for my github repos
const url = 'https://api.github.com/users/oscarfabiani/repos';

//URL to JSON data for 10 random users
const userURL = "https://randomuser.me/api/?results=10";


//A component that displays JSON data as an accordian.
class Accordian extends React.Component {
  state = {
    data: [],
    users: [],
    currentIndex: -1,
    isLoading: false,
    error: null
  }
  handleClick = (i) => {
    this.setState (prevState => {
      return {currentIndex: prevState.currentIndex === i ? -1 : i}
    })
  }
  componentDidMount() {
    this.setState({isLoading: true})
    fetch(url)
      .then(response => response.json())
      .then(response => {
        this.setState({
          data: response
        })
      })
    fetch(userURL)
      .then(response => {
        if (response.ok) {
          console.log(response);
          return response.json();
        } else {
          return;
        }
      })
      .then(response => {
        this.setState({
          users: response.results,
          isLoading: false
        })
      })
      .catch(error => {
        console.log(error);
        this.setState({error})
      })
  }
  render() {
    const {data, users, currentIndex, isLoading, error} = this.state;
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
    const userRenders = users.map((user, i) => {
      return (
        <Repo
          key={user.phone}
          index={i + 11}
          name={user.name.first + ' ' + user.name.last}
          desc={user.email}
          currentIndex={currentIndex}
          handleClick={this.handleClick}/>
      )
    })
    
    return (
      error ? <span>Something went wrong...{error.message}</span> :
      isLoading ? <span>Loading...</span> :
      <div>
        {repoRenders}
        {isLoading ? <li style={{backgroundColor: 'red'}}>Loading...</li> : userRenders}
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



//CONTINUE TO REVIEW TUTORIALS AND EXPERIMENT


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