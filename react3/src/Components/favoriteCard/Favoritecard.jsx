import React,{useState} from 'react'
import Card from 'react-bootstrap/Card'
import './Favoritecard.css'

import { Button } from '@material-ui/core'
import { Modal,Alert,Col,Button as BButton } from 'react-bootstrap';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Row from 'react-bootstrap/Row';
import deleteNewsSource from '../../services/deletenewssource'
import Dialog from '@material-ui/core/Dialog'
function Favoritecard(props) {
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
      <Card.Body >
      Id : <Card.Title>{props.article.newsSourceId}</Card.Title>
      Name:  <Card.Title>{props.article.newsSourceName}</Card.Title>
      Description:  <Card.Title>{props.article.newsSourceDesc}</Card.Title>
      {/* <Button className="w-100" variant="outline-success" onClick={() => deleteNewsSource(props.article.newsSourceId)}>
              Delete News ?
                </Button> */}
      </Card.Body>

      
    </Card>

 
      <Modal show={show} onHide={handleClose}>
        
       
        
      </Modal></>}

    </>

  )   
}


export default Favoritecard