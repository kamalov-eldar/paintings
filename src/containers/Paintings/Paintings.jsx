import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import clsnm from 'classnames';

// import PropTypes from "prop-types";
import {
  Select, Range, Input, Pagination,
} from 'fwt-internship-uikit';

import PaintingsList from '../../components/Paintings/PaintingsList';

import {
  setCurrentPageAC,
  fetchAuthors,
  fetchPaintings,
  fetchLocations,
} from '../../store/paintings/actions';

import style from './Paintings.module.scss';

function Paintings() {
  const [author, setAuthor] = useState('Author');
  const [location, setLocation] = useState('Location');
  const [namePainting, setNamePainting] = useState('');
  const [createdFrom, setCreatedFrom] = useState('');
  const [createdBefore, setCreatedBefore] = useState('');

  const dispatch = useDispatch();

  // const state = useStore().getState();

  const storeData = useSelector((store) => ({
    authorsList: store.authorsList,
    locationsList: store.locationsList,
    paintingsList: store.paintingsList,
    countPages: store.countPages,
    currentPage: store.currentPage,
    themeIsDark: store.themeIsDark,
  }));

  useEffect(() => {
    const authorFinded = storeData.authorsList.find((item) => item.name === author);
    const locationFinded = storeData.locationsList.find((item) => item.name === location);
    dispatch(fetchPaintings(storeData.currentPage, {
      authorId: authorFinded?.id,
      locationId: locationFinded?.id,
      namePainting,
      createdFrom,
      createdBefore,
    }));
  }, [storeData.currentPage, author, location, namePainting, createdFrom,
    createdBefore, storeData.authorsList, storeData.locationsList, dispatch]);

  useEffect(() => {
    dispatch(fetchAuthors());
    dispatch(fetchLocations());
  }, [dispatch]);

  //  https://test-front.framework.team/paintings?_page=1&_limit=12

  // https://test-front.framework.team/paintings?_page=1&_limit=12&created_gte=1400&created_lte=1500

  const onNamePaintingChange = (e) => {
    setNamePainting(e.target.value);
  };

  return (
    <div>
      <div className={style.filters}>

        <div className={style.filterItem}>
          <Input
            value={namePainting}
            isDarkTheme={storeData.themeIsDark}
            type="text"
            placeholder="Name"
            onChange={onNamePaintingChange}
          />
        </div>
        <div className={style.filterItem}>
          <Select
            options={storeData.authorsList}
            isDarkTheme={storeData.themeIsDark}
            value={author}
            onChange={(authorName) => {
              setAuthor(authorName);
              dispatch(setCurrentPageAC(1));
            }}
          />
        </div>
        <div className={style.filterItem}>
          <Select
            options={storeData.locationsList}
            isDarkTheme={storeData.themeIsDark}
            value={location}
            onChange={(locationName) => {
              dispatch(setCurrentPageAC(1));
              setLocation(locationName);
            }}
          />
        </div>
        <div className={style.filterItem}>
          <Range
          /*  children="Name" */
            isDarkTheme={storeData.themeIsDark}
            placeholder="Name"
            onClose={() => {}}
          >
            <Input
              value={createdFrom}
              className={clsnm(style.input__created, {
                [style.input__created_dark]: storeData.themeIsDark,
              })}
              type="text"
              placeholder="from"
              onChange={(e) => setCreatedFrom(e.target.value)}
            />
            <span className={style.range__line}> </span>
            <Input
              value={createdBefore}
              className={clsnm(style.input__created, {
                [style.input__created_dark]: storeData.themeIsDark,
              })}
              type="text"
              placeholder="before"
              onChange={(e) => setCreatedBefore(e.target.value)}
            />
          </Range>
        </div>

      </div>
      <div className={style.container}>
        {storeData.paintingsList ? (
          <PaintingsList
            locationsList={storeData.locationsList}
            authorsList={storeData.authorsList}
            paintingsList={storeData.paintingsList ?? []} // ?? []
          />
        ) : null}
      </div>
      <Pagination
        className={style.pagination}
        isDarkTheme={storeData.themeIsDark}
        pagesAmount={storeData.countPages}
        currentPage={storeData.currentPage}
        onChange={(numberPage) => {
          dispatch(setCurrentPageAC(numberPage));
        }}
      />
    </div>
  );
}

/* Paintings.propTypes = {
  setErrorGetAPI: PropTypes.func,
}; */
// export default withErrorGetAPI(Paintings);
export default Paintings; // connect((state) => state)(Paintings); // Paintings;