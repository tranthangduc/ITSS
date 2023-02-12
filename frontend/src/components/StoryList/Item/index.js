import Speaker from 'components/UI/Speaker';
import WordFavorite from 'components/UI/WordFavorite';
import { DEFAULTS } from 'constant';
import { cloudinaryImgOptimize } from 'helper';
import PropTypes from 'prop-types';
import React from 'react';
import useStyle from './style';
import { ROUTES } from 'constant';
import { Link } from 'react-router-dom';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import storyApi from 'apis/storyApi';

/* function DynoDictionaryItem({
  word,
  type,
  phonetic,
  picture,
  mean,
  onShowDetail,
}) */
function DynoDictionaryItem({ name, description, picture, _id, onReloadData }) {
  const [isDelete, setDelete] = useState(false);
  const classes = useStyle();
  const [showPopupDelete, setShowDelete] = useState(false);
  // const imgSrc = cloudinaryImgOptimize(
  //   picture ? picture : DEFAULTS.IMAGE_SRC,
  //   50,
  //   50,
  //   true,
  //   true,
  // );

  const handleHoverStoryItem = () => {
    setDelete(true)
  }

  const handleLeaveStoryItem = () => {
    setDelete(false)
  }

  const showConfirmDelete = () => {
    setShowDelete(true);
  }

  const handleClose = () => {
    setShowDelete(false);
  }
  const handleConfirmDelete = async (id) =>{
    await storyApi.deleteStoryById(id);
    onReloadData();
    setShowDelete(false);
  }

  return (
    <>
      <div
        className={`${classes.root} flex-center-between`}
        onMouseEnter={handleHoverStoryItem}
        onMouseLeave={handleLeaveStoryItem}
      >
        <div
          className="w-100 flex-center--ver"
        /* onClick={() => onShowDetail(word)} */
        >
          <Link to={`${ROUTES.STORY}/${_id}`}>
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
        {
          isDelete &&
          <div onClick={showConfirmDelete}>
            <DeleteForeverIcon color='action' />
          </div>
        }
      </div>
      {
        showPopupDelete &&
        <div>
          <Dialog
            open={showPopupDelete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Confirm delete story"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this story? If you agree, please click Agree or otherwise click Cancel
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={() => handleConfirmDelete(_id)} color="primary" autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      }
    </>
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
  onShowDetail: function () { },
};

export default DynoDictionaryItem;
