import React from 'react';
import './About.css';
import icon from '../../images/icon-512.png';

function About() {
  return (
    <div className="about">
      <img src={icon} alt="App Icon" className="about__icon" />
      <h1>About Stride</h1>
      <p>Version: 0.80085</p>
      <p>This app is designed to help you manage your tasks efficiently and effectively.</p>
      <p>For more information, visit our <a href="https://github.com/BerezinYaroslav/tp_project">repository</a>.</p>
      <h2>Developers</h2>
      <ul>
        <li>Yaroslav Berezin</li>
        <li>Ivan Kharlamov</li>
        <li>Alexandra Savenkova</li>
      </ul>
    </div>
  );
}

export default About;
