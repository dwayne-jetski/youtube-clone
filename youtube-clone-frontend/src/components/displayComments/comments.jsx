import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import axios from 'axios';

function BuildComments(props){

    const [comments, setComments] = useState(null); 

    if(comments === null){
        axios.get('http://localhost:5000/api/comments/' + props.selectedVideo).then(response=>{
            console.log('RESPONSE: ', response)
            setComments(response.data);
        }).catch((ex)=>{console.log(ex)});
    }
    let subComments = [];
    console.log("hook comments: ", comments);
    let commentSection = [<div></div>];

    if(comments !== null)
    { commentSection = comments.map((commentList, index)=>{
        
        const { id, videoId,  likes, dislikes, text, replies, postDate } = commentList

        
        return(
            <div>
                <Col name={id}>
                    
                    <Row>
                        <Col xs={3} >
                            <Row>
                                Anonymous
                            </Row>
                            <Row className="border border-dark">
                            </Row>
                        </Col>
                        <Col xs={3}>

                        </Col>
                        <Col xs={6} >    
                            {text}
                        </Col>
                    </Row>

                    <Row className="border-bottom border-dark">
                        <Col xs= {7}  >
                            <Button>Likes: {likes}</Button> <Button>Dislikes: {dislikes}</Button>
                        </Col>
                        <Col>
                            <Button size="sm">
                                Reply
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={3}>
                        </Col>
                        <Col sm={9}>
                            {/* {BuildComments(replies)} */}
                        </Col>    
                    </Row>
                </Col>
            </div>
        )
    })
   }
    return(
        commentSection
    )

    
}

export default BuildComments;