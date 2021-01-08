import React from 'react';
import './App.css';
import NavBar from './components/navBar/navBar'
import HomePageContent from './components/homePageContent/homePageContent'
import DisplaySearchResults from './components/searchResultsContent/searchResultsContent'
import youtube from './api/youtube'
import axios from 'axios';
import VideoPlayer from './components/videoPlayer/videoPlayer'
import BuildComments from './components/displayComments/comments'


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
      selectedVideoTitle: '',
      relatedVideo: ``,
      comments: [],
      newCommentBody: '',
      likes: 0,
      dislikes: 0,
      commentId: '',
      count: 0

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectVideo = this.selectVideo.bind(this);
    this.returnHome = this.returnHome.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handleDislikeSubmit = this.handleDislikeSubmit.bind(this);
    this.handleLikeSubmit = this.handleLikeSubmit.bind(this);
    
  }

  selectVideo = async (event)=>{
    event.preventDefault();

    let nam = event.target.name;
    let id = event.target.id;
    let title = event.target.title;
    console.log('HERE IS THE TITLE OF THE VIDEO!: ', title)
    const response = await youtube.get('search', {
      params: {
        part: 'snippet',
        maxResults: 15,
        relatedVideo: null,
        key: 'AIzaSyBeQWXnaQFOD6biPec4eTykezcr60IrZGc',
        
      }
    });

    this.setState({
      [nam]: id,
      viewingHomePage: false,
      viewingSearchResults: false,
      viewingVideoPlayer: true,
      relatedVideo: response,
      selectedVideoTitle: title
      
    })

    
  }

  returnHome(event){
    event.preventDefault();
    
    this.setState({
      viewingHomePage: true,
      viewingSearchResults: false,
      viewingVideoPlayer: false,
      searchBarVal: '',
      searchTerm: '',
      searchCollection: [],
      selectedVideo: '',
      relatedVideo: ``,
      comments: [],
      newCommentBody: '',
      likes: 0,
      dislikes: 0,
      commentId: ''
    })
  }



  handleChange(event){
      
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});

  }

  handleDislikeSubmit = async (event)=>{
    event.preventDefault();

    let nam = event.target.name;
    let val = event.target.value + 1;
    let currentCommentId = event.target.id;
    this.setState({
      [nam]: val,
      commentId: currentCommentId,
    })

    
    const param = {
      dislikes: val
    };

    console.log('handleRequest, commentId: http://localhost:5000/api/dislike/', currentCommentId);
    axios.get('http://localhost:5000/api/comments/dislike/' + currentCommentId)
    .then(response =>{
      console.log("This is the response David wants to see: ",response)
      this.setState({
        likes: 0
      })
    })

  }

  handleLikeSubmit = async (event) =>{
    event.preventDefault();

    /* let nam = event.target.name;
    let val = event.target.value + 1;
    this.setState({
      [nam]: val,
      commentId: currentCommentId,
    })
    
    
    const param = {
      likes: val
    };
     */


    let currentCommentId = event.target.id;
    console.log('handleRequest, commentId: http://localhost:5000/api/like/', currentCommentId);
    axios.get('http://localhost:5000/api/comments/like/' + currentCommentId)
    .then(response =>{
      console.log("This is the response David wants to see: ",response)
      this.setState({
        likes: 0,
        selectedVideo: this.state.selectedVideo
      });
    });

    
    console.log('handle request')
    
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
        key: 'AIzaSyBeQWXnaQFOD6biPec4eTykezcr60IrZGc',
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
    console.log('Selected Video: ', this.state.selectedVideo);
    console.log('Selected Video Title: ', this.state.selectedVideoTitle);
    console.log('New Comment Body: ', this.state.newCommentBody);
    console.log('Comment Data: ', this.state.comments);
    console.log('CommentId: ', this.state.commentId);
    console.log('Dislikes: ', this.state.dislikes);
    console.log('Likes: ', this.state.likes);
    console.log('APP.JS Comment ID: ', this.state.commentId);

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
          count={this.state.count}
          videoTitle={this.state.selectedVideoTitle}
          searchResult={this.state.searchBarVal} 
          collection={this.state.searchCollection}
          searchingFor={this.state.searchBarVal}
          selectAVideo = {()=>this.selectVideo} 
          selectedVideo={this.state.selectedVideo}
          comments = {this.state.comments}
          newCommentBody = {this.state.newCommentBody}
          handleCommentChange={()=> this.handleChange} 
          handleSubmit={()=>this.handleCommentSubmit}
          handleDislikeSubmit = {()=>this.handleDislikeSubmit}
          handleLikeSubmit = {()=>this.handleLikeSubmit}
          />
        </React.Fragment>
      )


    }
  }
}

export default App;
