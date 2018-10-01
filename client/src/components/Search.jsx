import React from 'react';
import NameItem from './NameItem';
import IataItem from './IataItem';

const Search = (props) => (
  <div className="searchForm">
    <form>
      <NameItem />
      <div className="text-muted">
        <p>or</p>
        <p></p>
      </div>
      <IataItem />
    </form>
  </div>
);

export default Search;