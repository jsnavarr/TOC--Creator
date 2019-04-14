import React from 'react';
import {Link} from 'react-router-dom';
// import './SettingsPage.css';

const MyContentPage = (props) => {

  return (
    <div className='Content'>
      <header className='header-footer'>My content</header>
      <div>
        <Link className='Content-cancel btn btn-default btn-sm' to='/'>Cancel</Link>
      </div>
    </div>
  );

};

export default MyContentPage;
