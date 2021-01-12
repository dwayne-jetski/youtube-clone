import React from 'react'
import newComment from '../newComment/newComment'
import Row from 'react-bootstrap/Row'



function DisplayReplyBox(reply ,props){


    if(reply === false){
        return(
            <p></p>
        )
    } else {
        return(
            <Row>
                {newComment(props)}
            </Row>
        )
    }
}

export default DisplayReplyBox;