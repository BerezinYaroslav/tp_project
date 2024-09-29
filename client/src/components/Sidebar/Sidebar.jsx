import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <Link to="/tasks" className={location.pathname === '/tasks' ? 'sidebar__item sidebar__item_active' : 'sidebar__item'}>
        <svg width="34" height="26" viewBox="0 0 34 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="14.5786" height="6.5" rx="1.5" fill="black" />
          <rect x="18.7439" y="19.5" width="14.5786" height="6.5" rx="1.5" fill="black" />
          <rect y="9.75" width="14.5786" height="16.25" rx="1.5" fill="#DADADA" />
          <rect x="18.7439" width="14.5786" height="16.25" rx="1.5" fill="#DADADA" />
        </svg>
        Tasks
      </Link>
      <Link to="/analytics" className={location.pathname === '/analytics' ? 'sidebar__item sidebar__item_active' : 'sidebar__item'}>
        <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.31885 20.2438C4.04912 26.5937 10.1515 31.2857 17.4139 31.2857C26.0219 31.2857 33.0001 24.6941 33.0001 16.5631C33.0001 9.05523 27.0507 2.85998 19.3622 1.95435V20.2438H2.31885Z"
            fill="#A8A8A8"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.4656 12.8821H0C0.958841 5.61967 7.51742 0 15.4655 0H15.4656V12.8821Z"
            fill="black"
          />
        </svg>
        Analytic
      </Link>
      <Link to="/calendar" className={location.pathname === '/calendar' ? 'sidebar__item sidebar__item_active' : 'sidebar__item'}>
        <svg width="33" height="34" viewBox="0 0 33 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.4029 11.0878C14.4224 10.8268 14.6398 10.625 14.9015 10.625H15.3587C15.6161 10.625 15.8314 10.8205 15.8563 11.0767L16.5 17.7083L21.0661 20.3966C21.2188 20.4865 21.3125 20.6504 21.3125 20.8275V21.2985C21.3125 21.6298 20.9961 21.8694 20.6772 21.7798L14.1438 19.944C13.9147 19.8796 13.7627 19.6627 13.7804 19.4254L14.4029 11.0878Z"
            fill="black"
          />
          <path
            opacity="0.3"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.27758 1.70346C8.01776 1.38443 7.51418 1.50882 7.42008 1.91528L5.71788 9.26782C5.64155 9.59752 5.89409 9.90856 6.22254 9.88938L13.5637 9.46076C13.9693 9.43708 14.1768 8.94696 13.9166 8.62739L12.0295 6.31036C13.2308 5.88745 14.5046 5.66656 15.8125 5.66656C22.2673 5.66656 27.5 11.0578 27.5 17.7082C27.5 24.3587 22.2673 29.7499 15.8125 29.7499C9.35767 29.7499 4.125 24.3587 4.125 17.7082C4.125 16.5918 4.27174 15.4983 4.55787 14.4474L1.91006 13.6821C1.56144 14.9626 1.375 16.313 1.375 17.7082C1.375 25.9235 7.83889 32.5832 15.8125 32.5832C23.7861 32.5832 30.25 25.9235 30.25 17.7082C30.25 9.49299 23.7861 2.83322 15.8125 2.83322C13.8069 2.83322 11.8968 3.25458 10.161 4.01606L8.27758 1.70346Z"
            fill="black"
          />
        </svg>
        Calendar
      </Link>
      <Link to="/lists" className={/^\/lists(-tasks\/\d+)?$/.test(location.pathname) ? 'sidebar__item sidebar__item_active' : 'sidebar__item'}>
        <svg width="26" height="31" viewBox="0 0 26 31" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            opacity="0.3"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.49999 2.73804H2C0.895431 2.73804 0 3.63347 0 4.73804V28.1172C0 29.2217 0.89543 30.1172 2 30.1172H24C25.1046 30.1172 26 29.2217 26 28.1172V4.73804C26 3.63347 25.1046 2.73804 24 2.73804H19.5V3.42247C19.5 4.55655 18.4087 5.4759 17.0625 5.4759H8.93749C7.5913 5.4759 6.49999 4.55655 6.49999 3.42247V2.73804Z"
            fill="black"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.625 1.36897C14.625 1.36896 14.625 1.36896 14.625 1.36896C14.625 0.612902 13.8975 0 13 0C12.1025 0 11.375 0.612902 11.375 1.36896C11.375 1.36896 11.375 1.36896 11.375 1.36897H8.625C8.34886 1.36897 8.125 1.59282 8.125 1.86897V3.60688C8.125 3.88302 8.34886 4.10688 8.625 4.10688H17.375C17.6511 4.10688 17.875 3.88302 17.875 3.60688V1.86897C17.875 1.59283 17.6511 1.36897 17.375 1.36897H14.625Z"
            fill="black"
          />
          <rect opacity="0.3" x="4.875" y="12.3206" width="8.125" height="2.73791" rx="1.36896" fill="black" />
          <rect opacity="0.3" x="4.875" y="17.7964" width="14.625" height="2.73791" rx="1.36896" fill="black" />
        </svg>
        Lists
      </Link>
    </div>
  );
}

export default Sidebar;
