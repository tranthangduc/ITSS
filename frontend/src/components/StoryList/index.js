import LoopIcon from '@material-ui/icons/Loop';
import ArrowBack from '@material-ui/icons/ArrowBack';
import StorySearchInput from 'components/UI/StorySearchInput';
import InfiniteScroll from 'components/UI/InfiniteScroll';
import WordSortModal from 'components/UI/WordSortModal';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import DynoDictionaryItemData from './Item/data';
import DDSettingWordPack from './SettingWordPack';
import StoryListSkeleton from './Skeleton';
import useStyle from './style';
import { useHistory } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import storyApi from 'apis/storyApi';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import { useEffect } from 'react';

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

function StoryList({
  list,
  loading,
  onLoadData,
  more,
  isFirstLoad,
  onSettingWordPack,
  onSortTypeChange,
  onSearchWord,
  isTOEIC,
  onReload
}) {
  const classes = useStyle();
  const history = useHistory();
  const handleBack = () => {
    history.goBack();
  };

  const [showCreatStory, setShowCreate] = useState(false);

  const createStory = () => {
    setShowCreate(true);
  }

  const hideModal = () => {
    setShowCreate(false)
    onReload();
  }

  return (
    <div className={`${classes.root} dyno-container`}>
      {/* title - menu */}
      <div className="flex-center-between">
        <div style={{ cursor: 'pointer' }} onClick={handleBack}>
          <ArrowBack />
        </div>
        <h1 style={{ marginRight: "80px" }} className="dyno-title">Danh sách truyện</h1>
        <Button onClick={createStory} color="lightBlue" className="_btn _btn-stand">Tạo truyện mới</Button>
        <div>
          <WordSortModal
            onSelect={onSortTypeChange}
            classNameIcon="dyno-setting-icon mr-5"
          />
          {/* {!isTOEIC && (
            <DDSettingWordPack
              onChoose={onSettingWordPack}
              classNameIcon="dyno-setting-icon"
            />
          )} */}
        </div>
      </div>
      <div className="dyno-break"></div>

      {/* list content */}
      <div className={classes.contentWrap}>
        <StorySearchInput disabled={loading} onSearch={onSearchWord} />

        <div className={`${classes.listWrap} w-100`}>
          <ul id="dictionaryId" className={`${classes.list} flex-col w-100`}>
            <>
              {isFirstLoad ? (
                <StoryListSkeleton className={classes.skeleton} />
              ) : (
                <>
                  {list && list.length > 0 ? (
                    <>
                      {/* render list */}
                      {list.map((item, index) => (
                        <li className={classes.listItem} key={index}>
                          <DynoDictionaryItemData {...item} />
                        </li>
                      ))}

                      {/* infinite scrolling */}
                      {/* {!loading && more && (
                        <InfiniteScroll
                          onTouchAnchor={onLoadData}
                          threshold={1}>
                          <div className="w-100 t-center">
                            <LoopIcon className="ani-spin" />
                          </div>
                        </InfiniteScroll>
                      )} */}
                    </>
                  ) : (
                    // empty list
                    <h3 className="notfound-title h-100 flex-center t-center">
                      Không tìm thấy truyện nào trong danh sách truyện
                    </h3>
                  )}
                </>
              )}
            </>
          </ul>
        </div>
      </div>
      {
        showCreatStory &&
        <CreateStoryModal
          open={showCreatStory}
          hideModal={hideModal}
        />
      }
    </div>
  );
}

function CreateStoryModal(props) {
  const [valuesStory, setValueStory] = useState("");
  const [openModal, setOpen] = useState(props.open);
  const [listWords, setListWord] = useState("");
  const [storyName, setName] = useState("");
  const [fileUrlBase, setFileBase] = useState("");
  const handleClose = () => {
    props.hideModal();
  };

  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      setFileBase(reader.result);
    };
  }

  const handleCreateStory = async () => {
    let storiesArr = valuesStory.split(" ").map((word) => word.trim());
    const newWords = listWords.split(",").map((word) => word.trim());
    const values = storiesArr.map((story) => {
      if (newWords.includes(story)) {
        return `<div class="boxWord"><p class="tooltip">${story}</p></div>`
      }
      return story;
    }).join(" ");
    const body = {
      name: storyName,
      description: valuesStory,
      picture: fileUrlBase,
      values: values
    }
    await storyApi.createStory(body);
    props.hideModal();
  };

  const handleChange = (event) => {
    setValueStory(event.target.value);
  }
  const handleChangeListWord = (event) => {
    setListWord(event.target.value);
  }

  const handleChangeStoryName = (event) => {
    setName(event.target.value);
  }

  return (
    <Dialog
      onClose={handleClose}
      maxWidth="md"
      fullWidth={true}
      aria-labelledby="customized-dialog-title"
      open={openModal}
      disableBackdropClick={true}
      disableEscapeKeyDown={true}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Create new story
      </DialogTitle>
      <DialogContent>
        <Typography gutterBottom>
          <div >
            <TextField
              id="standard-multiline-flexible"
              label="Story name"
              multiline
              fullWidth
              maxRows={8}
              value={storyName}
              onChange={handleChangeStoryName}
            />
          </div>
        </Typography>
        <Typography gutterBottom>
          <div style={{ display: "flex", alignItems: "center", height: "100px", justifyContent: "space-evenly" }}>
            <label htmlFor="upload-photo">
              <input
                style={{ display: 'none' }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                onChange={onSelectFile}
              />
              <Fab
                color="secondary"
                size="small"
                component="span"
                aria-label="add"
                variant="extended"
              >
                <Add /> Upload photo
              </Fab>
            </label>
            <div style={{ paddingLeft: "78px", height: "100px" }}>
              {selectedFile && <img height="100px" src={preview} />}
            </div>
          </div>
        </Typography>
        <Typography gutterBottom>
          <div style={{ display: "flex" }}>
            <div style={{ flex: 2, borderRight: "2px solid #ccc", paddingRight: "12px" }}>
              <TextField
                id="standard-multiline-flexible"
                label="Story"
                multiline
                fullWidth
                maxRows={8}
                value={valuesStory}
                onChange={handleChange}
              />
            </div>
            <div style={{ flex: 1, paddingLeft: "8px" }}>
              <TextField
                id="standard-multiline-flexible"
                label="List word"
                multiline
                fullWidth
                maxRows={8}
                value={listWords}
                onChange={handleChangeListWord}
              />
            </div>
          </div>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCreateStory} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

StoryList.propTypes = {
  isFirstLoad: PropTypes.bool,
  isTOEIC: PropTypes.bool,
  list: PropTypes.array,
  loading: PropTypes.bool,
  more: PropTypes.bool,
  onLoadData: PropTypes.func,
  onSearchWord: PropTypes.func,
  onSettingWordPack: PropTypes.func,
  onSortTypeChange: PropTypes.func,
};

StoryList.defaultProps = {
  list: [],
  loading: false,
  more: true,
  isFirstLoad: true,
  isTOEIC: false,
  onLoadData: function () { },
  onSearchWord: function () { },
  onSettingWordPack: function () { },
  onSortTypeChange: function () { },
};

export default StoryList;
