import commonApi from 'apis/commonApi';
import wordApi from 'apis/wordApi';
import WordDetailModal from 'components/UI/WordDetailModal';
import { TOEIC_KEY } from 'constant/topics';
import { equalArray } from 'helper';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import DynoDictionary from '.';
import storyApi from 'apis/storyApi';

const perPage = 10;

function StoryListData({ isTOEIC }) {
  const [page, setPage] = useState(1);
  const [packInfo, setPackInfo] = useState(() => ({
    type: '-1',
    level: '-1',
    specialty: '-1',
    topics: isTOEIC ? [TOEIC_KEY] : [],
  }));
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState({
    pageIndex: 1,
    searchKey: '',
    pageSize: perPage,
    sortType: 'rand'
  });
  const [more, setMore] = useState(true); // toggle infinite scrolling
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isReload, setReload] = useState(false);
  const totalPage = useRef(0);
  const preSearchList = useRef([]);

  const nextPage = () => {
    if (page < totalPage.current) {
      setPage(page + 1);
    } else {
      setMore(false);
    }
  };

  const loadData = async () => {
    const result = await storyApi.getListStories(filter);
    let data = result.data.data.newResult;
    setList(data);
  };
  const onSearchWord = (name) => {
    const newFilter = {
      ...filter,
      searchKey: name
    };
    setFilter(newFilter);
  };

  useEffect(() => {
    loadData();
  }, [filter]);

  // get total word pack
  useEffect(() => {
    let isSub = true;

    (async function () {
      try {
        const apiRes = await commonApi.getWordPackTotal(packInfo);
        if (apiRes.status === 200 && isSub) {
          const { total = 0 } = apiRes.data;
          totalPage.current = Math.ceil(total / perPage);
        }
      } catch (error) {}
    })();

    return () => (isSub = false);
  }, [packInfo]);

  const onSortTypeChange = (type = 'rand') => {
    if (type === filter.sortType) return;
    preSearchList.current = [];
    const newFilter = {
      ...filter,
      sortType: type,
      page: 1
    };
    setFilter(newFilter);
  };

  const reloadData = () => {
    loadData();
  }

  // get word pack
  useEffect(() => {
    let isSub = true;

    (async function () {
      try {
        setLoading(true);
        const apiRes = await wordApi.getWordList(
          page,
          perPage,
          packInfo,
          sortType,
        );
        if (apiRes.status === 200 && isSub) {
          const { packList = [] } = apiRes.data;
          const newList = [...list, ...packList];
          preSearchList.current = newList;
        }
      } catch (error) {
      } finally {
        if (isSub) {
          setLoading(false);
          isFirstLoad && setIsFirstLoad(false);
        }
      }
    })();

    return () => (isSub = false);
  }, [page, packInfo, filter.sortType]);

  return (
    <>
      <DynoDictionary
        isTOEIC={isTOEIC}
        list={list}
        loading={loading}
        onLoadData={nextPage}
        more={more}
        isFirstLoad={isFirstLoad}
        onSortTypeChange={onSortTypeChange}
        onSearchWord={onSearchWord}
        onReload={reloadData}
      />
      <WordDetailModal />
    </>
  );
}

StoryListData.propTypes = {
  isTOEIC: PropTypes.bool,
};

StoryListData.defaultProps = {
  isTOEIC: false,
};

export default StoryListData;
