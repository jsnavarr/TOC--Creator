import React, {Component} from 'react';
import { Table, Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import './MyContentPage.css';
import contentService from '../../utils/contentService';

import moment from 'moment';

class MyContentPage extends Component {
  async componentDidMount() {
    const contents = await contentService.show(this.props.user._id);
    this.props.handleMyContent(contents);
  }

  async handleDeleteContent(id){
    await contentService.deleteContent(id);
    const contents = this.props.contents.filter(content => content._id !== id);
    this.props.handleMyContent(contents);
  }

  render(){
    // console.log('the content', this.props);
    const contentRows = this.props.contents.map((content, idx) => (
      <Table.Row key={content._id}>
        <Table.Cell>{idx + 1}</Table.Cell>
        <Table.Cell>{moment(content.createdAt).format("MMMM Do YYYY")}</Table.Cell>
        <Table.Cell>{content.keywords}</Table.Cell>
        <Table.Cell>
          <div style={{ pointerEvents: 'none' }} dangerouslySetInnerHTML = {{ __html: content.TOC }} />
        </Table.Cell>
        <Table.Cell>
          <button className="ui green button">
          <Link className="viewContent btn btn-default btn-sm" 
            to={`/mycontent/${content._id}`}
            style={{
              color: 'white',
            }}
            >
            View</Link>
          </button>
          </Table.Cell>
        <Table.Cell><Button color='red'
          onClick={() => this.handleDeleteContent(content._id)}
        >Delete</Button></Table.Cell>
      </Table.Row>
    ));

    return (
        <div className='MyContent'>
          <header className='header-footer'>My Content</header>
          <div id="LinkBackHome">
            <Link className="cancel btn btn-default btn-sm" to='/'>Home</Link>
          </div>
          {this.props.contents.length ?
          <div>
            <Table id="MyContentTable" celled striped size='small'>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>#</Table.HeaderCell>
                  <Table.HeaderCell>Date Created</Table.HeaderCell>
                  <Table.HeaderCell>Keywords</Table.HeaderCell>
                  <Table.HeaderCell>TOC</Table.HeaderCell>
                  <Table.HeaderCell>View</Table.HeaderCell>
                  <Table.HeaderCell>Delete</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {contentRows}
              </Table.Body>
            </Table>
            </div>
            :
            <h4 className='text-info'>No Content saved yet</h4>
          }
        </div>
    );
  }
};

export default MyContentPage;
