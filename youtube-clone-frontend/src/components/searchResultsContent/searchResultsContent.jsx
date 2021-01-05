import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import Img from 'react-bootstrap/Image'


const createSearchResults = (props)=>{

    
    
    let results = props.collection.map((collection, index)=>{

        const { snippet, id } = collection

        if(id.kind === 'youtube#channel'){
            return
        }
        return(
            <div>
                <Row>
                    Title: {snippet.title}
                </Row>
                <Row>
                    <Img src={snippet.thumbnails.medium.url} width={snippet.thumbnails.medium.width} height={snippet.thumbnails.medium.height} name='selectedVideo' id={id.videoId} onClick={props.selectAVideo()}/>
                </Row>
                {/* <Row>
                   <iframe src={`http://www.youtube.com/embed/${id.videoId}`}/>
                </Row> */}
                <Row>
                    Channel:  {snippet.channelTitle}
                </Row>
                <Row>
                    ----------------------------------------------------------
                </Row>
            </div>
        )

    })


  return(results)
    
    
}

function DisplaySearchResults(props){



return(
    <div>
        <Row>
            <Col xs={11}>
                <h1>Now Searching: {props.searchingFor}</h1>
            </Col>
        </Row>
        <Row>
            <Col xs={2}>
                {/* blank */}
            </Col>
            <Col xs={8}>

                
              {createSearchResults(props)}

                
            </Col>
            <Col xs={2}>
                {/* blank */}
            </Col>
        </Row>
    </div>
)
}

export default DisplaySearchResults;