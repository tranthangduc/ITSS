import PropTypes from 'prop-types';
import React from 'react';
import useStyle from '../style';
import './style.css'
import { useState } from 'react';
import storyApi from 'apis/storyApi';
import wordApi from 'apis/wordApi';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import $ from 'jquery';
import { useRef } from 'react';

function FavoriteDictionary() {
  const classes = useStyle();
  const [story, setStory] = useState({});
  const [wordSearch, setWord] = useState("");
  const [offset, setOffset] = useState({ top: 0, left: 0 });
  const [isShowPopup, setShowPopup] = useState(false);
  const params = useHistory();

  const loadData = async () => {
    const pathName = params.location.pathname;
    const id = pathName.split('/')[pathName.split('/').length - 1];
    var result = await storyApi.getStory(id);
    const data = result.data.data;
    const newState = {
      values: data.values,
    }
    setStory(newState);
  };

  const setPopup = (listWord) => {
    $(listWord).each(function () {
      $(this).hover(function () {
        const offset = $(this).offset();
        setOffset(offset);
        const wordHover = $(this).find(".tooltip").text();
        setWord(wordHover);
        setShowPopup(true);
      })
    });
  }

  useEffect(async () => {
    await loadData();
    let listWord = $(".notfound-title").find(".boxWord");
    
    let listNotWord = $("*").click(function () {
      setWord("");
      setShowPopup(false);
    })
    setPopup(listWord);
  }, []);

  return (
    <div className={`${classes.root} dyno-container`}>
      {/* title - menu */}
      <div className="flex-center-between">
        <h1 className="dyno-title">Đọc truyện</h1>
      </div>
      <div className="dyno-break"></div>

      {/* list content */}
      <div style={{ width: "800px", padding: "0 10px" }} className={classes.contentWrap}>
        <div
          className={`${classes.listWrap} w-100`}
          style={{ display: 'flex' }}>
          <ul id="dictionaryId" className={`${classes.list} flex-col w-100`}>
            <h3 className="notfound-title h-100 flex-center t-center">
              {
                <div className="boxDoc" dangerouslySetInnerHTML={{ __html: story.values }} />
              }
            </h3>
            <div className="hoverThisParent" style={{
              position: 'fixed',
              top: offset.top,
              left: offset.left,
              transform: 'translate(0, 15px)'
            }}>
              {
                isShowPopup && <PopupMean key={wordSearch} offset={offset} code={wordSearch} />
              }
            </div>
          </ul>
          <div
            style={{ display: 'flex', justifyContent: 'center', width: '20%', backgroundColor: 'white' }}>
            <h2 style={{ color: '#6e6e6e' }}>Từ vựng đã lưu</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

const PopupMean = (props) => {
  const [word, setword] = useState({});
  const [load, setLoad] = useState(true);
  const mounted = useRef(true);

  const loadData = async () => {
    var result = await wordApi.getMeanOfWordByCode(props.code);
    mounted.current && setword(result.data.data);
    setTimeout(() => {
      mounted.current && setLoad(false);
    }, 300);
  }

  useEffect(async () => {
    loadData();
    return () => {
      mounted.current = false;
    }
  }, []);
  return (
    <div className="mean">
      {
        load ?
          <div className="loader"></div> :
          <div style={{ fontSize: "14px", fontWeight: "500" }}>
            <p>{word.word}</p>
            <p style={{ fontSize: "12px", fontStyle: "italic" }}>{word.phonetic}</p>
            <p>{word.mean}</p>
          </div>
      }
    </div>
  )
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
  onLoadData: function () { },
  onSearchWord: function () { },
  onSettingWordPack: function () { },
  onSortTypeChange: function () { },
};

export default FavoriteDictionary;
