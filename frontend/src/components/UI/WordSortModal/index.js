import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDownIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpIcon from '@material-ui/icons/ArrowUpward';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import useStyle from './style';

function WordSortModal({ classNameIcon, onSelect }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortType, setSortType] = useState('rand');
  const classes = useStyle();

  const handleOpenModal = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (v) => {
    setAnchorEl(null);
    if (typeof v === 'string') {
      onSelect(v);
      setSortType(v);
    }
  };

  return (
    <>
      <div
        onClick={handleOpenModal}
      >
        {sortType === 'rand' ?
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h2>Random</h2><SwapVertIcon />
          </div> :
          (sortType === 'asc' ?
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h2>A-Z</h2><ArrowDownIcon />
            </div> :
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h2>Z-A</h2><ArrowUpIcon />
            </div>
          )
        }
      </div>
      <Menu
        classes={{ paper: classes.menu }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <MenuItem
          className={classes.menuItem}
          onClick={() => handleClose('asc')}>
          A-Z&nbsp;
          <ArrowDownIcon />
        </MenuItem>
        <MenuItem
          className={classes.menuItem}
          onClick={() => handleClose('desc')}>
          Z-A&nbsp;
          <ArrowUpIcon />
        </MenuItem>
        <MenuItem
          className={classes.menuItem}
          onClick={() => handleClose('rand')}>
          Random&nbsp;
          <SwapVertIcon />
        </MenuItem>
      </Menu>
    </>
  );
}

WordSortModal.propTypes = {
  classNameIcon: PropTypes.string,
  onSelect: PropTypes.func,
};

WordSortModal.defaultProps = {
  classNameIcon: '',
  onSelect: () => { },
};

export default WordSortModal;
