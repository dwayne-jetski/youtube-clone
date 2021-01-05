import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import youtube from '../../api/youtube';


function HomePageContent(props){

    const fetchData = async () => {

        const response = await youtube.get
       
    }


    return(
        <Row>
            <Col>
            <h3>Test</h3>
            </Col>
            <Col xs={8}>
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
                            {/* Video goes here */}
                        </Col>
                        <Col>
                            {/* Video goes here */}
                        </Col>
                        <Col>
                            {/* Video goes here */}
                        </Col>
                        <Col>
                            {/* Video goes here */}
                        </Col>

                    </Row>
                </Row>
                <Row>
                    <Row>
                        <Col>
                            <h1>Recommended Content</h1>
                        </Col>
                    </Row>
                </Row>
                <Row>
                    
                    <Row>
                        <Col>
                            {/* Video goes here */}
                        </Col>
                        <Col>
                            {/* Video goes here */}
                        </Col>
                        <Col>
                            {/* Video goes here */}
                        </Col>
                        <Col>
                            {/* Video goes here */}
                        </Col>

                    </Row>
                </Row>
                <Row>
                    <Row>
                        <Col>
                            <h1>Recommended Content</h1>
                        </Col>
                    </Row>
                </Row>
                <Row>
                    
                    <Row>
                        <Col>
                            {/* Video goes here */}  
                        </Col>
                        <Col>
                            {/* Video goes here */}
                        </Col>
                        <Col>
                            {/* Video goes here */}
                        </Col>
                        <Col>
                            {/* Video goes here */}
                        </Col>

                    </Row>
                </Row>
            </Col>
            <Col>
                <h3>Test</h3>
            </Col>

        </Row>

    )

}

export default HomePageContent;