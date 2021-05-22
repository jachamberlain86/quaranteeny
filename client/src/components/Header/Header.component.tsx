import React from 'react';
import './Header.styles.css';
import SoundBar from '../SoundBar/SoundBar.components';

const Header = (): JSX.Element => {
  return (
    <div>
      <header>
        <div className="header__row-1">
          <SoundBar />
        </div>
        <div className="header__row-2" />
      </header>
    </div>
  );
};

export default Header;
