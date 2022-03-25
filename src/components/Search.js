import React from "react";
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import '../App.css'


const searchClient = algoliasearch('K6HPFJ0TZW', '4bc7b77d4d05dea519949bd249d1f6a9');

const Search = () => {
    return(
        
        <div className="ais-InstantSearch">
            <InstantSearch searchClient={searchClient} indexName="posts">
                <SearchBox />
                <Hits />
            </InstantSearch>   
        </div>
          
    )
}

function Hit(props) {
    <div>
       <h2>{props.hit}</h2>
     
      
    </div>
}

Hit.propTypes = {
    hit: PropTypes.object.isRequired,
  };

export default Search