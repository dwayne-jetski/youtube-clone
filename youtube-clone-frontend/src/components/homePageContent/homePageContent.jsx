import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import youtube from '../../api/youtube';


function HomePageContent(props){

  


    return(
        <Row>
            <Col xs={4}>
            
            </Col>
            <Col xs={6}>
                <Row>
                    <Row>
                        <Col>
                            <h1>{props.searchBar}</h1>
                        </Col>
                    </Row>
                </Row>
                <Row>
                    <Row>
                        <Col>
                            <h1>Search For A Video</h1>
                        </Col>
                    </Row>
                </Row>
            </Col>
            <Col>
                
            </Col>

        </Row>

    )

}

export default HomePageContent;