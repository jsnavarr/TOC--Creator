import React, {Component} from 'react';
import { Table} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import './MyContentPage.css';
import contentService from '../../utils/contentService';

class MyContentPage extends Component {
  async componentDidMount() {
    console.log('user in mount ', this.props);
    const contents = await contentService.index(this.props.user);
    this.props.handleMyContent(contents);
    console.log('content 1 ', contents);
  }

  render(){
    console.log('the content', this.props);
    const contentRows = this.props.contents.map((content, idx) => (
      <Table.Row key={idx}>
        <Table.Cell>{idx + 1}</Table.Cell>
        <Table.Cell>{content.createdAt}</Table.Cell>
        <Table.Cell>{content.keywords}</Table.Cell>
        <Table.Cell>{content.TOC}</Table.Cell>
      </Table.Row>
    ));

    return (
        <div className='MyContent'>
          <header className='header-footer'>My content</header>
          {this.props.contents.length ? 
            <Table id="MyContentTable" celled striped size='small'>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>#</Table.HeaderCell>
                  <Table.HeaderCell>Date Created</Table.HeaderCell>
                  <Table.HeaderCell>Keywords</Table.HeaderCell>
                  <Table.HeaderCell>TOC</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {contentRows}
              </Table.Body>
            </Table>
            :
            <h4 className='text-info'>No Content saved yet</h4>
          }
          <div>
            <Link className="cancel btn btn-default btn-sm" to='/'>Back to Home</Link>
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

