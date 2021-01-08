import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Img from 'react-bootstrap/Image'


const createSearchResults = (props)=>{

    
    
    let results = props.collection.map((collection, index)=>{

        const { snippet, id } = collection

        if(id.kind === 'youtube#channel'){
            return
        }
        return(
            <div className="border-bottom border-dark">
                <Row>
                    Title: {snippet.title}
                </Row>
                <Row>
                    <Img src={snippet.thumbnails.medium.url} width={snippet.thumbnails.medium.width} height={snippet.thumbnails.medium.height} name='selectedVideo' id={id.videoId} value={snippet.title} onClick={props.selectAVideo()}/>
                </Row>
                <Row>
                    Channel:  {snippet.channelTitle}
                </Row>
            </div>
        )

    })


  return(results)
    
    
}

function DisplaySearchResults(props){



return(
    <div>
        <Row/>
        
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