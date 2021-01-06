import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import buildComments from '../displayComments/comments'
import newComment from '../newComment/newComment'


function VideoPlayer(props){

    const currentlyPlaying = `https://www.youtube.com/embed/${props.selectedVideo}`

    return(
        <div>
            <Row>
                <h1></h1>
            </Row>
            <Row>
                <Col xs={3}>
                </Col>
                <Col xs={8}>
                    <Row>
                    <iframe width="560" height="315" src={currentlyPlaying} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                       
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
                                    {buildComments(props)}
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    
                </Col>
                <Col xs={3}>
                    {/* Recommended Content goes Here */}
                </Col>
            </Row>
        </div>
    )
    }


    export default VideoPlayer;