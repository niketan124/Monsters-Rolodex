import { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import CardLIst from './components/card-list/card-list.componenet';
import SearchBox from './components/search-box/search-box.component';

class App extends Component {
constructor() {
  super();
  this.state = {
    monsters: [],
    searchField: ''
  };
  
}

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response)=> response.json())
    .then((users)=> this.setState(
      () => {
        return {
          monsters: users
        }
      }
    ))
  }

  onSearchChange = (event) => {
    const searchString = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return{
        searchField: searchString
      }
    })
  }

  render() {
    const {monsters, searchField} = this.state;
    const {onSearchChange} = this;
    const filterMonster = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    return (
      <div className="App">
          <h1 className='app-title'>Monsters Rolodex</h1>
          <SearchBox 
          onChangeHandler = {onSearchChange}
          className = "monsters-search-box"
          placeholder = "search monsters"
          />
          <CardLIst monsters = {filterMonster}/>
      </div>
    );
  }
  
}

export default App;