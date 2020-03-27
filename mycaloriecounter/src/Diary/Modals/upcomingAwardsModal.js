/**
 * @Date:   2020-02-27T15:06:33+00:00
 * @Last modified time: 2020-03-09T13:00:43+00:00
 */
 import React, {useState} from 'react';
 import 'bootstrap/dist/css/bootstrap.css';
 import Modal from 'react-bootstrap/Modal';
 import { Card } from 'react-bootstrap';
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
 import NoAward from "../../Rewards/noreward.png"
 import {  MdExitToApp } from "react-icons/md";

  function UpcomingAwards(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const totalcalories = props.totalcalories
    const totalcarbs= props.totalcarbs
    const totalproteins = props.totalproteins
    const totalfats = props.totalfats

    const userCalories = props.user.recommendations.calories
    const userCarbs = props.user.recommendations.carbs
    const userProteins = props.user.recommendations.proteins
    const userFats = props.user.recommendations.fats

    const calPoint = props.points.calories
    const carbPoint = props.points.carbs
    const proPoint = props.points.proteins
    const fatPoint = props.points.fats
console.log(fatPoint);
    return (

      <>
        <div onClick={handleShow}>Upcoming Awards</div>
<div className="container col-lg-12 col-md-12 col-sm-12">
        <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" dialogClassName="modal-2" centered>
          <Modal.Header className="upcomingHeader">
          <div className="row">
          <div className="col-11"><h4 className="awardHead msg">Upon Submission You Will Receive:</h4></div><div className="col-1"><MdExitToApp className="leaveModal" onClick={handleClose} size={40}/></div>
          <div className="col-12"><center><h6 className="subawardHead">Based on current entry values, the following points:</h6></center></div>
          </div>

          </Modal.Header>
          <div className="col-12">
          <div className="row">
          {((totalcalories > userCalories) && (totalcalories < userCalories + 100)) ? (
            <div className="col-3 pointsEarned earned">+1 Calorie</div>
          ): (
            <div className="col-3 pointsEarned null">+0 Calorie</div>
          )}
          {((totalcarbs > userCarbs) && (totalcarbs < userCarbs + 25)) ? (
            <div className="col-3 pointsEarned earned">+1 Carb</div>
          ): (
            <div className="col-3 pointsEarned null">+0 Carb</div>
          )}
          {((totalproteins > userProteins) && (totalproteins < userProteins + 25)) ? (
            <div className="col-3 pointsEarned earned">+1 Protein</div>
          ): (
            <div className="col-3 pointsEarned null">+0 Protein</div>
          )}
          {((totalfats > userFats) && (totalfats < userFats + 11)) ? (
            <div className="col-3 pointsEarned earned">+1 Fat</div>
          ): (
            <div className="col-3 pointsEarned null">+0 Fat</div>
          )}
          </div>
          </div>

          <div className="col-lg-12 v2"><center><h2 className="awardHead">Upcoming Rewards</h2></center></div>
          <Modal.Body className="upcomingRewardBody">
          <div className="row">
          <div className="col-lg-12">
          {(calPoint === 0 && carbPoint === 0 && proPoint === 0 && fatPoint === 0 ) &&
            <>
          <center>
          <div className="badgeInfo"><h3 className="rewardName">My First Badge</h3></div>
          <Card.Img variant="top" title="Upcoming Award" className="badges unlocked" src={Award1}  />
          <div className="badgeInfo">My First Badge: Gain <b>1</b> point in any category</div>
          <hr></hr>
          </center>
          </>
        }
          {(calPoint === 0 || carbPoint === 0 || proPoint === 0 || fatPoint === 0 ) &&
          <>
        <center>
        <div className="badgeInfo"><h3 className="rewardName">Right on Target</h3></div>
        <Card.Img variant="top" title="Upcoming Award" className="badges unlocked" src={Award2}  />
        <div className="badgeInfo">Right on Target: Gain <b>1</b> point in each category</div>
        <hr></hr>
        </center>
        </>
      }
          {(calPoint === 1 && carbPoint === 1 && proPoint === 1 && fatPoint === 1 ) &&
      <>
    <center>
    <div className="badgeInfo"> <Card.Img variant="top" title="No Award" className="awards" src={NoAward}  /><h3 className="rewardName">Sorry {props.user.firstname}, but there are no Rewards to be earned for this Diary</h3></div>
    </center>
    </>
  }
          {((calPoint === 2 || carbPoint === 2 || proPoint === 2 || fatPoint === 2) && (!(calPoint >= 3) && !(carbPoint >= 3) && !(proPoint >= 3) && !(fatPoint >= 3))) &&
            <>
          <center>
          <div className="badgeInfo"><h3>On a Roll</h3></div>
          <Card.Img variant="top" title="Upcoming Award" className="awards unlocked" src={Award3}  />
          <div className="badgeInfo">On a Roll: Gain 3 points in a single category</div>
          <hr></hr>
          </center>
          </>
        }
          {(calPoint === 2 || carbPoint === 2 || proPoint === 2 || fatPoint === 2 ) &&
                <>
              <center>
              <div className="badgeInfo"><h3>Consistency is Three</h3></div>
              <Card.Img variant="top" title="Upcoming Award" className="awards unlocked" src={Award4}  />
              <div className="badgeInfo">On a Roll: Gain 3 points in each category</div>
              </center>
              </>
            }
          {(calPoint === 3 && carbPoint === 3 && proPoint === 3 && fatPoint === 3 ) &&
            <>
          <center>
          <div className="badgeInfo"><Card.Img variant="top" title="No Award" className="awards" src={NoAward}  /><h3 className="rewardName">Sorry {props.user.firstname}, but there are no Rewards to be earned for this Diary</h3></div>
          </center>
          </>
        }
          {((calPoint === 4 || carbPoint === 4 || proPoint === 4 || fatPoint === 4) && (!(calPoint >= 5) && !(carbPoint >= 5) && !(proPoint >= 5) && !(fatPoint >= 5))) &&
          <>
        <center>
        <div className="badgeInfo"><h3>Five for Five!</h3></div>
        <Card.Img variant="top" title="Upcoming Award" className="awards unlocked" src={Award5}  />
        <div className="badgeInfo">Gain 5 points in a single category</div>
        <hr></hr>
        </center>
        </>
      }
          {(calPoint === 4 || carbPoint === 4 || proPoint === 4 || fatPoint === 4 ) &&
            <>
          <center>
          <div className="badgeInfo"><h3>Five Food Finish</h3></div>
          <Card.Img variant="top" title="Upcoming Award" className="awards unlocked" src={Award6}  />
          <div className="badgeInfo">On a Roll: Gain 5 points in each category</div>
          </center>
          </>
        }
          {(calPoint === 5 && carbPoint === 5 && proPoint === 5 && fatPoint === 5 ) &&
          <>
        <center>
        <div className="badgeInfo"><Card.Img variant="top" title="No Award" className="awards" src={NoAward}  /><h3 className="rewardName">Sorry {props.user.firstname}, but there are no Rewards to be earned for this Diary</h3></div>
        </center>
        </>
      }
          {((calPoint === 6 || carbPoint === 6 || proPoint === 6 || fatPoint === 6) && (!(calPoint >= 7) && !(carbPoint >= 7) && !(proPoint >= 7) && !(fatPoint >= 7))) &&
          <>
        <center>
        <div className="badgeInfo"><h3>One Week of Tracking!</h3></div>
        <Card.Img variant="top" title="Upcoming Award" className="awards unlocked" src={Award7}  />
        <div className="badgeInfo">Gain 7 points in a single category</div>
        <hr></hr>
        </center>
        </>
      }
          {(calPoint === 6 || carbPoint === 6 || proPoint === 6 || fatPoint === 6 ) &&
            <>
          <center>
          <div className="badgeInfo"><h3>Seven Stars</h3></div>
          <Card.Img variant="top" title="Upcoming Award" className="awards unlocked" src={Award8}  />
          <div className="badgeInfo">Gain 7 points in each category</div>
          </center>
          </>
        }
          {(calPoint === 7 && carbPoint === 7 && proPoint === 7 && fatPoint === 7 ) &&
          <>
        <center>
        <div className="badgeInfo">
        <Card.Img variant="top" title="No Award" className="awards" src={NoAward}  /><h3 className="rewardName">Sorry {props.user.firstname}, but there are no Rewards to be earned for this Diary</h3>
        </div>
        </center>
        </>
      }
      {((calPoint === 8 || carbPoint === 8 || proPoint === 8 || fatPoint === 8) && (!(calPoint >= 9) && !(carbPoint >= 9) && !(proPoint >= 9) && !(fatPoint >= 9))) &&
      <>
    <center>
    <div className="badgeInfo"><h3>Stairway to Success!</h3></div>
    <Card.Img variant="top" title="Upcoming Award" className="awards unlocked" src={Award9}  />
    <div className="badgeInfo">Gain 9 points in a single category</div>
    <hr></hr>
    </center>
    </>
  }
      {(calPoint === 8 || carbPoint === 8 || proPoint === 8 || fatPoint === 8 ) &&
        <>
      <center>
      <div className="badgeInfo"><h3>No Stopping You!</h3></div>
      <Card.Img variant="top" title="Upcoming Award" className="awards unlocked" src={Award10}  />
      <div className="badgeInfo">Gain 9 points in each category</div>
      </center>
      </>
    }
    {(calPoint === 9 && carbPoint === 9 && proPoint === 9 && fatPoint === 9 ) &&
    <>
  <center>
  <div className="badgeInfo">
  <Card.Img variant="top" title="No Award" className="awards" src={NoAward}  /><h3 className="rewardName">Sorry {props.user.firstname}, but there are no Rewards to be earned for this Diary</h3>
  </div>
  </center>
  </>
}
{((calPoint === 10 || carbPoint === 10 || proPoint === 10 || fatPoint === 10) && (!(calPoint >= 11) && !(carbPoint >= 11) && !(proPoint >= 11) && !(fatPoint >= 11))) &&
<>
<center>
<div className="badgeInfo"><h3>Golden Medal!</h3></div>
<Card.Img variant="top" title="Upcoming Award" className="awards unlocked" src={Award12}  />
<div className="badgeInfo">Gain 11 points in a single category</div>
<hr></hr>
</center>
</>
}
        </div>
          <hr></hr>

          </div>
          <div className="row">
          <div className="col-12">

          </div>
          </div>

          </Modal.Body>
          <Modal.Footer className="upcomingHeader">
          <div className="col-12">
          <div className="row">
            <div className="col-12"><center><h5 className="currentPointsHead">Your Current Points</h5></center></div>
          </div>
          </div>
          <div className="col-12">
          <div className="row">
            <div className="col-3 currentPoints"><span className="pointType">Calories</span><span className="pointNum">{props.user.points.calories}</span></div>
            <div className="col-3 currentPoints"><span className="pointType">Carbs</span><span className="pointNum">{props.user.points.carbs}</span></div>
            <div className="col-3 currentPoints"><span className="pointType">Proteins</span><span className="pointNum">{props.user.points.proteins}</span></div>
            <div className="col-3 currentPoints"><span className="pointType">Fats</span><span className="pointNum">{props.user.points.fats}</span></div>
          </div>
          </div>
          </Modal.Footer>
        </Modal>
        </div>
      </>
    );
  }






  export default UpcomingAwards;
