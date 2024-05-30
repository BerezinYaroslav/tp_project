import React from 'react';

function Main({ search }) {
  return (
    <main className="main">
      <div className="main__column">
        <div className="main__title-item">
          <h3 className="main__title">
            Today
          </h3>
          <p className="main__date">
            30.05.2024
          </p>
        </div>
        {
          'Reading'.includes(search) && (
            <div className="main__item">
              <div className="main__item-header">
                <h3 className="main__item-title">
                  Reading
                </h3>
                <svg width="10" height="26" viewBox="0 0 10 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.61538 8C7.16439 8 9.23077 6.20914 9.23077 4C9.23077 1.79086 7.16439 0 4.61538 0C2.06638 0 0 1.79086 0 4C0 6.20914 2.06638 8 4.61538 8Z"
                    fill="black"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.61538 26C7.16439 26 9.23077 24.2091 9.23077 22C9.23077 19.7909 7.16439 18 4.61538 18C2.06638 18 0 19.7909 0 22C0 24.2091 2.06638 26 4.61538 26Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div className="main__item-subtitle">
                Finish reading the text about flatter
              </div>
              <span className="main__hashtag">
                #personal
              </span>
            </div>
          )
        }
        {
          'Skyline'.includes(search) && (
            <div className="main__item">
              <div className="main__item-header">
                <h3 className="main__item-title">
                  Skyline
                </h3>
                <svg width="10" height="26" viewBox="0 0 10 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.61538 8C7.16439 8 9.23077 6.20914 9.23077 4C9.23077 1.79086 7.16439 0 4.61538 0C2.06638 0 0 1.79086 0 4C0 6.20914 2.06638 8 4.61538 8Z"
                    fill="black"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.61538 26C7.16439 26 9.23077 24.2091 9.23077 22C9.23077 19.7909 7.16439 18 4.61538 18C2.06638 18 0 19.7909 0 22C0 24.2091 2.06638 26 4.61538 26Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div className="main__item-subtitle">
                Finish reading the text about flatter
              </div>
              <span className="main__hashtag">
                #personal
              </span>
            </div>
          )
        }
        {
          'Guitar'.includes(search) && (
            <div className="main__item">
              <div className="main__item-header">
                <h3 className="main__item-title">
                  Guitar
                </h3>
                <svg width="10" height="26" viewBox="0 0 10 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.61538 8C7.16439 8 9.23077 6.20914 9.23077 4C9.23077 1.79086 7.16439 0 4.61538 0C2.06638 0 0 1.79086 0 4C0 6.20914 2.06638 8 4.61538 8Z"
                    fill="black"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.61538 26C7.16439 26 9.23077 24.2091 9.23077 22C9.23077 19.7909 7.16439 18 4.61538 18C2.06638 18 0 19.7909 0 22C0 24.2091 2.06638 26 4.61538 26Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div className="main__item-subtitle">
                Finish reading the text about flatter
              </div>
              <span className="main__hashtag">
                #personal
              </span>
            </div>
          )
        }
      </div>
      <div className="main__column">
        <div className="main__title-item">
          <h3 className="main__title">
            Tomorrow
          </h3>
          <p className="main__date">
            31.05.2024
          </p>
          <button type="button" className="main__button">
            +
          </button>
        </div>
        {
          'Java'.includes(search) && (
            <div className="main__item">
              <div className="main__item-header">
                <h3 className="main__item-title">
                  Java
                </h3>
                <svg width="10" height="26" viewBox="0 0 10 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.61538 8C7.16439 8 9.23077 6.20914 9.23077 4C9.23077 1.79086 7.16439 0 4.61538 0C2.06638 0 0 1.79086 0 4C0 6.20914 2.06638 8 4.61538 8Z"
                    fill="black"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.61538 26C7.16439 26 9.23077 24.2091 9.23077 22C9.23077 19.7909 7.16439 18 4.61538 18C2.06638 18 0 19.7909 0 22C0 24.2091 2.06638 26 4.61538 26Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div className="main__item-subtitle">
                Finish reading the text about flatter
              </div>
              <span className="main__hashtag">
                #personal
              </span>
            </div>
          )
        }
        {
          'Shop'.includes(search) && (
            <div className="main__item">
              <div className="main__item-header">
                <h3 className="main__item-title">
                  Shop
                </h3>
                <svg width="10" height="26" viewBox="0 0 10 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.61538 8C7.16439 8 9.23077 6.20914 9.23077 4C9.23077 1.79086 7.16439 0 4.61538 0C2.06638 0 0 1.79086 0 4C0 6.20914 2.06638 8 4.61538 8Z"
                    fill="black"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.61538 26C7.16439 26 9.23077 24.2091 9.23077 22C9.23077 19.7909 7.16439 18 4.61538 18C2.06638 18 0 19.7909 0 22C0 24.2091 2.06638 26 4.61538 26Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div className="main__item-subtitle">
                Finish reading the text about flatter
              </div>
              <span className="main__hashtag">
                #personal
              </span>
            </div>
          )
        }
        {
          'Dish'.includes(search) && (
            <div className="main__item">
              <div className="main__item-header">
                <h3 className="main__item-title">
                  Dish
                </h3>
                <svg width="10" height="26" viewBox="0 0 10 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.61538 8C7.16439 8 9.23077 6.20914 9.23077 4C9.23077 1.79086 7.16439 0 4.61538 0C2.06638 0 0 1.79086 0 4C0 6.20914 2.06638 8 4.61538 8Z"
                    fill="black"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.61538 26C7.16439 26 9.23077 24.2091 9.23077 22C9.23077 19.7909 7.16439 18 4.61538 18C2.06638 18 0 19.7909 0 22C0 24.2091 2.06638 26 4.61538 26Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div className="main__item-subtitle">
                Finish reading the text about flatter
              </div>
              <span className="main__hashtag">
                #personal
              </span>
            </div>
          )
        }
      </div>
    </main>
  );
}

export default Main;
