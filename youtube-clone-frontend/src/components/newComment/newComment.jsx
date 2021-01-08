import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

function newComment(props){


    return(

        <Form inline className='search-bar col-md-6' onSubmit={props.handleSubmit()}>
            <FormControl type="text" placeholder="New Comment" className="mr-lg-2" name='newCommentBody' onChange={props.handleCommentChange()} />
            <Button type='submit'>Submit</Button> 
        </Form>
    )


}


export default newComment