import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'


function buildCommentTree(props){

    const commentList = [];

    
}

const sampleComments = [{
    videoId: 1,
    commentId: 1,
    likes: 0,
    dislikes: 0,
    text: 'comment 1',
    postDate: null,
    replies: {

        like:   0,
        dislike: 0,
        test: 'comment 1 comment 1',
        postDate: null,

        }
    },
    {
        videoId: 1,
        commentId: 1,
        likes: 0,
        dislikes: 0,
        text: 'comment 2',
        postDate: null,
        replies: {
    
            like:   0,
            dislike: 0,
            test: 'comment 2 => comment 1',
            postDate: null,
    
            }
        },
    
]


function buildComments(props){
    return(
        <div>
            
            <Col>
                
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
                        There will be some content that will show you what is up. 
                        There might even be a border around this to make it look pretty. Maybe even 
                        something like a 500 character limit...hell, Maybe even a 1000 comment limit!
                    </Col>
                </Row>
                <Row className="border-bottom border-dark">
                    <Col xs= {9} >

                    </Col>
                    <Col>
                        <Button size="sm">
                            Submit
                        </Button>
                        <Button size="sm">
                            Reply
                        </Button>
                    </Col>
                </Row>
            </Col>
        </div>
    )
}

export default buildComments;