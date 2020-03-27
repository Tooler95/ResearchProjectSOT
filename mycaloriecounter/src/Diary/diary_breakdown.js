/**
 * @Date:   2020-02-26T19:23:55+00:00
 * @Last modified time: 2020-02-28T20:36:46+00:00
 */
 /**
  * @Date:   2020-02-18T16:15:03+00:00
 * @Last modified time: 2020-02-28T20:36:46+00:00
  */
 import React, { Component } from 'react';
 import axios from 'axios';
 import {Card, Table, Button} from 'react-bootstrap'
 import Moment from 'react-moment'
 import {withRouter} from 'react-router-dom'
  import GamingModal from '../Profile/Modals/gaming_modal'
   import ExitIcon from "../Rewards/ExitIcon.png"
  import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip
  } from 'recharts';



 class Landing extends Component {
    constructor(props){
      super(props);
      this.state = {
        loggedIn: localStorage.getItem('jwtToken') !== null,
        diary: {},
        totals: {},
        user: {},
        points: {},
        recommendations: {}

    }
  }

    async componentDidMount(){
      const loggedIn = this.state.loggedIn;
      if(loggedIn === true){
        console.log('You are logged In!')
        const token = localStorage.getItem('jwtToken');
        const tokenParts = token.split('.');
        const encodedPayload = tokenParts[1];
        const rawPayload = atob(encodedPayload);
        const user = JSON.parse(rawPayload);
        const recommendations = user.recommendations
        console.log(recommendations);
      await  axios.get('http://localhost:4000/account/'+user._id)
        .then(res => {
          this.setState({user: res.data})
          this.setState({points: this.state.user.points})
        })
        .catch(err => {
          console.log(err)
        })
      await  axios.get('http://localhost:4000/diary/'+this.props.match.params.id)
        .then(res => {
          this.setState({diary: res.data, recommendations: recommendations})
          this.setState({totals: {
            calories: parseInt(this.state.diary.totals.calories),
            carbs: parseInt(this.state.diary.totals.carbs),
            proteins: parseInt(this.state.diary.totals.proteins),
            fats: parseInt(this.state.diary.totals.fats),
          },
            remainingcalories: this.props.location.state.remainingcalories,
            remainingcarbs: this.props.location.state.remainingcarbs,
            remainingproteins: this.props.location.state.remainingproteins,
            remainingfats: this.props.location.state.remainingfats,
            originalCalories: this.props.location.state.originalTotals.calories,
            originalCarbs: this.props.location.state.originalTotals.carbs,
            originalProteins: this.props.location.state.originalTotals.proteins,
            originalFats: this.props.location.state.originalTotals.fats,
            orginalRecommendedCalories: this.props.location.state.originalRecommendations.calories,
            orginalRecommendedCarbs: this.props.location.state.originalRecommendations.carbs,
            orginalRecommendedProteins: this.props.location.state.originalRecommendations.proteins,
            orginalRecommendedFats: this.props.location.state.originalRecommendations.fats,
          })
        })
        .catch(err => {
          console.log(err)

        })


    }
 }



    render() {
      console.log(this.props);
      const calories = this.state.totals.calories
      const carbs = this.state.totals.carbs
      const proteins = this.state.totals.proteins
      const fats = this.state.totals.fats
      const data = [
        {
          name: 'Carbohydrates', Grams: carbs, amt: carbs, percentage: 32
        },
        {
          name: 'Proteins', Grams: proteins, amt: proteins,
        },
        {
          name: 'Fats',  Grams: fats, amt: fats,
        }]
        const colors = ['#0088FE', '#00C49F', '#FFBB28'];

 return(
          <div className="container col-lg-12 mt-5">
<center><div className="col-lg-11">
<Card className="breakdownCard">
<Card.Img variant="top" className="exitIcon" src={ExitIcon} onClick={() => {this.props.history.push('/diary/today/'+this.state.user._id)}} />
<Card.Header className="breakdownHead"><h2>Nutritional Breakdown for <Moment format="LL">{this.state.diary.day}</Moment></h2></Card.Header>
            <Card.Body className="breakdownBody">
            <BarChart
            className="barChart"
          width={800}
          height={350}
          data={data}
          margin={{
            top: 25, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="1 1 " />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Grams">
    {
      data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={colors[index]}/>
      ))
    }
          </Bar>
        </BarChart>
              <Table className="breakdownTable">
                <thead>
                <tr>
                  <th className="meals breakfast"></th>
                  <th className="bottomLegend">Calories</th>
                  <th className="bottomLegend">Carbs</th>
                  <th className="bottomLegend">Proteins</th>
                  <th className="bottomLegend last">Fats</th>
                </tr>


                </thead>
                <tbody>
                <tr>
                  <td className="tableBottom"> Totals</td>
                  <td className="nutrition totals">{this.state.totals.calories}</td>
                  <td className="nutrition totals">{this.state.totals.carbs}</td>
                  <td className="nutrition totals">{this.state.totals.proteins}</td>
                  <td className="nutrition totals">{this.state.totals.fats}</td>
                </tr>
                <tr>
                <td className="tableBottom">Daily Goal</td>
                <td className="nutrition">{this.state.recommendations.calories}</td>
                <td className="nutrition">{this.state.recommendations.carbs}</td>
                <td className="nutrition">{this.state.recommendations.proteins}</td>
                <td className="nutrition">{parseFloat(this.state.recommendations.fats).toFixed(0)}</td>
              </tr>
              <tr>
              <td className="tableBottom">Remainder</td>
              <td className="nutrition">{this.state.remainingcalories}</td>
              <td className="nutrition">{this.state.remainingcarbs}</td>
              <td className="nutrition">{this.state.remainingproteins}</td>
              <td className="nutrition">{this.state.remainingfats}</td>
            </tr>
                </tbody>
              </Table>
            </Card.Body>
            <Card.Footer className="breakdownFooter">
            {this.state.user.gamification === true ? (
              <>
            <div className="col-lg-12"><h3 className="footerHeader">What Points did I earn for this Diary?</h3></div>
<div className="row">
            	{((this.state.originalCalories > this.state.orginalRecommendedCalories) && (this.state.originalCalories < this.state.orginalRecommendedCalories + 100)) &&
            <div className="col-lg-3">
                <h4 className="footerPoint">+1 Calorie Point</h4>

            </div>
          }
                        {((this.state.originalCarbs > this.state.orginalRecommendedCarbs) && (this.state.originalCarbs < this.state.orginalRecommendedCarbs + 25)) &&
            <div className="col-lg-3">

                <h4 className="footerPoint">+1 Carb Point</h4>
            </div>
          }
          {((this.state.originalProteins > this.state.orginalRecommendedProteins) && (this.state.originalProteins < this.state.orginalRecommendedProteins + 100)) &&
            <div className="col-lg-3">
                <h4 className="footerPoint">+1 Protein Point</h4>
            </div>
          }
          {((this.state.originalFats > this.state.orginalRecommendedFats) && (this.state.originalFats < this.state.orginalRecommendedFats + 11)) &&
            <div className="col-lg-3">
                <h4 className="footerPoint">+1 Fat Point</h4>

            </div>
          }
</div>
</>
) : (
  <>
<div className="col-lg-12"><h3 className="footerHeaderBlank"></h3></div>
</>
)
}
            </Card.Footer>
</Card>

</div></center>
          </div>
        )



    }
  }
  export default withRouter(Landing)
