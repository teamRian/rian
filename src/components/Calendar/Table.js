import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import * as d3 from 'd3'
import { Calendar } from 'calendar';
import moment from 'moment';

const days = ['Sun','Mon','Tue','Wed','Thu','Fri',"Sat"]
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
class Table extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    var initialTime = {
      locale: moment.locale(),
      currentDate: moment().format('l').split('/').map(function(item){
        return parseInt(item);
      })
    }
    var time = this.getTime(initialTime);
    var weeks = this.renderTime(time);
    const node = this.refs.calendar
    this.renderTable(weeks, time);


  }
  getTime(time){
    time.day = time.currentDate[1]; // 22
    time.month = time.currentDate[0]; // 2
    time.year = time.currentDate[2]; // 2017
    time.currentDate = time.currentDate.join('/');
    return time;
  }


  renderTime(time) {
    const cal = new Calendar();
    var weeks = cal.monthDays(time.year, time.month-1); //[0,0,0,1,2,3,4], ....
        // var weeks = cal.monthDays(2017,1); // 2017,1** = 2017 Feb
    return weeks;
  }

  renderTable(weeks, time) {
    const table = d3.select('#calendar');
    const header = table.append('thead');
    const body = table.append('tbody');
    let that = this;
    header
      .append('tr')
      .append('td')
      .attr('colspan', 7)
      .style('text-align', 'center')
      .text(`${months[time.month-1]}, ${time.year}`)

    header
      .append('tr')
      .selectAll('td')
      .data(days)
      .enter()
      .append('td')
      .style('text-align', 'center')
      .text((d)=> d)

    weeks.forEach(function(week){
      body
        .append('tr')
        .selectAll('td')
        .data(week)
        .enter()
        .append('td')
        .attr('id', (d)=>{
          if(d !== 0){
            return 'id'+ d
          }
        })
        .on('mouseover', (d,i)=>that.handleMouseOver(d,i))
        .on('mouseout', (d,i)=>that.handleMouseOut(d,i))
        .on('click', (d,i)=>that.handleMouseClick(d,i))
        .text((d)=>{
          if (d !== 0){
            return d
          }
        })
 
    })

  }

  handleMouseOver(d,i){
    d3.select('#id'+d)
      .style('background-color', '#ebfaff')
  }
  handleMouseOut(d,i){
    d3.select('#id'+d)
      .style('background-color', '#ffffff')
  }
  handleMouseClick(d,i){
    d3.select('#id'+d)
      .append('div')
      .text('HEY')
  }
  render() {
    return (
    	<table id="calendar" ref="calendar">
    	</table>
    );
  }
}

export default Table;
