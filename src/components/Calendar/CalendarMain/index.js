import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import FlexWeekDay from "./FlexWeekDay";
import { planEpicRequestPost } from "../../../epics/PlanEpic";
import moment from "moment";
import "./CalendarMain.css";

@connect(mapState)
export default class CalendarMain extends Component {
  constructor(props) {
    super(props);
    this.state= {
      filteredPlan: [[],[],[],[],[],[],[]]
    }
    // 빈 7 x 72 매트릭스를 만들고 FlexSmallBrick들로 채웁니다
    // const smallBricksMatrix = [...Array(7)].map((x, k) => {
    //   {
    //     return [...Array(72)].map((x, i) => (
    //       <FlexSmallBrick
    //         key={`${k}.${i}`}
    //         timeIndex={i}
    //         dayIndex={k}
    //         _userId={this.props.User._id}
    //         handleOnDrop={form => this.handleOnDrop.bind(this)(form)}
    //         handleCanDrop={(timeIndex, dayIndex) =>
    //           this.handleCanDrop.bind(this)(timeIndex, dayIndex)}
    //       />
    //     ));
    //   }
    // });
    // this.smallBricksMatrix = smallBricksMatrix;
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps, "FLEXWEEK NEXTPROPS") fdre
    if (this.props.Plan.loading && !nextProps.Plan.loading) {
      this.setState({
        filteredPlan: this.filterPlans(nextProps.Calendar.monthDays, nextProps.Calendar.selectedWeek, nextProps.Plan.plans)
      })
    } else if (this.props.Plan.plans !== nextProps.Plan.plans){
      this.setState({
        filteredPlan: this.filterPlans(nextProps.Calendar.monthDays, nextProps.Calendar.selectedWeek, nextProps.Plan.plans)
      })
    }
  }
  handleCanDrop(timeIndex, dayIndex, durationLength) {
    // var = 0
  }

  handleOnDrop(form) {
    console.log(form, "HANDLE ON DROP")
    const chosenDate = this.props.Calendar.monthDays[
      this.props.Calendar.selectedWeek
    ][form.dayIndex];
    const startingTime = form.timeIndex;
    const endingTime = form.timeIndex + form.durationLength;
    const timeStamp = this.fromTimetoStamp(chosenDate, startingTime);

    let postRef = firebase
      .database()
      .ref(`duck/users/${this.props.User._id}/plans`);
    let newPostKey = postRef.push().key;

    const finalForm = Object.assign({}, form, {
      _id: newPostKey,
      _userId: this.props.User._id,
      title: `Event ${this.props.Plan.plans.length}`,
      day: chosenDate.day,
      month: chosenDate.month,
      year: chosenDate.year,
      startingTime,
      endingTime,
      timeStamp
    });

    let updates = {};
    updates[
      `duck/users/${this.props.User._id}/plans/${newPostKey}`
    ] = finalForm;
    return firebase.database().ref().update(updates);
  }

  handleOnResize(direction, delta, plan){
    console.log(arguments,"HANDLE ON RESIZE ")
    if(delta.height === 0){
      return;
    }
    // update TIME for specific key
    console.log(direction === 'bottom', direction, delta, plan,"HANDLE FLEXWEEK RESIZE");

    let diffDuration = Math.round(delta.height/25);
    let finalForm = {};
    if(direction === 'bottom'){
      // 밑에서 끌어왔으면 durationLength와 endingTime 만 바꿔주기
      finalForm = Object.assign({},{
        durationLength: plan.durationLength + diffDuration,
        endingTime: plan.endingTime + diffDuration
      })
      let updates = {};
      updates[`duck/users/${this.props.User._id}/plans/${plan._id}/durationLength`]= finalForm.durationLength;
      updates[`duck/users/${this.props.User._id}/plans/${plan._id}/endingTime`]= finalForm.endingTime;
      return firebase.database().ref().update(updates);
    } else {
      //위에서 끌어왔으면 duration + startingTime + timeStamp 바꿔주기 
      // debugger
      let startingTime = plan.startingTime-diffDuration;
      finalForm = Object.assign({},{
        timeStamp: this.fromTimetoStamp({year:plan.year, month:plan.month, day:plan.day}, startingTime),
        durationLength: plan.durationLength + diffDuration,
        startingTime
      })
      let updates = {};
      updates[`duck/users/${this.props.User._id}/plans/${plan._id}/durationLength`]= finalForm.durationLength;
      updates[`duck/users/${this.props.User._id}/plans/${plan._id}/startingTime`]= finalForm.startingTime;
      updates[`duck/users/${this.props.User._id}/plans/${plan._id}/timeStamp`]= finalForm.timeStamp;
      return firebase.database().ref().update(updates);
    }
    // let updates = {};
    // updates[`duck/users/${this.props.User._id}/plans/${plan._id}/`]= finalForm;
    // return firebase.database().ref().update(updates);
  }

  fromTimetoStamp(date, startingTime) {
    const totalMinutes = (startingTime + 22) * 15; // 5.30AM
    const hour = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return moment([date.year, date.month + 1, date.day, hour, minutes]).format(
      "X"
    );
  }

  filterPlans(monthDays, selectedWeek, plans){
    const showingWeek = monthDays[selectedWeek];
    const firstDay = showingWeek[0];
    const lastDay = showingWeek[6];
    const startStamp = moment([
      firstDay.year,
      firstDay.month + 1,
      firstDay.day,
      0
    ]).format("X");
    const lastStamp = moment([
      lastDay.year,
      lastDay.month + 1,
      lastDay.day,
      24
    ]).format("X");

    const filteredPlan = [[],[],[],[],[],[],[]];

    const firstTime = moment([
      firstDay.year,
      firstDay.month + 1,
      firstDay.day
    ])
    for(var key in plans){
      if(plans[key].timeStamp >= startStamp && plans[key].timeStamp <= lastStamp){
        let { year, month, day } = plans[key];
        plans[key]._id=key;
        let thisTime = moment([year, month+1, day]);
        filteredPlan[thisTime.diff(firstTime, 'd')].push(plans[key]);
        // filteredPlan[key] = Plan.plans[key];
      }
    }
    return filteredPlan;
  }

  render() {
    const { Calendar } = this.props;
    const filteredPlan = this.state.filteredPlan; // not updated
    const showingWeek = Calendar.monthDays[Calendar.selectedWeek];
    return (
      <div id="CalendarMain">
        <div className="WeekDays">
          {showingWeek.map((day, k) => {
            let dayClass = classNames({
              weekCalendarWeekDay: true,
              [`month${day.month}`]: true,
              [`week${day.week}`]: true,
              [`week${day.day}`]: true,
              holiday: k === 6 || k === 0,
              today: day.month === Calendar.currentMonth &&
                day.day === Calendar.currentDay &&
                day.year === Calendar.currentYear,
              selected: day.month === Calendar.selectedMonth &&
                day.day === Calendar.selectedDay &&
                day.year === Calendar.selectedYear
            });
            return (
              <div key={day.day} className={dayClass}>
                {day.day}
              </div>
            );
          })}
        </div>
        <div className="WeekCalendar">
          {
            showingWeek.map((day,k)=>{
              return <FlexWeekDay
                key={k}
                date={day}
                place={k}
                userId={this.props.User._id}
                handleOnDrop={form => this.handleOnDrop.bind(this)(form)}
                handleCanDrop={(timeIndex, dayIndex) =>{this.handleCanDrop.bind(this)(timeIndex, dayIndex)}}
                handleOnResize={(direction, delta, plan) => this.handleOnResize.bind(this)(direction, delta, plan)}
                filteredPlan={this.state.filteredPlan[k]}
              />

            })
          }
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
    User: state.User,
    Calendar: state.Calendar,
    Plan: state.Plan
  };
}

