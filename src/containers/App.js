import React, { Component } from 'react';
import CardList from '../components/CardList';
import Searchbox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';


class App extends Component {
  constructor() {
    super()
    this.state = {
      robots: [],
      searchField: ''
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ robots: users }));
  }

  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value })
  }

  render() {
    const { robots, searchField } = this.state;
    const filteredRobots = robots.filter(robots => {
      return robots.name.toLowerCase().includes(searchField.toLowerCase());
    })
    return (
      <div className='tc'>
        <h1 className='f2'>Robofriends</h1>
        <Searchbox searchChange={this.onSearchChange} />
        <Scroll>
          <CardList robots={filteredRobots} />
        </Scroll>
      </div>
    );
  }
}

export default App;