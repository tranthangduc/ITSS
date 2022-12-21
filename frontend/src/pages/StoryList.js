import Navigation from 'components/Navigation';
import StoryListData from 'components/StoryList/data';
import useCloseNavigation from 'hooks/useCloseNavigation';
import useTitle from 'hooks/useTitle';
import PropTypes from 'prop-types';
import React from 'react';

function StoryListPage({ isTOEIC }) {
  useTitle(isTOEIC ? 'Danh sách truyện' : 'Danh sách truyện');
  useCloseNavigation();

  return (
    <div className="container">
      <Navigation/>,
      <StoryListData isTOEIC={isTOEIC} />
    </div>
  );
}

StoryListPage.propTypes = {
  isTOEIC: PropTypes.bool,
};

StoryListPage.defaultProps = {
  isTOEIC: false,
};

export default StoryListPage;
