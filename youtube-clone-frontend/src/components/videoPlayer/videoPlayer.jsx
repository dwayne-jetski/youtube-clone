import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function displayVideoPlayer(props){

    return(
        <div>
            <Row>
                <h1>Now Searching: {props.searchTerm}</h1>
            </Row>
            <Row>
                <Col xs={2}>
                </Col>
                <Col xs={8}>
                    <Row>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/LDU_Txk06tM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        {/* Player and Comment Content goes here */}
                    </Row>
                    <Row>
                        Comments
                        {/* Comment Section */}
                    </Row>
                    
                </Col>
                <Col xs={2}>
                    {/* Recommended Content goes Here */}
                </Col>
            </Row>
        </div>
    )
    }