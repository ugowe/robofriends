import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSearchField, getRequestRobots } from '../actions';

import CardList from '../components/CardList';
import Searchbox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';


// Tell me what state I need to listen to and send it down as 'props'
// parameter state comes from index.js provider store state(rootReducers)
const mapStateToProps = (state) => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
}

// Tell me what props are actions, that need to get dispatched
// The dispatch is what triggers the action
const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(getRequestRobots())
  }
}

class App extends Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     robots: []
  //   }
  // }

  componentDidMount() {
    this.props.onRequestRobots();
    // fetch('https://jsonplaceholder.typicode.com/users')
    //   .then(response => response.json())
    //   .then(users => this.setState({ robots: users }));
  }

  // onSearchChange = (event) => {
  //   this.setState({ searchField: event.target.value })
  // }

  render() {
    // const { robots } = this.state;
    const { searchField, onSearchChange, robots, isPending } = this.props;
    const filteredRobots = robots.filter(robots => {
      return robots.name.toLowerCase().includes(searchField.toLowerCase());
    })
    return isPending ?
    <h1>Loading</h1> :
    (
      <div className='tc'>
        <h1 className='f2'>Robofriends</h1>
        <Searchbox searchChange={onSearchChange} />
        <Scroll>
          <CardList robots={filteredRobots} />
        </Scroll>
      </div>
    );
  }
}

// We just told this container to subscribe to any state changes in the Redux store
// Now we need to tell it what to listen to, e.g. what state & what dispatch(action) should I listen to
export default connect(mapStateToProps, mapDispatchToProps)(App);