import React, { Component } from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import { Segment, Button, Input} from 'semantic-ui-react'
import './App.css';
import userService from './utils/userService';
import NavBar from './components/NavBar/NavBar';
import SignupPage from './pages/SignupPage/SignupPage';
import MyContentPage from './pages/MyContentPage/MyContentPage';
import LoginPage from './pages/LoginPage/LoginPage';
import contentService from './utils/contentService';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regex1: /(<\s*h([1-5]))\s*(id\s*=\s*"(\w+)"\s*)*>/g, //regExp for open H tags with and without id
      regex2: /<\s*\/h[1-5]\s*>/g, //regExp for closing H tags
      input:"", //HTML without TOC
      TOC:"", //the TOC
      output:"", //HTML with TOC
      contentSaved: false,
      contents: [],
      user: userService.getUser()
    };
    
  }

  formTOC (TOC, HNumberArray){
    //chedk if there is data to format
    var newTOC=null;
    if (TOC[0]){
      //add the first TOC line
      newTOC="<ul>\n\t<li>"+TOC[0]+"</li>\n";
      var tabs="\t";
      //loop through each element (starting in the 2nd)
      for(var i=1; i<TOC.length; i++){
        if(HNumberArray[i]===HNumberArray[i-1]){
          //if H tag number is the same than previous one then just add <li> tags
          newTOC+=tabs+"<li>"+TOC[i]+"</li>\n";
        } else if(HNumberArray[i]>HNumberArray[i-1]){
          //if H tag number is bigger than previous one then add <ul> and <li>
          newTOC+=tabs+"<ul>\n";
          //<li> will have one level more of indentation
          tabs+="\t";
          newTOC+=tabs+"<li>"+TOC[i]+"</li>\n";
        } else {
          //H tag number is smaller than previous one then close <ul>
          //with one level less of indentation
          tabs=tabs.slice(1);
          newTOC+=tabs+"</ul>\n";
          //add the h tab inside an <li> tag
          newTOC+=tabs+"<li>"+TOC[i]+"</li>\n";
        }
        // console.log("tabs ", tabs.length);
      }
      //close any remaining <ul>
      var regExp=/\t/g;
      //make a copy of the tabs removing one tab
      var newTabs = tabs.slice(1);
      //one closing <ul> for any remaining tab
      while(regExp.exec(tabs)!=null){
        newTabs.slice(1);
        newTOC+=newTabs+"</ul>";
      }
      //need to close always one <ul> because the first one has no indentation
      // newTOC+="</ul>";
      console.log('Final TOC \n', newTOC);
    }
    return newTOC;
  }

  parseHTag(regExpO, regExpC, str){
    var regExpOIdx=0; //index returned by parsing the opening H tag
    var regExpCIdx=0; //index returned by parsing the closing H tag
    var inputIdx=0; //index to the start of next frame from str (input) to be concatenated to the output
    var TOCline=""; //HTML line created which will be added to the TOC
    var TOC=[]; //The TOC
    var openingH; //to store the result from executing the regExp to find the opening H tag
    var closingH; //to store the result from executing the regExp to find the closing H tag
    var HNumberArray=[]; //to remember each H number (1..5) for each entry in the TOC
    var id=12345678; //temporary number to use for the newly added IDs
    var output=""; //the HTML output with TOC on the top
    var updatedHTag; //to store the updated H tag (with a newly added ID when none is present)
    const regExp=/<\s*h[1-5]\s*id\s*=\s*"\w*"\s*>/; // regular expression to test if tag has already an ID
    const regExpCH=/<\s*\/h[1-5]\s*>/;
    //parse the HTML input file while there are opening H tags
    while((openingH = regExpO.exec(str))!== null){
      //get the index of the opening H tag
      regExpOIdx = regExpO.lastIndex; 
      //get the closing H tag
      closingH = regExpC.exec(str);
      //get the index of the closing H tag
      regExpCIdx = regExpC.lastIndex;

      if(openingH && closingH){
        //check if there is already an "id"
        if(!regExp.test(openingH)){
          // console.log('there is no ID');
          //increase id so it is unique
          id+=1;
          //create the new entry to be added to the TOC
          //it will start with the opening H, add an anchor tag referencing the new id
          //then add the rest of the content from where the opening H tag ends to the end
          //of the closing H tag
          //close the anchor tag
          TOCline=`<a href="#${id}">`+(str.slice(regExpOIdx, regExpCIdx)).replace(regExpCH, '')+'</a>';
          //create the content to be added to the output 
          //starting from the end of previous closing H tag to the start of this opening H tag
          //then add the opening H tag followed by the new id
          //then add whatever is inside the H tags and the closing H tag
          updatedHTag=str.slice(inputIdx, regExpOIdx-openingH.length-1)+openingH[1]+` id="${id}">`+str.slice(regExpOIdx,regExpCIdx+1);
          //add the updated H tag to the output
          output+=updatedHTag;
          //add the new TOC line to TOC
          // TOC+=TOCline+"\n";
          //update the pointer to be used by the next entry, it is the index of the closing H tag
          inputIdx= regExpCIdx+1;
        } else {
          //there is already an ID
          // console.log('existing ID ', openingH[2]);
          //create the new entry to be added to the TOC
          //it will start with the opening H. Add an anchor tag referencing the existing id
          //then add the rest of the content from where the opening H tag ends to the end
          //of the closing H tag
          //close the anchor tag
          TOCline=`<a href="#${openingH[4]}"`+'>'+(str.slice(regExpOIdx, regExpCIdx)).replace(regExpCH, '')+'</a>';
          //create the content to be added to the output 
          //starting from the end of previous closing H tag
          //including this H tag as is (since it has already an id) 
          //then add whatever is inside the H tags and the closing H tag
          updatedHTag=str.slice(inputIdx, regExpCIdx+1);
          //add the updated H tag to the output
          output+=updatedHTag;
          //add the new TOC line to TOC
          // TOC+=TOCline+"\n";
          //update the pointer to be used by the next entry, it is the index of the closing H tag
          inputIdx= regExpCIdx+1;
        } 
        //add the TOCline to the TOC 
        TOC.push(TOCline);
        //kepp track of the H tag numbers (1..5)
        // console.log('H number ', openingH[1], openingH[2], openingH[3])
        HNumberArray.push(parseInt(openingH[2]));
        //  = this.addLineToTOC(TOCline, TOC, prevHNumber, parseInt(openingH[2]));
        // prevHNumber=parseInt(openingH[2]);
      } else {
        console.log('Some of the opening/closing H tags did not match');
        return null;
      }
    }
    //get the rest of the input from regExpCIdx to the end of the HTML input file
    output+=str.slice(regExpCIdx,str.length);
    //form the TOC with proper ul and li tags
    TOC = this.formTOC(TOC, HNumberArray);
    // console.log('new input \n'+str);
    console.log('TOC \n'+TOC);
    console.log('H tags \n'+HNumberArray);
    console.log('output --\n', output);
    console.log('input --\n', str);
    return [output, TOC];
  };

  handleTextAreaChange = async (event)=>{
    event.persist();
    var input = event.currentTarget.value;
    //if there is data in the input
    if (input){
      var r = this.parseHTag(this.state.regex1, this.state.regex2, input);
      //if there is TOC
      if (r && r.length>=2 && r[1]){
      //set the output to the text area on the right
      document.getElementById("HTMLOutput").value = r[1]+'\n'+r[0];
      //set the states of input (no TOC) and output (with TOC)
      this.setState({
        input: input,
        TOC: r[1],
        output: r[1]+'\n'+r[0]});  
      } else {
        //the content was deleted so clean the output 
        document.getElementById("HTMLOutput").value = "";
        this.setState({
          input: "", 
          output: ""});    
      }
    }
  }

  handleNewContent = () => {
    // console.log('app.js state ', this.state);
    document.getElementById("inputKeyWords").value="";
    document.getElementById("HTMLOutput").value = "";
    document.getElementById("HTMLInput").value = "";
    this.setState({
      input:"",
      output:"",
      contentSaved: false});
  }

  handleSaveContent = () => {
    // console.log('app.js state ', this.state);
    var keywords = document.getElementById("inputKeyWords").value;
    contentService.create({keywords, input: this.state.input, output:this.state.output, TOC: this.state.TOC});
    this.setState({contentSaved: true});
  }

  handleMyContent = (contents) => {
    this.setState({ contents });

  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
  }

  async componentDidMount() {
    const user = userService.getUser();
    this.setState({ user });
  }

  render() {
    // console.log('content saved ', this.state.contentSaved);
    return (
      <div>
      <Switch>
        <Route exact path='/' render={() =>
        <div>
          <NavBar
            user={this.state.user}
            handleLogout={this.handleLogout}
          />
          <Segment.Group stacked>
            <Segment.Group horizontal>
              <Segment inverted color='teal'>
                <textarea id="HTMLInput" rows="30" cols="80"
                  disabled = {this.state.contentSaved}
                  onChange={this.handleTextAreaChange}
                ></textarea>
              </Segment>
              <Segment inverted color='teal'>
              <textarea disabled id="HTMLOutput" rows="30" cols="80"
                value={this.state.output}
              ></textarea>
              </Segment>
            </Segment.Group>
            <Segment.Group horizontal>
              <Segment>
                <Input fluid id="inputKeyWords" label='key words' placeholder='my key words' />
              </Segment>
            </Segment.Group>
            <Segment.Group horizontal>
              <Segment inverted color='black'>
                <Button inverted
                    disabled = {!this.state.user || !this.state.contentSaved}
                    color='yellow'
                    onClick={this.handleNewContent}
                  >New</Button>
                <Button inverted
                    disabled = {!this.state.user || this.state.input==="" || this.state.contentSaved}
                    color='green'
                    onClick={this.handleSaveContent}
                  >Save</Button>
              </Segment>
              <Segment inverted color='black' textAlign='center'>
                {this.state.user && <Link to='/mycontent' className='MyContent-Link'>
                View My Content</Link>}
              </Segment>
            </Segment.Group>
          </Segment.Group>
          </div>
        }/>
        <Route exact path='/mycontent' render={({ history }) =>
          userService.getUser() ?
          <MyContentPage
            history={history}
            user={this.state.user}
            contents={this.state.contents}
            handleMyContent={this.handleMyContent}
          />
          :
            <Redirect to='/login'/>
        }/>        
        <Route exact path='/signup' render={({ history }) => 
          <SignupPage
            history={history}
            handleSignupOrLogin={this.handleSignupOrLogin}
          />
        }/>
        <Route exact path='/login' render={({ history }) => 
          <LoginPage
            history={history}
            handleSignupOrLogin={this.handleSignupOrLogin}
          />
        }/>
        </Switch>
      </div>
    );
  }
}

export default App;
