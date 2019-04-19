import React, {Component} from 'react';
import { Table, Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import './MyContentPage.css';
import contentService from '../../utils/contentService';

import moment from 'moment';

class MyContentPage extends Component {
  async componentDidMount() {
    // console.log('user in mount ', this.props);
    const contents = await contentService.show(this.props.user._id);
    this.props.handleMyContent(contents);
    // console.log('content 1 ', contents);
  }

  async handleDeleteContent(id){
    // console.log('delete content by id ', id);
    // const contents = await contentService.show(this.props.user._id);
    // this.props.handleMyContent(contents);
    // console.log('content 1 ', contents);
    await contentService.deleteContent(id);
    const contents = this.props.contents.filter(content => content._id !== id)
    this.props.handleMyContent(contents);
    // console.log(this.props.contents);
    // this.setState({contentRows})
  }

  render(){
    // console.log('the content', this.props);
    const contentRows = this.props.contents.map((content, idx) => (
      <Table.Row key={content._id}>
        <Table.Cell>{idx + 1}</Table.Cell>
        <Table.Cell>{moment(content.createdAt).format("MMMM Do YYYY")}</Table.Cell>
        <Table.Cell>{content.keywords}</Table.Cell>
        <Table.Cell>{content.TOC}</Table.Cell>
        <Table.Cell><Button color='green' disabled>Open</Button></Table.Cell>
        <Table.Cell><Button color='red'
          onClick={() => this.handleDeleteContent(content._id)}
        >Delete</Button></Table.Cell>
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
                  <Table.HeaderCell>Open</Table.HeaderCell>
                  <Table.HeaderCell>Delete</Table.HeaderCell>
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

