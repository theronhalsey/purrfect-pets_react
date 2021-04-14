import React from 'react';
import './App.css';
import SearchButton from '../../Presenters/SearchButton/SearchButton.js';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Find you perfect fuzzy friend!</p>
          <SearchButton />
        </header>
        <footer>
          <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </footer>
      </div>
    )
  }
}

export default App;
