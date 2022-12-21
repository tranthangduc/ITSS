import commonApi from 'apis/commonApi';
import wordApi from 'apis/wordApi';
import WordDetailModal from 'components/UI/WordDetailModal';
import { TOEIC_KEY } from 'constant/topics';
import { equalArray } from 'helper';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import DynoDictionary from '.';

const perPage = 20;

const STORY = [
  {
    'name': 'The fox and the grapes', 
    'description': "One day a fox spied a beautiful bunch of ripe grapes hanging from a vine along the branches of a tree. The grapes seemed ready to burst with juice, and the fox's mouth watered as he gazed longingly at them.",
    'picture': 'https://ila.edu.vn/uploads/SEO/ila-truyen-tieng-anh-cho-be-shutterstock_1296413959.jpg',
  },
  {
    'name': 'What will I be when I grow up?', 
    'description': "When I grow up I’ll work with animals. I don’t know which job yet.Maybe like my brother. He’s a special vet. He looks after scary snakes, some just out of their eggs.",
    'picture': 'https://m.media-amazon.com/images/I/51t8nP3FIQL._AC_SY780_.jpg',
  },
  {
    'name': 'The two frogs', 
    'description': "A group of frogs were traveling through the woods, and two of them fell into a deep pit. When the other frogs saw how deep the pit was, they told the two frogs that they were as good as dead.",
    'picture': 'https://ila.edu.vn/uploads/SEO/ila-truyen-tieng-anh-cho-be-shutterstock_1735994426.jpg',
  },
  {
    'name': 'The boy and the nuts', 
    'description': "A little boy once put his hand into a jar.The jar was full of nuts. He tried to take out as many as his hand could hold.But when he tried to pull his hand out, it was too large for the narrow neck of the jar.The boy didn’t want to lose his nuts. The little boy started to cry.His mother saw the little boy standing close by, and told him something wise.“Be happy with half as many, and you will get them easily”.",
    'picture': 'https://i.ytimg.com/vi/qiJnHMgtEB4/maxresdefault.jpg',
  },
  {
    'name': 'The crow and the pitcher', 
    'description': "n a spell of dry weather, when the birds could find very little to drink, a thirsty crow found a pitcher with a little bit of water in it.But the pitcher was high and had a narrow neck, and no matter how he tried, the crow could not reach the water. The poor thing felt as if he would must die of thirst.",
    'picture': 'https://ila.edu.vn/uploads/SEO/ila-truyen-tieng-anh-cho-be-shutterstock_1636257811.jpg',
  },
  {
    'name': 'Honest', 
    'description': " want to buy a bottle of ink”, I said. There was no answer. He was still going on reading his book. Then I asked again. He stood up and gave me a bottle of ink. When I was out of the shop, I found that the change he gave me was too much. So I went back to the shop. The man pulled a long face when he saw me again.",
    'picture': 'https://i.ytimg.com/vi/fVeMgKj5CZ8/hqdefault.jpg',
  },
  {
    'name': 'The wolf and the lamb', 
    'description': "Oneday, a lamb was eating sweet grass away from her flock of sheep. She didn’t notice a wolf walking close to her. When she saw the wolf, she started pleading: “Please, don’t eat me. My stomach is full of grass. You can wait a while to make my meat taste much better. The grass in my stomach will be digested quickly if you let me dance”. The wolf agreed.",
    'picture': 'https://ila.edu.vn/uploads/SEO/ila-truyen-tieng-anh-cho-be-2.jpg',
  },
  {
    'name': 'Who’s broken a window?', 
    'description': "Billy and Bobby were small boys. They were brothers, and they often fought with each other. Last Saturday, their mother said to them: ‘I’m going to cook our lunch now. Go out and play in the garden… and be good”. “Yes, mummy”, the two boys answered and they went out. They played for half an hour, and then Billy ran into the kitchen. “Mummy”, he said: “Bobby’s broken a window in Mrs Allen’s house”. Mrs Allen was one of their neighbors.",
    'picture': 'https://i.ytimg.com/vi/XWwbOlSJEVI/mqdefault.jpg',
  },
];

function StoryListData({ isTOEIC }) {
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState('rand');
  const [packInfo, setPackInfo] = useState(() => ({
    type: '-1',
    level: '-1',
    specialty: '-1',
    topics: isTOEIC ? [TOEIC_KEY] : [],
  }));
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [more, setMore] = useState(true); // toggle infinite scrolling
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const totalPage = useRef(0);
  const preSearchList = useRef([]);

  const nextPage = () => {
    if (page < totalPage.current) {
      setPage(page + 1);
    } else {
      setMore(false);
    }
  };

  const settingWordPack = (info) => {
    // check old pack vs new pack
    let isEqual = true;
    for (let k in packInfo) {
      if (k !== 'topics' && packInfo[k] !== info[k]) {
        isEqual = false;
        break;
      }
    }
    if (isEqual) isEqual = equalArray(packInfo.topics, info.topics);

    totalPage.current = 0;
    preSearchList.current = [];
    setMore(true);
    // setList([]);
    setPackInfo(info);
    setPage(1);
  };

  const onSortTypeChange = (type = 'rand') => {
    if (type === sortType) return;
    preSearchList.current = [];
    setSortType(type);
    setPage(1);
    // setList([]);
  };

  /* const onSearchWord = async (name) => {
    try {
      if (name === '') {
        setList(preSearchList.current);
        setMore(true);
        return;
      }

      const apiRes = await wordApi.getSearchWord(word);
      if (apiRes.status === 200) {
        const { packList = [] } = apiRes.data;
        setList(packList);
        setMore(false);
      }
    } catch (error) {}
  }; */
  const packList = [];
  const onSearchWord = (name) => {
    STORY.map((story) => {
      if (name === '') {
        setList(STORY);
        setMore(true);
        return;
      }
  
      if (story.name.startsWith(name)) {
        packList.push(story);
      }
    });
    if(packList) {
        setList(packList);
        setMore(false);
    }
  };

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
          // setList(newList);
          setList(STORY);
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
  }, [page, packInfo, sortType]);

  return (
    <>
      <DynoDictionary
        isTOEIC={isTOEIC}
        list={list}
        loading={loading}
        onLoadData={nextPage}
        more={more}
        isFirstLoad={isFirstLoad}
        onSettingWordPack={settingWordPack}
        onSortTypeChange={onSortTypeChange}
        onSearchWord={onSearchWord}
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
