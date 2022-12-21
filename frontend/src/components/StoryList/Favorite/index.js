import LoopIcon from '@material-ui/icons/Loop';
import InfiniteScroll from 'components/UI/InfiniteScroll';
import WordSortModal from 'components/UI/WordSortModal';
import PropTypes from 'prop-types';
import React from 'react';
import DynoDictionaryItemData from '../Item/data';
import DynoDictionarySkeleton from '../Skeleton';
import useStyle from '../style';

const STORY = {
  name: 'The fox and the grapes',
  description:
    "One day a fox spied a beautiful bunch of ripe grapes hanging from a vine along the branches of a tree. The grapes seemed ready to burst with juice, and the fox's mouth watered as he gazed longingly at them.",
  picture:
    'https://ila.edu.vn/uploads/SEO/ila-truyen-tieng-anh-cho-be-shutterstock_1296413959.jpg',
};

function FavoriteDictionary({
  list,
  loading,
  onLoadData,
  more,
  isFirstLoad,
  onSortTypeChange,
  onSearchWord,
}) {
  const classes = useStyle();

  return (
    <div className={`${classes.root} dyno-container`}>
      {/* title - menu */}
      <div className="flex-center-between">
        <h1 className="dyno-title">Đọc truyện</h1>
        <div>
          <WordSortModal
            onSelect={onSortTypeChange}
            classNameIcon="dyno-setting-icon mr-5"
          />
        </div>
      </div>
      <div className="dyno-break"></div>

      {/* list content */}
      <div className={classes.contentWrap}>
        <div
          className={`${classes.listWrap} w-100`}
          style={{ display: 'flex' }}>
          <ul id="dictionaryId" className={`${classes.list} flex-col w-100`}>
            <h3 className="notfound-title h-100 flex-center t-center">
              {STORY.description}
            </h3>
          </ul>
          <div
            style={{display:'flex', justifyContent:'center', width: '20%', backgroundColor: 'white'}}>
            <h2 style={{color:'#6e6e6e'}}>Từ vựng đã lưu</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

FavoriteDictionary.propTypes = {
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

FavoriteDictionary.defaultProps = {
  list: [],
  loading: false,
  more: true,
  isFirstLoad: true,
  isTOEIC: false,
  onLoadData: function () {},
  onSearchWord: function () {},
  onSettingWordPack: function () {},
  onSortTypeChange: function () {},
};

export default FavoriteDictionary;
