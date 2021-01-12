import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BuildComments from '../displayComments/comments'
import newComment from '../newComment/newComment'
import createSearchResults from '../searchResultsContent/searchResultsContent'


function VideoPlayer(props){

    const currentlyPlaying = `https://www.youtube.com/embed/${props.selectedVideo}`

    console.log('VideoPlayer props.CommentData: ', props.commentData)

    return(
        <div>
            <Row>
                <h1>{props.videoTitle}</h1>
            </Row>
            <Row>
                <Col xs={4}>
                </Col>
                <Col xs={5}>
                    <Row>
                    <iframe title={currentlyPlaying} width="560" height="315" src={currentlyPlaying} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                       
                    </Row>
                    <Col xs={7}>
                        <Row>
                            <h1>COMMENTS</h1>
                        </Row>
                    </Col>
                        {newComment(props)}
                    <Col>

                    </Col>

                    <Col xs={7}>
                        <Row>
                            <Col>
                                <Row>
                                    <BuildComments 
                                    commentData = {props.commentData}
                                    selectedVideo={props.selectedVideo} 
                                    handleLikeSubmit={props.handleLikeSubmit} 
                                    handleDislikeSubmit={props.handleDislikeSubmit} />
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    
                </Col>
                <Col xs={3}>

                    {createSearchResults(props)}    
                
                </Col>
            </Row>
        </div>
    )
    }


    export default VideoPlayer;