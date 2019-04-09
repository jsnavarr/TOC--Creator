import React, { Component } from 'react';
import { Segment, Button} from 'semantic-ui-react'
import './App.css';


class App extends Component {
  handleCreateTOC(){
    var input = document.getElementById("HTMLInput").value;
    var regex1 = /<\s*h[1-5]\s*/g;
    var regex2 = /<\s*\/h[1-5]\s*>/g;
    var output=document.getElementById("HTMLOutput");
    var substring;
    var idx1=[], idx2=[];
    var substring1=[];
    var substring2=[];
    while ((substring = regex1.exec(input)) !== null) {
      substring1.push(substring[0]);
      idx1.push(regex1.lastIndex);
    }
    while ((substring = regex2.exec(input)) !== null) {
      substring2.push(substring[0]);
      idx2.push(regex2.lastIndex);
    }
    console.log(substring1);
    console.log(idx1);
    console.log(substring2);
    console.log(idx2);

    //create the TOC from the index in idx1 and idx2
    var TOC="";
    idx1.forEach(function(i, index2){
      TOC+=substring1[index2]+input.slice(i, idx2[index2])+"\n";
    })
    console.log(TOC);
    output.value=TOC;
  }

  render() {
    return (
      <div className="App">
        <Segment inverted style={{display: "flex"}}>
          <textarea id="HTMLInput" rows="40" cols="80"></textarea>
          <div>
            <Button positive
              onClick={this.handleCreateTOC}
            >Create TOC</Button>
          </div>
          <textarea id="HTMLOutput" rows="40" cols="80"></textarea>
        </Segment>
      </div>
    );
  }
}

export default App;
