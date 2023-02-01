import medalIcon from 'assets/icons/medal.png';
import LeaderBoardData from 'components/LeaderBoard/data';
import { HIGHSCORE_NAME } from 'constant/game';
import useTitle from 'hooks/useTitle';
import 'pages/styles/leader-board.scss';
import React from 'react';

const COLORS = ['#847AD1', '#7AD18A', '#E06B96', '#36C0CE', '#DB883E'];

function LeaderBoardPage() {
  useTitle('Bảng xếp hạng');

  return (
    <div className="container">
      <div className="leaderboard">
        <h1 className="leaderboard-title flex-center">
          <img src={medalIcon} alt="Icon" className="leaderboard-icon" />
          LEADERBOARD
        </h1>

        <div className="dyno-break"></div>

        <div className="leaderboard-grid">
          <LeaderBoardData
            title="Top tay nhanh hơn não"
            color={COLORS[3]}
            nameId={HIGHSCORE_NAME.FAST_GAME}
            unit="điểm"
            tooltip="Top những người dùng có điểm cao nhất trong game Tay nhanh hơn não"
          />
        </div>
      </div>
    </div>
  );
}

export default LeaderBoardPage;
