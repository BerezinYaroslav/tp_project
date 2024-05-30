import React from 'react';
import notification from '../../images/notification.png';
import avatar from '../../images/avatar.png';

function Header({ search, setSearch }) {
  function handleInput(e) {
    setSearch(e.target.value);
  }

  return (
    <header className="header">
      <h1 className="header__logo">
        STRIDE
      </h1>
      <h2 className="header__title">
        Tasks
      </h2>
      <input type="text" className="header__input" placeholder="Search task..." onChange={handleInput} value={search} />
      <div className="header__profile">
        <img src={notification} alt="колокольчик" className="header__notification" />
        Bogdan Lisevsky
        <img src={avatar} alt="аватар" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
