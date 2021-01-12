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
      comments: null,
      mostRecentComments: [],
      newCommentBody: '',
      likes: 0,
      dislikes: 0,
      commentId: '',
      description: ''

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectVideo = this.selectVideo.bind();
    this.returnHome = this.returnHome.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handleDislikeSubmit = this.handleDislikeSubmit.bind(this);
    this.handleLikeSubmit = this.handleLikeSubmit.bind(this);
    
  }

  setComments= async (selectedVideo)=>{

    console.log("Video ID in SetComments(): ", selectedVideo)
    
      axios.get('http://localhost:5000/api/comments/' + selectedVideo).then(response=>{
        console.log('RESPONSE: ', response);
        this.setState({
          comments: response.data,
          mostRecentComments: response.data
        });
    }).catch((ex)=>{console.log(ex)});
  }

  selectVideo = async (event)=>{
    event.preventDefault();

    let nam = event.target.name;
    let id = event.target.id;
    let videoTitle = event.target.getAttribute('title');
    let description = event.target.getAttribute('description');

    console.log('----selectVideo content-----')
    console.log('HERE IS THE TITLE OF THE VIDEO!: ', videoTitle)
    console.log('ID: ', id)
    console.log('Description: ', description);
    console.log('----selectVideo content-----')



    console.log("Video ID Going Into SetComments(): ", id)
    this.setComments(id);

    const response = await youtube.get('search', {
      params: {
        part: 'snippet',
        maxResults: 15,
        relatedVideo: null,
        key: 'AIzaSyDPFtKRXuxscC8cjE1JQucpp6CdTil-J88',
        
      }
    });

    this.setState({
      [nam]: id,
      viewingHomePage: false,
      viewingSearchResults: false,
      viewingVideoPlayer: true,
      relatedVideo: response,
      selectedVideoTitle: videoTitle,
      description: description
      
    })
   
    event.target.value = '';
    
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
      commentId: '',
      loadComments: false
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

    
    console.log('handleRequest, commentId: http://localhost:5000/api/like/', currentCommentId);
    axios.get('http://localhost:5000/api/comments/dislike/' + currentCommentId)
    .then(response =>{
      console.log("This is the response David wants to see: ", response)
      this.setState({
        dislikeslikes: 0,
        selectedVideo: this.state.selectedVideo
      });
    });

    let selectedVideo = this.state.selectedVideo;
    
    console.log('handle request')

    this.setComments(selectedVideo);

  
  }

  handleLikeSubmit = async (event) =>{
    event.preventDefault();

    let nam = event.target.name;
    let val = event.target.value + 1;
    let currentCommentId = event.target.id;
    this.setState({
      [nam]: val,
      commentId: currentCommentId,
    })


    
    console.log('handleRequest, commentId: http://localhost:5000/api/like/', currentCommentId);
    axios.get('http://localhost:5000/api/comments/like/' + currentCommentId)
    .then(response =>{
      console.log("This is the response David wants to see: ", response)
      this.setState({
        likes: 0,
        selectedVideo: this.state.selectedVideo
      });
    });

    let selectedVideo = this.state.selectedVideo;
    
    console.log('handle request')

    this.setComments(selectedVideo);
    
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

    this.setState({newCommentBody: ''})

    let selectedVideo = this.state.selectedVideo;
    this.setComments(selectedVideo);
    

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
        key: 'AIzaSyAhGU97XdEWIwuXNYYe5DPGNdrNDtcQ7ss',
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
    console.log('Description: ', this.state.description);
    console.log('---------------next state-----------------------');

    

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
          selectAVideo = {()=>this.selectVideo}
          commentData = {this.state.comments}
          />
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
          description={this.state.description}
          videoTitle={this.state.selectedVideoTitle}
          searchResult={this.state.searchBarVal} 
          collection={this.state.searchCollection}
          searchingFor={this.state.searchBarVal}
          selectAVideo = {()=>this.selectVideo} 
          selectedVideo={this.state.selectedVideo}
          commentData = {this.state.comments}
          newCommentBody = {this.state.newCommentBody}
          handleCommentChange={()=> this.handleChange} 
          handleSubmit={()=>this.handleCommentSubmit}
          handleDislikeSubmit = {()=>this.handleDislikeSubmit}
          handleLikeSubmit = {()=>this.handleLikeSubmit}
          setComments = {()=>this.setComments()}
          />
        </React.Fragment>
      )


    }
  }
}

export default App;
