import Speaker from 'components/UI/Speaker';
import WordFavorite from 'components/UI/WordFavorite';
import { DEFAULTS } from 'constant';
import { cloudinaryImgOptimize } from 'helper';
import PropTypes from 'prop-types';
import React from 'react';
import useStyle from './style';
import { ROUTES } from 'constant';
import { Link } from 'react-router-dom';

/* function DynoDictionaryItem({
  word,
  type,
  phonetic,
  picture,
  mean,
  onShowDetail,
}) */
function DynoDictionaryItem({ name, description, picture }) {
  const classes = useStyle();
  // const imgSrc = cloudinaryImgOptimize(
  //   picture ? picture : DEFAULTS.IMAGE_SRC,
  //   50,
  //   50,
  //   true,
  //   true,
  // );

  return (
    <div className={`${classes.root} flex-center-between`}>
      <div
        className="w-100 flex-center--ver"
        /* onClick={() => onShowDetail(word)} */
      >
        <Link to={ROUTES.STORY}>
          <div className={classes.wrapper_item}>
            <img className={classes.picture} src={picture} alt="photo" />
            <div className="ml-8 flex-grow-1">
              <h3 className={classes.name}>{name} </h3>
              {Boolean(description) && (
                <span className={classes.description}> {description} </span>
              )}
              {/* {Boolean(phonetic) && (
              <p className={`${classes.phonetic} phonetic`}>/ {phonetic} /</p>
            )}
            <p className={classes.mean}>{mean}</p> */}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

DynoDictionaryItem.propTypes = {
  mean: PropTypes.string,
  onShowDetail: PropTypes.func,
  phonetic: PropTypes.string,
  picture: PropTypes.string,
  type: PropTypes.string,
  word: PropTypes.string,
};

DynoDictionaryItem.defaultProps = {
  onShowDetail: function () {},
};

export default DynoDictionaryItem;
