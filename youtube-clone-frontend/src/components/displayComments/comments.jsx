import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import axios from 'axios';




function BuildComments(props){

    const [comments, setComments] = useState(null); 
    const [count, setCount] = useState(0);

  

    if(comments === null){
        axios.get('http://localhost:5000/api/comments/' + props.selectedVideo).then(response=>{
            console.log('RESPONSE: ', response)
            setComments(response);
        }).catch((ex)=>{console.log(ex)});
    }

    
    let commentSection = [<div>Loading...</div>];

    if(comments !== null){ 
        console.log('Hook Comment Data: ', comments.data)
        commentSection = comments.data.map((commentList, index, commentId)=>{
        
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
                                <Button size="sm" onClick=/* funciton to display a new comment*/"" >
                                    Reply
                                </Button>
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