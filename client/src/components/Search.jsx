import React from 'react';
import NameItem from './NameItem';
import IataItem from './IataItem';

const Search = (props) => (
  <div className="searchForm">
    <form>
      <NameItem />
      <IataItem />
    </form>
  </div>
);

export default Search;