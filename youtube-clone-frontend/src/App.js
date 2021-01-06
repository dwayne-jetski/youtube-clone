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
      selectedVideo: '',
      relatedVideo: ``,
      comments: null,
      newCommentBody: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectVideo = this.selectVideo.bind(this);
    this.returnHome = this.returnHome.bind(this);
    this.handleCommentSubmit= this.handleCommentSubmit.bind(this);
    
  }

  selectVideo = async (event)=>{
    event.preventDefault();

    let nam = event.target.name;
    let id = event.target.id;
    const response = await youtube.get('search', {
      params: {
        part: 'snippet',
        maxResults: 15,
        relatedVideo: null,
        key: 'AIzaSyDG-7aya2AjiTl6Rns68VAgBHm3K3P0PRE',
        
      }
    });

    const video = this.state.selectedVideo;
    const comments = await axios.get('http://localhost:5000/api/comments/', {
      params: {
        videoId: video
      }
    })

    this.setState({
      [nam]: id,
      viewingHomePage: false,
      viewingSearchResults: false,
      viewingVideoPlayer: true,
      relatedVideo: response,
      comments: comments
    })
  }

  returnHome(event){
    event.preventDefault();
    
    this.setState({
      viewingHomePage: true,
      viewingSearchResults: false,
      viewingVideoPlayer: false
    })
  }

  handleChange(event){
      
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});

  }

  handleCommentSubmit = async (event)=>{

    event.preventDefault();

    const comment = {
      videoId: this.state.selectedVideo,
      text: this.state.newCommentBody,
    }

    axios.post('http://localhost:5000/api/comments/', comment)
    .then(res => {
      console.log(res);
    });

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

  getCommentsByVideo(){

  }
  


  render(){

    console.log('viewing home page?: ', this.state.viewingHomePage);
    console.log('viewing Search results?: ', this.state.viewingSearchResults);
    console.log('viewing video player?: ', this.state.viewingVideoPlayer);
    console.log('Search Bar Value: ', this.state.searchBarVal);
    console.log('Search Term: ', this.state.searchTerm);
    console.log('Search Collection: ', this.state.searchCollection);
    console.log('Search Collection Length: ', this.state.searchCollection.length);
    console.log('Selected Video: ', this.state.selectedVideo);
    console.log('New Comment Body: ', this.state.newCommentBody);
    console.log('Comment Data: ', this.state.comments)

    if(this.state.viewingHomePage === true && this.state.viewingSearchResults === false && this.state.viewingVideoPlayer === false){
      return(
        <React.Fragment>
          <NavBar 
          handleSearchbarChange={()=> this.handleChange} 
          handleSearch={()=>this.handleSubmit}
          searchBar={this.state.searchBarVal}
          returnHome={()=> this.returnHome}/>
          <HomePageContent/>
        </React.Fragment>
      )
    } else if(this.state.viewingHomePage === false && this.state.viewingSearchResults === true && this.state.viewingVideoPlayer === false){
      return(
        <React.Fragment>
          <NavBar 
          handleSearchbarChange={()=> this.handleChange} 
          handleSearch={()=>this.handleSubmit}
          returnHome={()=> this.returnHome}/>
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
          handleSearch={()=>this.handleSubmit}
          returnHome={()=> this.returnHome}/>
          <VideoPlayer 
          selectAVideo = {()=>this.selectVideo} 
          selectedVideo={this.state.selectedVideo}
          commentList = {this.state.comments}
          newCommentBody = {this.state.newCommentBody}
          handleCommentChange={()=> this.handleChange} 
          handleSubmit={()=>this.handleCommentSubmit}
          />
        </React.Fragment>
      )
    }
  }
}

export default App;
