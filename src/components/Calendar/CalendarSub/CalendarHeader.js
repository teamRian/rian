import React, { Component, PropTypes } from "react";
import { Button, Modal, Glyphicon } from "react-bootstrap";
import { Calendar as calen } from "calendar";

export default class CalendarHeader extends Component {
  constructor(props) {
    super(props);
  }

  change(direction, date) {
    if (this.props.Calendar.kind === "month") {
      this.changeMonth(direction, date);
    } else {
      this.changeWeek(direction, date);
    }
  }

  changeWeek(direction, date) {
    const {
      month,
      year,
      selectedDay,
      selectedWeek,
      selectedMonth,
      selectedYear
    } = this.props.Calendar;
    var nextWeek = selectedWeek, nextMonth = month, nextYear = year;
    let dateObj = {};
    var d = new Date(selectedYear, selectedMonth - 1, selectedDay);

    if (direction === "left") {
      d.setDate(d.getDate() - 7);
      dateObj.selectedDay = d.getDate();
      dateObj.selectedMonth = d.getMonth() + 1;
      dateObj.selectedYear = d.getFullYear();

      if (selectedWeek === 0) {
        this.changeMonth("left", "max", dateObj);
      } else {
        nextWeek--;
        dateObj.selectedWeek = nextWeek;
        this.props.calendarChangeWeek(dateObj);
      }
    } else if (direction === "right") {
      d.setDate(d.getDate() + 7);
      dateObj.selectedDay = d.getDate();
      dateObj.selectedMonth = 1 + d.getMonth();
      console.log("MONTH!! ", dateObj.selectedMonth);
      dateObj.selectedYear = d.getFullYear();
      if (selectedWeek === this.props.Calendar.maxWeeks - 1) {
        this.changeMonth("right", "min", dateObj);
      } else {
        nextWeek++;
        dateObj.selectedWeek = nextWeek;
        this.props.calendarChangeWeek(dateObj);
      }
    }
  }

  changeMonth(direction, week, weekDayObj) {
    const {
      day,
      month,
      year,
      selectedWeek,
      selectedDay,
      selectedMonth,
      selectedYear
    } = this.props.Calendar;
    var nextDay = day,
      nextMonth = month,
      nextYear = year,
      nextSelectedDay = selectedDay,
      nextSelectedMonth = selectedMonth,
      nextSelectedYear = selectedYear;

    if (direction === "left") {
      if (month === 1) {
        nextYear--;
        nextMonth = 12;
      } else {
        nextMonth--;
      }
    } else if (direction === "right") {
      if (month === 12) {
        nextYear++;
        nextMonth = 1;
      } else {
        nextMonth++;
      }
    }
    var nextMonthDays = new calen(0).monthDays(nextYear, nextMonth - 1);
    var nextMonthJoin = nextMonthDays.reduce((a, b) => {
      return a.concat(b);
    });
    var nextMonthMax = Math.max(nextMonthJoin);
    if (selectedDay > nextMonthMax) {
      nextSelectedDay = nextMonthMax;
    }
    var nextSelectedWeek = Math.floor(
      nextMonthJoin.indexOf(nextSelectedDay) / 7
    );

    let dateObj = {
      month: nextMonth,
      year: nextYear,
      maxWeeks: nextMonthDays.length,
      selectedDay: nextSelectedDay,
      selectedWeek: nextSelectedWeek,
      selectedMonth: nextMonth,
      selectedYear: nextYear
    };
    if (!week) {
      console.log(dateObj,"CHANGEMONTH")
      this.props.calendarChangeMonth(dateObj);
    } else {
      if (week === "max") {
        if (nextMonthDays[nextMonthDays.length - 1][6] !== 0) {
          dateObj.selectedWeek = nextMonthDays.length - 3;
        } else {
          dateObj.selectedWeek = nextMonthDays.length - 2;
        }
      } else if (week === "min") {
        if (nextMonthDays[0][0] === 0) {
          dateObj.selectedWeek = 1;
        } else {
          dateObj.selectedWeek = 0;
        }
      }
      dateObj.selectedDay = weekDayObj.selectedDay;
      dateObj.selectedMonth = weekDayObj.selectedMonth;
      dateObj.selectedYear = weekDayObj.selectedYear;
      console.log(dateObj,"CHANGEMONTH")
      this.props.calendarChangeMonth(dateObj);
    }
  }

  render() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return (
      <div id="CalendarHeader">
        <Glyphicon glyph="menu-left" onClick={() => this.change("left")} />
        <div className="DateMonitor">
          <p className="DateText">
            <span>{this.props.Calendar.year}</span>
            <br/>
            {this.props.Calendar.month - 1}
          </p>
        </div>
        <Glyphicon glyph="menu-right" onClick={() => this.change("right")} />
      </div>
    );
  }
}
