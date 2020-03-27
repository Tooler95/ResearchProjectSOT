import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal';
import {  Card } from 'react-bootstrap';
import Collapsible from 'react-collapsible';
import Demo1 from "../../../Rewards/test.gif"
import Demo2 from "../../../Rewards/earningPoints.gif"
 import {FaQuestionCircle} from "react-icons/fa";

 function InfoModal(props) {
   const [show, setShow] = useState(false);
   return (
     <>
       <div variant="primary" onClick={() => setShow(true)}>
         <FaQuestionCircle className="infoBtn" size={22}/>
       </div>

       <Modal
         show={show}
         onHide={() => setShow(false)}
         className="infoModal2"
         dialogClassName="infoModal"
         aria-labelledby="example-custom-modal-styling-title"
       >
         <Modal.Header closeButton className="headerContainer">
           <div className="col-lg-12 rewardHeader">
             Points and Achievement Badges
           </div>
         </Modal.Header>
         <Modal.Body className="modalBody">
         <div className="container col-lg-12 col-md-12 col-sm-12">
         <div className="row">
          <p className="gamingInfo">In addition to this application functioning as a daily calorie counter, there is also the option to turn on gaming elements in order to provide a more engaging and rewarding experience. Below are
          three demonstrations outling how these gaming elements work.</p>

         </div>
         <hr></hr>
         <div className="row">

         <Collapsible trigger="Demonstration 1 - Achievement Badges Page" triggerOpenedClassName="btn col-12 rewardExplanation"  className="btn rewardExplanation">
          <Card.Img variant="top" className="demoGifs" src={Demo1}  />
          </Collapsible>
          </div>

          <p className="gamingInfo">Upon Logging in, you will notice a link at the top of the page titled 'My Badges'.
          When clicked on, provided you are a new user, you will see all of the awards you can unlocked as well as how many points are required to unlock them. Points are split across 4 categories - Calories, Carbohydrates, Proteins and Fats. A
          maximum of one point for each category can be obtained daily, and points are achieved by reaching the recommended macronutrient goals set out for each user.</p>
          <hr></hr>
          <div className="row">
          <Collapsible trigger="Demonstration 2 - Earning Points" triggerOpenedClassName="btn col-12 rewardExplanation"  className="btn rewardExplanation">
           <Card.Img variant="top" className="demoGifs" src={Demo2}  />
           </Collapsible>
           </div>
           <p className="gamingInfo">In order to earn points, you must reach you're daily recommendation in one or more of the 4 categories displayed in the diary. The 'View Rewards' Button at the bottom of the Food Diary will
              tell you what points you have earned as well as display any upcoming Badges to unlock.</p>
         </div>
         </Modal.Body>
         <Modal.Footer className="infoModalFooter">
         </Modal.Footer>
       </Modal>
     </>
   );
 }






 export default InfoModal;
