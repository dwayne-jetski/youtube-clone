import React from 'react';
import './App.css';
import NavBar from './components/navBar/navBar'
import HomePageContent from './components/homePageContent/homePageContent'
import DisplaySearchResults from './components/searchResultsContent/searchResultsContent'
import youtube from './api/youtube'
import axios from 'axios';
import VideoPlayer from './components/videoPlayer/videoPlayer'


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
      searchCollection: [],
      selectedVideo: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectVideo = this.selectVideo.bind(this);
    
  }

  selectVideo(event){
    event.preventDefault();

    let nam = event.target.name;
    let id = event.target.id;

    this.setState({
      [nam]: id,
      viewingHomePage: false,
      viewingSearchResults: false,
      viewingVideoPlayer: true
    })
  }


  handleChange(event){
      
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});

  }

  handleSubmit = async (event)=>{

    event.preventDefault();

    if(this.state.searchBarVal.length<1){
      return
    }

    console.log('handle request')


    const response = await youtube.get('search', {
      params: {
        part: 'snippet',
        maxResults: 15,
        key: 'AIzaSyAf1AqBRPpPuTaZruy5z971niRJkDnoj4I',
        q: this.state.searchBarVal
      }
    });

    this.setState({
      viewingHomePage: false,
      viewingSearchResults: true,
      viewingVideoPlayer: false,
    })
    
    this.setState({
      searchCollection: response.data.items
    });

    console.log(response);

  }


  


  render(){

    console.log('viewing home page?: ', this.state.viewingHomePage);
    console.log('viewing Search results?: ', this.state.viewingSearchResults);
    console.log('viewing video player?: ', this.state.viewingVideoPlayer);
    console.log('Search Bar Value: ', this.state.searchBarVal);
    console.log('Search Term: ', this.state.searchTerm);
    console.log('Search Collection: ', this.state.searchCollection);
    console.log('Search Collection Length: ', this.state.searchCollection.length);
    console.log('Selected Video: ', this.state.selectedVideo)

    if(this.state.viewingHomePage === true && this.state.viewingSearchResults === false && this.state.viewingVideoPlayer === false){
      return(
        <React.Fragment>
          <NavBar 
          handleSearchbarChange={()=> this.handleChange} 
          handleSearch={()=>this.handleSubmit}
          searchBar={this.state.searchBarVal}/>
          <HomePageContent/>
        </React.Fragment>
      )
    } else if(this.state.viewingHomePage === false && this.state.viewingSearchResults === true && this.state.viewingVideoPlayer === false){
      return(
        <React.Fragment>
          <NavBar handleSearchbarChange={()=> this.handleChange} handleSearch={()=>this.handleSubmit}/>
          <DisplaySearchResults 
          searchResult={this.state.searchBarVal} 
          collection={this.state.searchCollection}
          searchingFor={this.state.searchBarVal}
          selectAVideo = {()=>this.selectVideo}/>
        </React.Fragment>
      )
    } else if(this.state.viewingHomePage === false && this.state.viewingSearchResults === false && this.state.viewingVideoPlayer === true){
      return(
        <React.Fragment>
          <NavBar 
          handleSearchbarChange={()=> this.handleChange} 
          handleSearch={()=>this.handleSubmit}/>
          <VideoPlayer selectAVideo = {()=>this.selectVideo} selectedVideo={this.state.selectedVideo}/>
        </React.Fragment>
      )
    }
  }
}

export default App;
