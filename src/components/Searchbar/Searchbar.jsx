import { useState } from 'react';
import PropTypes from 'prop-types';

import s from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleChange = event => {
    const { value } = event.currentTarget;
    setSearch(value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (search === '') {
      alert(`enter word for search`);
      return;
    }
    onSubmit(search);
    reset();
  };

  function reset() {
    setSearch('');
  }

  return (
    <header className={s.searchbar}>
      <form onSubmit={handleSubmit} className={s.form}>
        <button type="submit" className={s.button}>
          <span className={s.buttonLabel}>Search</span>
        </button>

        <input
          name="search"
          value={search}
          onChange={handleChange}
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

Searchbar.defaultProps = {
  onSubmit: () => {},
};
