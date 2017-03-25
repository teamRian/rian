import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import FlexSmallBrick from "./FlexSmallBrick";
import FlexWeekDay from "./FlexWeekDay";
import { planEpicRequestPost } from "../../epics/PlanEpic";
import moment from "moment";

class FlexWeek extends Component {
  constructor(props) {
    super(props);
    this.state= {
      filteredPlan: {}
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
      console.log("SOME UPDATE!!", nextProps);
      this.setState({
        filteredPlan: this.filterPlans(nextProps.Plan.plans)
      })
    }
  }
  handleCanDrop(timeIndex, dayIndex, durationLength) {
    // var = 0
  }

  handleOnDrop(form) {
    const chosenDate = this.props.Calendar.monthDays[
      this.props.Calendar.selectedWeek
    ][form.dayIndex];
    const startingTime = form.timeIndex;
    const endingTime = form.timeIndex + form.durationLength;
    const timeStamp = this.fromTimetoStamp(chosenDate, startingTime);
    const finalForm = Object.assign({}, form, {
      _userId: this.props.User._id,
      title: `Event ${this.props.Plan.plans.length}`,
      day: chosenDate.day,
      month: chosenDate.month,
      year: chosenDate.year,
      startingTime,
      endingTime,
      timeStamp
    });
    var postRef = firebase
      .database()
      .ref(`duck/users/${this.props.User._id}/plans`);
    var newPostKey = postRef.push().key;
    var updates = {};
    updates[
      `duck/users/${this.props.User._id}/plans/${newPostKey}`
    ] = finalForm;
    return firebase.database().ref().update(updates);
  }

  fromTimetoStamp(date, startingTime) {
    const totalMinutes = (startingTime + 22) * 15; // 5.30AM
    const hour = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return moment([date.year, date.month + 1, date.day, hour, minutes]).format(
      "X"
    );
  }

  filterPlans(plans){
    const { Calendar, Plan } = this.props;
    const showingWeek = Calendar.monthDays[Calendar.selectedWeek];
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

    const filteredPlan = [...Array(7)];

    const firstTime = moment([
      firstDay.year,
      firstDay.month + 1,
      firstDay.day
    ])
    for(var key in Plan.plans){
      if(Plan.plans[key].timeStamp >= startStamp && Plan.plans[key].timeStamp <= lastStamp){
        const { year, month, day } = Plan.plans[key];
        debugger
        filteredPlan[firstTime.diff(moment(year, month+1, day))] = Plan.plans[key];
        // filteredPlan[key] = Plan.plans[key];
      }
    }
    debugger
    return filteredPlan;
  }

  render() {
    const { Calendar, Plan } = this.props;
    const showingWeek = Calendar.monthDays[Calendar.selectedWeek];
    return (
      <div id="FlexCalendarWeek">
        <div className="weekCalendarWeekDays">
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
        <div className="weekCalendarWeek">
          {
            showingWeek.map((day,k)=>{
              return <FlexWeekDay
                key={k}
                date={day}
                place={k}
                userId={this.props.User._id}
                handleOnDrop={form => this.handleOnDrop.bind(this)(form)}
                handleCanDrop={(timeIndex, dayIndex) =>{this.handleCanDrop.bind(this)(timeIndex, dayIndex)}}
                filteredPlan={this.state.filteredPlan[k]}
              />

            })
          }
        </div>
      </div>
    );
  }
}

// <div key={`${k}`} className={"weeklyDay"}></div>

function mapState(state) {
  return {
    User: state.User,
    Calendar: state.Calendar,
    Plan: state.Plan
  };
}

FlexWeek.PropTypes = {
  User: PropTypes.object,
  Calendar: PropTypes.object,
  monthDays: PropTypes.object,
  calendarPost: PropTypes.function
};

export default connect(mapState)(FlexWeek);
