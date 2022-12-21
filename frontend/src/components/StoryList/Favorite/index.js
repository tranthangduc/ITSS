import LoopIcon from '@material-ui/icons/Loop';
import InfiniteScroll from 'components/UI/InfiniteScroll';
import WordSortModal from 'components/UI/WordSortModal';
import PropTypes from 'prop-types';
import React from 'react';
import DynoDictionaryItemData from '../Item/data';
import DynoDictionarySkeleton from '../Skeleton';
import Word from 'components/PopupMean';
import useStyle from '../style';

const STORY = {
  name: 'The fox and the grapes',
  description:
    `<div>
      One day a fox spied <Word id={60cfe0c9f5dc801af8279f34} word={code} /> a beautiful <Word id={60d0205de09a5f00072cc4b3} word={expect} />  
       bunch of ripe <Word id={60d06886f38ce90015e8ba36} word={name} /> grapes hanging <Word id={60d2947ca5b10d0015f98dc4} word={indicate} /> from a vine along the <Word id={60d29a3f012562001586f4f4} word={assure} /> branches of a tree. 
      The grapes seemed <Word id={60d29be9012562001586f4f9} word={launch} /> ready to burst <Word id={60d2e5de012562001586f506} word={show} /> with juice, 
      and the fox's <Word id={60d2eab0501c6f0015e40aac} word={implement} /> mouth watered as he <Word id={60d2ebf6501c6f0015e40aaf} word={prevent} /> gazed longingly at them.
    </div>`,
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
      <div style={{width: "800px", padding: "0 10px"}} className={classes.contentWrap}>
      <div
          className={`${classes.listWrap} w-100`}
          style={{ display: 'flex' }}>
          <ul id="dictionaryId" className={`${classes.list} flex-col w-100`}>
            <h3 className="notfound-title h-100 flex-center t-center">
              {
                <div>
                One day a fox spied <Word id={"60cfe0c9f5dc801af8279f34"} word={"code"} /> a beautiful <Word id={"60d0205de09a5f00072cc4b3"} word={"expect"} />  
                bunch of ripe <Word id={"60d06886f38ce90015e8ba36"} word={"name"} /> grapes hanging <Word id={"60d2947ca5b10d0015f98dc4"} word={"indicate"} /> from a vine along the <Word id={"60d29a3f012562001586f4f4"} word={"assure"} /> branches of a tree. 
                The grapes seemed <Word id={"60d29be9012562001586f4f9"} word={"launch"} /> ready to burst <Word id={"60d2e5de012562001586f506"} word={"show"} /> with juice, 
                and the fox is <Word id={"60d2eab0501c6f0015e40aac"} word={"implement"} /> mouth watered as he <Word id={"60d2ebf6501c6f0015e40aaf"} word={"prvent"} /> gazed longingly at them.
              </div>
              }
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
