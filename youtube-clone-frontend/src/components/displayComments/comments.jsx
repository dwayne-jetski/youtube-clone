import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'


function buildComments(props){

    console.log("props.commentList: ", props.commentList.data)
    let comments = [];
    comments = props.commentList.data

    let commentSection = comments.map((commentList, index)=>{
        
        const { id, likes, dislikes, text, replies, postDate } = commentList

        
        return(
            <div>
                <Col name={id}>
                    
                    <Row>
                        <Col xs={3} >
                            <Row>
                                Anonymous
                            </Row>
                            <Row className="border border-dark">
                                Picture    
                                    <br/>
                                    <br/>
                                    <br/>
                                Picture
                            </Row>
                        </Col>
                        <Col xs={8} >    
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
                            {buildComments(replies)}
                        </Col>    
                    </Row>
                </Col>
            </div>
        )
    })
   
    return(
        commentSection
    )

    
}

export default buildComments;