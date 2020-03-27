import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

 function RegisterModal(props) {
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);



   return (
     <>
       <center><div onClick={handleShow} className="btn regModal">Why do we need this Information?</div></center>
       <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" className="modalstyles" centered>
         <Modal.Body>
         <center><h4>Why do we need this Information?</h4></center>
         <center><h6>Fields marked with <div className="required">*</div></h6></center>
         <hr></hr>
         We need this information to calculate your <b>Basal Metabolic Rate</b>. This refers to the amount of calories you would burn if you were asleep all day.
            The BMR formula uses the variables of <b>height</b>, <b>weight</b>, <b>age</b> and <b>biological gender</b> to calculate the Basal Metabolic Rate (BMR). The Harris Benedict forumla is then applied
            in order to factor in your <b>daily activity level</b>.

         </Modal.Body>
         <Modal.Footer>
           <Button variant="info"  href="http://www.bmi-calculator.net/bmr-calculator/harris-benedict-equation/">
             Harris Benedict Forumla
           </Button>
           <Button variant="secondary" onClick={handleClose} >
             Close
           </Button>
         </Modal.Footer>
       </Modal>
     </>
   );
 }






 export default RegisterModal;
