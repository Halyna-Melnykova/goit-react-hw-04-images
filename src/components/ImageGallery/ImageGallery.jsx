import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { searchPhotos } from '../../api/gallary';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

import s from './ImageGallery.module.css';

const ImageGallery = ({ loadMore, searchQuery, page }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [image, setImage] = useState('');

  useEffect(() => {
    if (searchQuery !== '') {
      fetchPhotos();
    }

    async function fetchPhotos() {
      setLoading(true);
      try {
        const data = await searchPhotos(searchQuery, page);
        setItems([...data.hits]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery !== '' && page > 1) {
      fetchMorePhotos();
    }

    async function fetchMorePhotos() {
      setLoading(true);
      try {
        const data = await searchPhotos(searchQuery, page);

        setItems(items => [...items, ...data.hits]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const openModal = image => {
    setModalOpen(true);
    setImage(image);
  };

  const closeModal = () => {
    setModalOpen(false);
    setImage('');
  };

  const isPhotos = Boolean(items.length);

  return (
    <>
      <ul className={s.gallery}>
        {items.map(({ id, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            smallImage={webformatURL}
            largeImage={largeImageURL}
            onClick={openModal}
          />
        ))}
      </ul>
      {loading && <Loader />}
      {error && <p>Erorr</p>}
      {isPhotos && <Button onClick={loadMore} text="Load more" />}
      {modalOpen && <Modal close={closeModal}>{image}</Modal>}
    </>
  );
};

export default ImageGallery;

ImageGallery.defaultProps = {
  items: [],
};

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number,
  loadMore: PropTypes.func,
};
