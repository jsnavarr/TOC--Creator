import React, {Component} from 'react';
import { Table} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import './ViewContentPage.css';
import contentService from '../../utils/contentService';

import moment from 'moment';

class ViewContentPage extends Component {
  constructor() {
    super();
    this.state = {
      content: []
    }; 
  }
  
  async componentDidMount() {
    const id = this.props.match.params.id;
    const content = await contentService.openContent(id);
    this.setState({content});
  }

  render(){
    return (
        <div className='ViewContent'>
          <header className='header-footer'>View Content</header>
          <div id="LinkBackHome">
            <Link className="cancel btn btn-default btn-sm" to='/'>Home</Link>
          </div>
          {this.state.content.length ?
            <div>
            <Table id="MyContentTable" celled striped size='small'>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Date Created</Table.HeaderCell>
                  <Table.HeaderCell>Keywords</Table.HeaderCell>
                  <Table.HeaderCell>TOC</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>{moment(this.state.content[0].createdAt).format("MMMM Do YYYY")}</Table.Cell>
                  <Table.Cell>{this.state.content[0].keywords}</Table.Cell>
                  <Table.Cell>
                    <div style={{ pointerEvents: 'none' }} dangerouslySetInnerHTML = {{ __html: this.state.content[0].TOC }} />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <textarea disabled id="fullHTML" rows="30"
                value={this.state.content[0].HTML_TOC}
            ></textarea>
            </div>
            :
              <h4 className='text-info'>No Content saved yet</h4>}
        </div>
    );
  }
};

export default ViewContentPage;