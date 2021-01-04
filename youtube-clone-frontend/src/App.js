import React from 'react';
import './App.css';
import NavBar from './components/navBar/navBar'
import HomePageContent from './components/homePageContent/homePageContent'
import DisplaySearchResults from './components/searchResultsContent/searchResultsContent'
import youtube from './api/youtube'
import axios from 'axios';


//API KEY: AIzaSyBsU5PWYl_AesH3un5GvQ3gMu-3IZkpsxE

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      viewingHomePage: true,
      viewingSearchResults: false,
      viewingVideoPlayer: false,
      searchBarVal: '',
      searchTerm: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  handleChange(event){
      
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});

  }

  handleSubmit = async (event)=>{

    event.preventDefault();
    console.log('handle request')

    this.setState({
      viewingHomePage: false,
      viewingSearchResults: true,
      viewingVideoPlayer: false,
      searchTerm: this.state.searchBarVal,
    })

    const response = await youtube.get('search', {
      params: {
        part: 'snippet',
        maxResults: 5,
        key: 'AIzaSyBsU5PWYl_AesH3un5GvQ3gMu-3IZkpsxE',
        q: this.state.searchTerm
      }
    })
    
    console.log(response)

  }


  


  render(){

    console.log('viewing home page?: ', this.state.viewingHomePage);
    console.log('viewing Search results?: ', this.state.viewingSearchResults);
    console.log('viewing video player?: ', this.state.viewingVideoPlayer);
    console.log('Search Bar Value: ', this.state.searchBarVal);
    console.log('Search Term: ', this.state.searchTerm);

    if(this.state.viewingHomePage === true && this.state.viewingSearchResults === false && this.state.viewingVideoPlayer === false){
      return(
        <React.Fragment>
          <NavBar 
          handleSearchbarChange={()=> this.handleChange} 
          handleSearch={()=>this.handleSubmit}
          />
          <HomePageContent/>
        </React.Fragment>
      )
    } else if(this.state.viewingHomePage === false && this.state.viewingSearchResults === true && this.state.viewingVideoPlayer === false){
      return(
        <React.Fragment>
          <NavBar handleSearchbarChange={()=> this.handleChange} handleSearch={()=>this.handleSubmit}/>
          <DisplaySearchResults searchResult={this.state.searchBarVal}/>
        </React.Fragment>
      )
    } else if(this.state.viewingHomePage === false && this.state.viewingSearchResults === false && this.state.viewingVideoPlayer === true){
      return(
        <React.Fragment>
          <NavBar handleSearchbarChange={()=> this.handleChange} handleSearch={()=>this.handleSubmit}/>
          <HomePageContent/>
        </React.Fragment>
      )
    }


  }

}

export default App;
