import React, { useState } from 'react';
import newComment from '../newComment/newComment';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'



function DisplayReplyBox(props, commentId){
    const [reply, setReply] = useState(false); 

    function handleReply (event, reply){
    
        if(reply === false){
            setReply(true)
        }else if (reply === true) {
            setReply(false);
        }
    }



    if(reply=== false){
        return(
            <div>
                <Button size="sm" id={commentId} onClick={()=>handleReply(reply)}>
                    Reply
                </Button>
                <Row>
                
                </Row>
            </div>
        )
    } else {
        return(
            
            <div>
                <Button size="sm" id={commentId} onClick={()=>handleReply(reply)}>
                        Reply
                </Button>
                <Row>
                    {newComment(props)}
                </Row>
            </div>
        )
    }
}

export default DisplayReplyBox;