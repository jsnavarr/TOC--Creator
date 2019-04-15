import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import contentService from '../../utils/contentService';
// import './SettingsPage.css';

class MyContentPage extends Component {
  async componentDidMount() {
    const contents = await contentService.index();
    console.log('content 1 ', contents);
  }

  render(){
    // console.log('contents ', contents);
    // console.log('contents ', this.props.contents);
    return(
      <div className='Content'>
      <header className='header-footer'>My content</header>
      <div>
        <Link className='Content-cancel btn btn-default btn-sm' to='/'>Cancel</Link>
      </div>
    </div>
    );
  }
};

export default MyContentPage;
