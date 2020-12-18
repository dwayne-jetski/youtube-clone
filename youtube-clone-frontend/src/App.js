import React from 'react';
import './App.css';
import NavBar from './components/navBar/navBar'
import HomePageContent from './components/homePageContent/homePageContent'
import DisplaySearchResults from './components/searchResultsContent/searchResultsContent'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      viewingHomePage: true,
      viewingSearchResults: false,
      viewingVideoPlayer: false,
      searchBarVal: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  handleChange(event){
      
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});

  }

  handleSubmit(event){

    event.preventDefault();

    this.setState({
      viewingHomePage: false,
      viewingSearchResults: true,
      viewingVideoPlayer: true,
    })
    

  }


  


  render(){

    console.log('viewing home page?: ', this.state.viewingHomePage);
    console.log('viewing Search results?: ', this.state.viewingSearchResults);
    console.log('viewing video player?: ', this.state.viewingVideoPlayer);
    console.log('Search Bar Value: ', this.state.searchBarVal)

    if(this.state.viewingHomePage === true && this.state.viewingSearchResults === false && this.state.viewingVideoPlayer === false){
      return(
        <React.Fragment bg="dark">
          <NavBar handleSearchbarChange={()=> this.handleChange} handleSearchSumbit={()=>this.handleSubmit}/>
          <HomePageContent/>
        </React.Fragment>
      )
    } else if(this.state.viewingHomePage === false && this.state.viewingSearchResults === true && this.state.viewingVideoPlayer === false){
      return(
        <React.Fragment bg="dark">
          <NavBar handleSearchbarChange={()=> this.handleChange} handleSumbit={()=>this.handleSubmit}/>
          <DisplaySearchResults/>
        </React.Fragment>
      )
    } else if(this.state.viewingHomePage === false && this.state.viewingSearchResults === false && this.state.viewingVideoPlayer === true){
      return(
        <React.Fragment bg="dark">
          <NavBar handleSearchbarChange={()=> this.handleChange} handleSumbit={()=>this.handleSubmit}/>
          <HomePageContent/>
        </React.Fragment>
      )
    }


  }

}

export default App;
