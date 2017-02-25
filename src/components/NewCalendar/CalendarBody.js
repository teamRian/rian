import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3'
import { Calendar } from 'calendar';
import moment from 'moment';

const duration = 1500;
const days = ['Sun','Mon','Tue','Wed','Thu','Fri',"Sat"]
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


export default class CalendarBody extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
  	const {data,day,locale,month,type,year} = this.props.Calendar
    var initialTime = {
      locale: locale,
      currentDate: moment().format('l').split('/').map(function(item){
        return parseInt(item);
      })
    }
    var weeks = this.renderTime(year, month);
    const table = d3.select('#calendar-body');
    const header = table.append('thead');
    const body = table.append('tbody');
    this.renderTableHeader(table,header,body, duration)
    this.renderTable(table, header, body, duration, weeks, month, year);
    this.selectDate(day);
    this.props.calendarRequest();
  }


  selectDate(day){
    d3.select('#calendar tbody td.active')
      .classed('active', false)
    d3.select(`#id${day}`)
      .classed('active', true);
  }

  renderData(data){
    d3.select(`#id${data.day}`)
      .append('div')
      .text(`${data.title}`)
  }

  renderTime(year, month) {
    const cal = new Calendar(0);
    var weeks = cal.monthDays(year, month-1); //[0,0,0,1,2,3,4], ....
        // var weeks = cal.monthDays(2017,1); // 2017,1** = 2017 Feb
        // console.log("CAL MONTHDATES: ", cal.monthDates())

    if(weeks[0][0] === 0){
    	var lastYear = year;
    	var lastMonth = month;
    	if(lastMonth === 1){
    		lastMonth = 12;
    		lastYear--;
    	}
    	var lastWeek = cal.monthDays(lastYear, lastMonth-1);
    	weeks[0] = weeks[0].map((day,i)=>{
    		if(day === 0){
    			return lastWeek[lastWeek.length-1][i];
    		} else {
    			return day
    		}
    	})
    }
    if(weeks[weeks.length-1][6] === 0){
    	var nextYear = year;
    	var nextMonth = month;
    	if(nextMonth === 12){
    		nextMonth = 1
    		nextYear++;
    	}

    	var nextWeek = cal.monthDays(nextYear, nextMonth-1);

    	weeks[weeks.length-1] = weeks[weeks.length-1].map((day,i)=>{
    		if(day === 0){
    			return nextWeek[0][i]
    		} else {
    			return day
    		}
    	})
    }
    return weeks;
  }

  renderTableHeader(table, header, body, duration){
    
    header
      .append('tr')
      .selectAll('td')
      .data(days)
      .enter()
      .append('td')
      .text((d)=> d)
      .style('text-align', 'center')
      .style('opacity',0)
    .transition()
      .duration(duration)
      .style("opacity",1)

  }


  renderTable(table, header, body, duration, weeks, month, year) {
    let that = this;

    weeks.forEach(function(week){
      body
        .append('tr')
        .selectAll('td')
        .data(week)
        .enter()
        .append('td')
        .attr('class', (d,i,q)=>{

          if(i === 0 && d !== 0){
            return 'holiday'
          } else if (i === 6 && d !== 0){
            return 'holiday'
          }

        })
        .attr('id', (d)=>{
          if(d !== 0){
            return 'id'+ d
          }
        })
        // .on('mouseover', (d,i)=>that.handleMouseOver(d,i))
        // .on('mouseout', (d,i)=>that.handleMouseOut(d,i))
        .on('click', (d,i)=>that.selectDate(d,i))
        .text((d)=>{
          if (d !== 0){
            return d
          }
        })
        .style("opacity",0)
      .transition()
        .duration(duration)
        .style("opacity",1)
 
    })

  }

  handleButtonClick(d,i){
    const {year, month, day } = this.props.Calendar
    this.props.calendarPost({
      year, month, day, 
      type: "once",
      title: "New Event",
    })
  }


  render() {
    return (
      <table id="calendar-body">
      </table>
    );
  }
}
