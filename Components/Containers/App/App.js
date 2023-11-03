import React from 'react';
import './App.css';
import SearchButton from '../../Presenters/SearchButton/SearchButton.js';
import Survey from '../../Presenters/Survey/Survey'
import { Petfinder } from '../../../Utils/Petfinder';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      possiblePets: [],
      type: '',
      size: '',
      gender: 'unknown',
      age: '',
      coat: '',
      status: 'adoptable',
      good_with_children: true,
      good_with_dogs: true,
      good_with_cats: true,
      house_trained: true,
      special_needs: true
    }
    this.getPets = this.getPets.bind(this);
  }

  getPets() {
    Petfinder.getPets().then(foundPets => {
      this.setState({ possiblePets: foundPets })
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Find you perfect fuzzy friend!</p>
          <Survey />
          <SearchButton onSearch={this.getPets}/>
        </header>
        <footer>
          <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </footer>
      </div>
    )
  }
}

export default App;