import Navigation from 'components/Navigation';
import StoryData from 'components/StoryList/Favorite/data';
import useCloseNavigation from 'hooks/useCloseNavigation';
import useTitle from 'hooks/useTitle';
import React from 'react';

function StoryPage() {
  useTitle('Đọc truyện');
  useCloseNavigation();

  return (
    <>
    <Navigation/>,
    <StoryData />;
    </>
);}

export default StoryPage;
