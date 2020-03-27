
/**
 * @Date:   2020-02-27T15:06:33+00:00
 * @Last modified time: 2020-02-28T20:33:10+00:00
 */
 import React, {useState} from 'react';
 import 'bootstrap/dist/css/bootstrap.css';
 import Modal from 'react-bootstrap/Modal';
 import {  Card } from 'react-bootstrap';
 import Award1 from "../../Rewards/Reward1.png"
 import Award2 from "../../Rewards/Reward2.png"
 import Award3 from "../../Rewards/Reward3.png"
 import Award4 from "../../Rewards/Reward4.png"
 import Award5 from "../../Rewards/Reward5.png"
import Award6 from "../../Rewards/Reward6.png"
import Award7 from "../../Rewards/Reward7.png"
import Award8 from "../../Rewards/Reward8.png"
import Award9 from "../../Rewards/Reward9.png"
import Award10 from "../../Rewards/Reward10.gif"
import Award11 from "../../Rewards/Reward11.gif"
import Award12 from "../../Rewards/Reward12.gif"
import Locked from "../../Rewards/Locked.png"
import ExitIcon from "../../Rewards/ExitIcon.png"
 import { IoLogoGameControllerB } from "react-icons/io";

import "../../styles/rewards.css"




  function GamingModal(props) {
    const [show, setShow] = useState(false);
    return (

      <>
        <div variant="primary" onClick={() => setShow(true)}>
          My Awards
        </div>

        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header className="headerContainer">
            <div className="col-lg-12 rewardHeader">
              <div className="col-12">Hi {props.user.firstname}, here are your Rewards<Card.Img variant="top" onClick={() => setShow(false)} className="gamingModalExit col-4" src={ExitIcon} /></div>
            </div>
          </Modal.Header>
          <Modal.Body className="modalBody">
            <div className="container col-lg-12">
              <div className="row">
              <Card className="col-4 rewardCard">
                {(props.points.calories >= 1 || props.points.carbs >= 1 || props.points.proteins >= 1 || props.points.fats >= 1)   ? (
                  <>
                  <Card.Header className="rewardNames">
                    <center>My First Badge</center>
                  </Card.Header>
                  <Card.Body className="rewardBody">
                                <center><Card.Img variant="top" className="awards unlocked" src={Award1}  /></center>
                                </Card.Body>
                                </>
                              ) : (
                                <>
                                <Card.Header className="rewardNames rnLocked">
                                  <center>Unlock to View</center>
                                </Card.Header>
                                <Card.Body className="rewardBody">
                                <center><Card.Img variant="top" className="awards locked" src={Locked}  /></center>
                                </Card.Body>
                                </>
                              )}
                                <Card.Footer className="rewardDesc">
                                  <center>Gain <b>1</b> point in any category</center>
                                </Card.Footer>
                              </Card>
                              <Card className="col-4 rewardCard">
                {(props.points.calories >= 1 && props.points.carbs >= 1 && props.points.proteins >= 1 && props.points.fats >= 1)   ? (
                  <>
                  <Card.Header className="rewardNames">
                    <center>Right on Target!</center>
                  </Card.Header>
                  <Card.Body className="rewardBody">
                                <center><Card.Img variant="top" className="awards unlocked" src={Award2}  /></center>
                                </Card.Body>
                                </>
                              ) : (
                                <>
                                <Card.Header className="rewardNames rnLocked">
                                  <center>Unlock to View</center>
                                </Card.Header>
                                <Card.Body className="rewardBody">
                                <center><Card.Img variant="top" className="awards locked" src={Locked}  /></center>
                                </Card.Body>
                                </>
                              )}
                                <Card.Footer className="rewardDesc">
                                  <center>Gain <b>1</b> point in each category</center>
                                </Card.Footer>
                              </Card>
                              <Card className="col-4 rewardCard">
                {(props.points.calories >= 3 || props.points.carbs >= 3 || props.points.proteins >= 3 || props.points.fats >= 3)   ? (
                  <>
                  <Card.Header className="rewardNames">
                    <center>On a Roll</center>
                  </Card.Header>
                  <Card.Body className="rewardBody">
                                <center><Card.Img variant="top" className="awards unlocked" src={Award3}  /></center>
                                </Card.Body>
                                </>
                              ) : (
                                <>
                                <Card.Header className="rewardNames rnLocked">
                                  <center>Unlock to View</center>
                                </Card.Header>
                                <Card.Body className="rewardBody">
                                <center><Card.Img variant="top" className="awards locked" src={Locked}  /></center>
                                </Card.Body>
                                </>
                              )}
                                <Card.Footer className="rewardDesc">
                                  <center>Gain <b>3</b> points in any category</center>
                                </Card.Footer>
                              </Card>
                              <Card className="col-4 rewardCard">
                {(props.points.calories >= 3 && props.points.carbs >= 3 && props.points.proteins >= 3 && props.points.fats >= 3)   ? (
                  <>
                  <Card.Header className="rewardNames">
                    <center>Consistency is Three</center>
                  </Card.Header>
                  <Card.Body className="rewardBody">
                                <center><Card.Img variant="top" className="awards unlocked" src={Award4}  /></center>
                                </Card.Body>
                                </>
                              ) : (
                                <>
                                <Card.Header className="rewardNames rnLocked">
                                  <center>Unlock to View</center>
                                </Card.Header>
                                <Card.Body className="rewardBody">
                                <center><Card.Img variant="top" className="awards locked" src={Locked}  /></center>
                                </Card.Body>
                                </>
                              )}
                                <Card.Footer className="rewardDesc">
                                  <center>Gain <b>3</b> points in each category</center>
                                </Card.Footer>
                              </Card>
                              <Card className="col-4 rewardCard">
                {(props.points.calories >= 5 || props.points.carbs >= 5 || props.points.proteins >= 5 || props.points.fats >= 5)   ? (
                  <>
                  <Card.Header className="rewardNames">
                    <center>Five for Five</center>
                  </Card.Header>
                  <Card.Body className="rewardBody">
                                <center><Card.Img variant="top" className="awards unlocked" src={Award5}  /></center>
                                </Card.Body>
                                </>
                              ) : (
                                <>
                                <Card.Header className="rewardNames rnLocked">
                                  <center>Unlock to View</center>
                                </Card.Header>
                                <Card.Body className="rewardBody">
                                <center><Card.Img variant="top" className="awards locked" src={Locked}  /></center>
                                </Card.Body>
                                </>
                              )}
                                <Card.Footer className="rewardDesc">
                                  <center>Gain <b>5</b> points in any category</center>
                                </Card.Footer>
                              </Card>
                              <Card className="col-4 rewardCard">
                {(props.points.calories >= 5 && props.points.carbs >= 5 && props.points.proteins >= 5 && props.points.fats >= 5)   ? (
                  <>
                  <Card.Header className="rewardNames">
                    <center>Five Food Finish</center>
                  </Card.Header>
                  <Card.Body className="rewardBody">
                                <center><Card.Img variant="top" className="awards unlocked" src={Award6}  /></center>
                                </Card.Body>
                                </>
                              ) : (
                                <>
                                <Card.Header className="rewardNames rnLocked">
                                  <center>Unlock to View</center>
                                </Card.Header>
                                <Card.Body className="rewardBody">
                                <center><Card.Img variant="top" className="awards locked" src={Locked}  /></center>
                                </Card.Body>
                                </>
                              )}
                                <Card.Footer className="rewardDesc">
                                  <center>Gain <b>5</b> points in each category</center>
                                </Card.Footer>
                              </Card>
                              <Card className="col-4 rewardCard">
                {(props.points.calories >= 7 || props.points.carbs >= 7 || props.points.proteins >= 7 || props.points.fats >= 7)   ? (
                  <>
                  <Card.Header className="rewardNames">
                    <center>One Week of Tracking!</center>
                  </Card.Header>
                  <Card.Body className="rewardBody">
                                <center><Card.Img variant="top" className="awards unlocked" src={Award7}  /></center>
                                </Card.Body>
                                </>
                              ) : (
                                <>
                                <Card.Header className="rewardNames rnLocked">
                                  <center>Unlock to View</center>
                                </Card.Header>
                                <Card.Body className="rewardBody">
                                <center><Card.Img variant="top" className="awards locked" src={Locked}  /></center>
                                </Card.Body>
                                </>
                              )}
                                <Card.Footer className="rewardDesc">
                                  <center>Gain <b>7</b> points in any category</center>
                                </Card.Footer>
                              </Card>
                              <Card className="col-4 rewardCard">
                {(props.points.calories >= 7 && props.points.carbs >= 7 && props.points.proteins >= 7 && props.points.fats >= 7)   ? (
                  <>
                  <Card.Header className="rewardNames">
                    <center>Seven Stars!</center>
                  </Card.Header>
                  <Card.Body className="rewardBody">
                                <center><Card.Img variant="top" className="awards unlocked" src={Award8}  /></center>
                                </Card.Body>
                                </>
                              ) : (
                                <>
                                <Card.Header className="rewardNames rnLocked">
                                  <center>Unlock to View</center>
                                </Card.Header>
                                <Card.Body className="rewardBody">
                                <center><Card.Img variant="top" className="awards locked" src={Locked}  /></center>
                                </Card.Body>
                                </>
                              )}
                                <Card.Footer className="rewardDesc">
                                  <center>Gain <b>7</b> points in Each category</center>
                                </Card.Footer>
                              </Card>
                              <Card className="col-4 rewardCard">
                {(props.points.calories >= 9 || props.points.carbs >= 9 || props.points.proteins >= 9 || props.points.fats >= 9)   ? (
                  <>
                  <Card.Header className="rewardNames">
                    <center>Stairway to Success</center>
                  </Card.Header>
                  <Card.Body className="rewardBody">
                                <center><Card.Img variant="top" className="awards unlocked" src={Award9}  /></center>
                                </Card.Body>
                                </>
                              ) : (
                                <>
                                <Card.Header className="rewardNames rnLocked">
                                  <center>Unlock to View</center>
                                </Card.Header>
                                <Card.Body className="rewardBody">
                                <center><Card.Img variant="top" className="awards locked" src={Locked}  /></center>
                                </Card.Body>
                                </>
                              )}
                                <Card.Footer className="rewardDesc">
                                  <center>Gain <b>9</b> points in any category</center>
                                </Card.Footer>
                              </Card>
                              <Card className="col-4 rewardCard">
{(props.points.calories >= 9 && props.points.carbs >= 9 && props.points.proteins >= 9 && props.points.fats >= 9)   ? (
  <>
                <Card.Header className="rewardNames">
                  <center>No Stopping You!</center>
                </Card.Header>
                <Card.Body className="rewardBody">
                <center><Card.Img variant="top" className="awards unlocked" src={Award10}  /></center>
                </Card.Body>
                </>
              ) : (
                <>
                <Card.Header className="rewardNames rnLocked">
                  <center>Unlock to View</center>
                </Card.Header>
                <Card.Body className="rewardBody">
                <center><Card.Img variant="top" className="awards locked" src={Locked}  /></center>
                <center><h6>Animated Reward!</h6></center>
                </Card.Body>
                </>
              )}
                <Card.Footer className="rewardDesc">
                  <center>Gain <b>9</b> points in each category</center>
                </Card.Footer>
              </Card>
              <Card className="col-4 rewardCard">
{(props.points.calories >= 11 || props.points.carbs >= 11 || props.points.proteins >= 11 || props.points.fats >= 11)   ? (
  <>
                <Card.Header className="rewardNames">
                  <center>Golden Medal!</center>
                </Card.Header>
                <Card.Body className="rewardBody">
                <center><Card.Img variant="top" className="awards unlocked" src={Award12}  /></center>
                </Card.Body>
                </>
              ) : (
                <>
                <Card.Header className="rewardNames rnLocked">
                  <center>Unlock to View</center>
                </Card.Header>
                <Card.Body className="rewardBody">
                <center><Card.Img variant="top" className="awards locked" src={Locked}  /></center>
                <center><h6>Animated Reward!</h6></center>
                </Card.Body>
                </>
              )}
                <Card.Footer className="rewardDesc">
                  <center>Gain <b>11</b> points in any category</center>
                </Card.Footer>
              </Card>
              <Card className="col-4 rewardCard">
{(props.points.calories >= 11 && props.points.carbs >= 11 && props.points.proteins >= 11 && props.points.fats >= 11)   ? (
  <>
                <Card.Header className="rewardNames">
                  <center>Burn Calories, Burn!</center>
                </Card.Header>
                <Card.Body className="rewardBody">
                <center><Card.Img variant="top" className="awards unlocked" src={Award11}  /></center>
                </Card.Body>
                </>
              ) : (
                <>
                <Card.Header className="rewardNames rnLocked">
                  <center>Unlock to View</center>

                </Card.Header>
                <Card.Body className="rewardBody">
                <center><Card.Img variant="top" className="awards locked" src={Locked}  /></center>
                                  <center><h6>Animated Reward!</h6></center>
                </Card.Body>
                </>
              )}
                <Card.Footer className="rewardDesc">
                  <center>Gain <b>11</b> points in each category</center>
                </Card.Footer>
              </Card>
              </div>
              <div className="row">
                <div className="col-lg-12 rewardFooter">More Rewards Coming Soon...</div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="footerContainer">
          <div className="col-lg-12">
          <center>
            <div className="row">
            <div className="col-1 gameicon"><IoLogoGameControllerB size={42}/></div>
            <div className="col-2 gmPointHead">Current Points</div>
              <div className="col-2 gmPoints">Calories - {props.points.calories}</div>
              <div className="col-2 gmPoints">Carbs - {props.points.carbs}</div>
              <div className="col-2 gmPoints">Proteins - {props.points.proteins}</div>
              <div className="col-2 gmPoints">Fats - {props.points.fats}</div>
              <div className="col-1 gameicon"><IoLogoGameControllerB size={42}/></div>
            </div>
            </center>
          </div>
          </Modal.Footer>
        </Modal>
      </>

    );
  }






  export default GamingModal;
