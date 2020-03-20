import React,{useState} from 'react'
import Card from 'react-bootstrap/Card'
import './card.css'

import { Button } from '@material-ui/core'
import { Modal,Alert,Col,Button as BButton } from 'react-bootstrap';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Row from 'react-bootstrap/Row';
import deleteNews from '../../services/deleteNews'
import Dialog from '@material-ui/core/Dialog'
function CardComponent(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const[deleted, isDeleted] = useState(false);
  const openNews = () => {
    window.open(props.article.urlToImage,"_blank")
    handleClose()
  }
  const[open, setOpen] = React.useState(false);
  const handleClickClose = () =>  {
    setOpen(false)
  }
  const handleClickOpen = () => {
    setOpen(false)
  }

  return (

 

    <>{
    <>      
    <Card id='myCard'>
      <Card.Img variant="top" src={props.article.urlToImage} />
      <Card.Body >
        <Card.Title>{props.article.title}</Card.Title>
      </Card.Body>

      <Card.Footer id="cardFooter"><div id="cardButtons">
        <Row>
          <Col>
            {props.type !== "dashboard" &&
              <Button className="w-100" variant="danger" onClick={handleClickOpen}>
                Delete
                </Button>
            }
            
            {props.type === "dashboard" && <div>
                     <Button className="w-100" id={props.buttonId} variant="contained" onClick={() => {
                                 props.readLater(props.article, props.buttonId)
                             }}>Save News
                     </Button>
                           <p id={props.buttonId + "text"} ></p>
                           </div>}
            
            {props.type === "dashboard" && <div>
                     <Button className="w-100" id={props.buttonId} variant="contained" onClick={() => {
                                 props.readNewsSource(props.article, props.buttonId)
                             }}>Save NewsSource
                     </Button>
                           <p id={props.buttonId + "text"} ></p>
                           </div>} 
          </Col>
          <Col>
            <Button className="w-100" variant="outline-success" onClick={handleShow}>
              Read Now
                </Button>
          </Col>
          <Col>
            <Button className="w-100" variant="outline-success" onClick={() => deleteNews(props.article.author, props.article)}>
              Delete News ?
                </Button>
          </Col>
          
        </Row>
      </div></Card.Footer>
    </Card>

 
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.article.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={props.article.urlToImage} alt="news" />
          {props.article.description}</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={openNews}>
            Open News
           </Button>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
           </Button>
        </Modal.Footer>
      </Modal></>}

    </>

  )   
}


export default CardComponent