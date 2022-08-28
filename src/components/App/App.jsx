import { useState } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';

import s from './App.module.css';

const App = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const onSearch = search => {
    setSearch(search);
    setPage(1);
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  return (
    <div className={s.app}>
      <Searchbar onSubmit={onSearch} />
      <ImageGallery searchQuery={search} page={page} loadMore={loadMore} />
    </div>
  );
};

export default App;
