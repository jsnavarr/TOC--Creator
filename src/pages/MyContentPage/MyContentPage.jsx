import React, {Component} from 'react';
// import { Segment, Button, Input, SegmentGroup} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import styles from './MyContentPage.module.css';
import contentService from '../../utils/contentService';


class MyContentPage extends Component {
  async componentDidMount() {
    const contents = await contentService.index();
    this.props.handleMyContent(contents);
    console.log('content 1 ', contents);
  }

  render(){
    console.log('the content', this.props);
    const contentRows = this.props.contents.map((content, idx) => (
      <tr key={idx}>
        <td><span className="badge">{idx + 1}</span></td>
        <td>{content.createdAt}</td>
        <td>{content.keywords}</td>
        <td>{content.TOC}</td>
      </tr>
    ));

    return (
          <div className={styles.MyContentStyles}>
          <header className='header-footer'>My content</header>
          {this.props.contents.length ? 
            <table className={`${styles.table} table text-info`}>
              <thead>
                <tr>
                  <th width={50}>#</th>
                  <th width={200}>Date Created</th>
                  <th width={150}>Keywords</th>
                  <th>TOC</th>
                </tr>
              </thead>
              <tbody>
                {contentRows}
              </tbody>
            </table>
            :
            <h4 className='text-info'>No Content created yet</h4>
          }
          <div>
            <Link className={`${styles.cancel} btn btn-default btn-sm`} to='/'>Back to Home</Link>
          </div>
        </div>
    );
  }
};

export default MyContentPage;
//In case I change my mind and I use semantic ui
// return(
//   <div className='Content'>
//       <Segment.Group stacked>
//         <Segment.Group horizontal>
//           <Segment>Date created</Segment>
//           <Segment>Keywords</Segment>
//           <Segment>TOC</Segment>
//         </Segment.Group>
//         <Segment.Group horizontal>
//           <Segment inverted color='teal'>
//             Here will be the date
//           </Segment>
//           <Segment inverted color='teal'>
//             Here will be the keywords
//           </Segment>
//           <Segment inverted color='teal'>
//             Here will be the TOC
//           </Segment>
//         </Segment.Group>
//         <Segment.Group horizontal>
//           <Segment>
//             <Link to='/' className='Home-Link'>Go Back</Link>
//           </Segment>
//         </Segment.Group>
//       </Segment.Group>
// </div>
// );

