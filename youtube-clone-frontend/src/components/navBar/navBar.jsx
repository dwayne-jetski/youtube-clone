import React from 'react';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Text from 'react-bootstrap/FormText'
import './navBar.css'


function NavBar(props){


    return(
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand className='col-md-4' onClick={props.returnHome()}>Definitely Not Youtube</Navbar.Brand>
                <Button onClick={props.returnHome()}>HOME</Button>
                <Form inline className='search-bar col-md-6' onSubmit={props.handleSearch()}>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" name='searchBarVal' onChange={props.handleSearchbarChange()} />
                    <Button type='submit'>Search</Button> 
                </Form>
            </Navbar>

        
    )
}



export default NavBar;