import React from 'react';
import './SearchButton.css';

class SearchButton extends React.Component {
    render() {
        return (
            <div className='search'>
                <button className='searchButton'>Find your Purrfect Pet!</button>
            </div>
        )
    }
};

export default SearchButton;