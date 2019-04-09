import React, { Component } from 'react';
import { Segment, Button} from 'semantic-ui-react'
import './App.css';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      regex1: /<\s*h[1-5]\s*/g, //regExp for open H tags
      regex2: /<\s*\/h[1-5]\s*>/g, //regExp for closing H tags
      output:"" //HTML with TOC
    };
  }

  parseHTag(regExp, str){
    var substring, strResult=[], idxResult=[];
    while ((substring = regExp.exec(str)) !== null) {
      strResult.push(substring[0]);
      idxResult.push(regExp.lastIndex);
    }
    return [strResult, idxResult];
  };

  createTOC(input, HOArray, idxHOA, idxHCA){
    var TOC="";
    idxHOA.forEach(function(i, index2){
      TOC+=HOArray[index2]+input.slice(i, idxHCA[index2])+"\n";
    });
    return TOC;
  }

  handleTextAreaChange = async (event)=>{
    event.persist();
    var input = event.currentTarget.value;

    var r = this.parseHTag(this.state.regex1, input);
    var HOArray = r[0];
    var idxHOA = r[1];

    console.log('HOArray ', HOArray);
    console.log('idxHOA ', idxHOA);

    r = this.parseHTag(this.state.regex2, input);
    var HCArray = r[0];
    var idxHCA = r[1];

    console.log('HCArray ', HCArray);
    console.log('idxHCA ', idxHCA);

    // create the TOC from the index in idx1 and idx2
    var TOC = this.createTOC(input, HOArray, idxHOA, idxHCA);

    //if there is not id in each <H> tag then add one


    this.setState(() => ({
      output: TOC
    }),()=>{
      console.log('HTML output \n', this.state.output);
    });
  }

  render() {
    return (
      <div className="App">
        <Segment inverted style={{display: "flex"}}>
          <textarea id="HTMLInput" rows="40" cols="80"
          onChange={this.handleTextAreaChange}
          ></textarea>
          <div>
            <Button positive
              // onClick={this.handleCreateTOC}
            >Create TOC</Button>
          </div>
          <textarea id="HTMLOutput" rows="40" cols="80"></textarea>
        </Segment>
      </div>
    );
  }
}

export default App;
