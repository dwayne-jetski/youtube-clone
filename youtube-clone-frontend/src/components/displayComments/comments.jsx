import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import axios from 'axios';
import DisplayReplyBox from '../displayReplyBox/displayReplyBox'





function BuildComments(props){


    console.log('props.commentData: ', props.commentData);

    const [reply, setReply] = useState(false);

    let commentSection;
 
    if(props.commentData === null){
    commentSection = [<div>Loading...</div>];
    }
    else if (props.commentData !== null){ 
        
        console.log('Hook Comment Data: ', props.commentData)
        commentSection = props.commentData.map((commentList, index, commentId)=>{
        
        const { _id, videoId,  likes, dislikes, text, replies, postDate } = commentList
        console.log('COMMENT ID: ', _id)
        
            return(

                <Container className="border border-dark">
                    
                        <Row> {/* Commentor and Body */}
                            <Col xs={3}>
                                Anonymous
                            </Col>
                            <Col xs={3}> </Col>
                            <Col xs={6}>
                                {text}
                            </Col>
                        </Row>

                        <Col xs={12}></Col>
                        <Row >{/* like, dislike, reply buttons */}
                            <Col xs={7}>
                                    <Button size="sm" onClick={props.handleLikeSubmit()} name="likes" id={_id} val={likes}>Likes: {likes}</Button>
                                    <Button size="sm" onClick={props.handleDislikeSubmit()} name="dislikes" id={_id} val={dislikes}>Dislikes: {dislikes}</Button>
                            </Col>
                            <Col>
                                <Button size="sm"  /* onClick={()=>handleReply()} */>
                                    Reply
                                </Button>
                                <Row>
                                    {DisplayReplyBox(reply, props)}
                                </Row>
                                
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={3}/>
                            <Col xs={9}>
                                {/* {BuildComments(replies)} */}
                            </Col>
                            
                        </Row>
                    

                </Container>
                
                    
            
            );
        });
  
    }


    
    return(
        commentSection
    )

  
    
}

export default BuildComments;