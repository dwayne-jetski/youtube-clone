import React, { useState } from 'react';
import newComment from '../newComment/newComment';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'



function DisplayReplyBox(commentId){
    const [replyBody, setReplyBody] = useState('');
    

    const handleReplySubmit = async (event)=>{

        event.preventDefault()
        
        console.log(replyBody);
        /* const newReply = {
            commentId: commentId,
            text: replyBody
        };

        axios.post('http://localhost:5000/api/comments/' + commentId , newReply)
        .then(res => {
            console.log(res);
        }); */


    }



    
    return(
        <Form inline className='search-bar col-md-6' onSubmit={event => handleReplySubmit(event)}>
            <FormControl type="text" placeholder="New Comment" className="mr-lg-2" name='replyBody' onChange={(event) =>setReplyBody(event.target.value)} />
            <Button type='submit'>Submit</Button> 
        </Form>
    )
}

export default DisplayReplyBox;