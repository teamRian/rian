import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import * as d3 from 'd3'
import { Calendar } from 'calendar';
import moment from 'moment';

const duration = 1500;
const days = ['Sun','Mon','Tue','Wed','Thu','Fri',"Sat"]
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
class Table extends Component {
  constructor(props){
    super(props);
    console.log("Table Props: ", this.props)
  }

  componentDidMount(){
    var that = this;
    var initialTime = {
      locale: moment.locale(),
      currentDate: moment().format('l').split('/').map(function(item){
        return parseInt(item);
      })
    }
    var time = this.getTime(initialTime);
    var weeks = this.renderTime(time);
    const node = this.refs.calendar
    this.renderTable(weeks, time, duration);

    var data = this.props.data
    if(data !== null){
      for (var key in data) {
        if(Array.isArray(data[key])){
          data[key].forEach((item)=>{
            this.renderData(key,item)
          })
        }
      }
    }

  }
  renderData(id,data){
    d3.select(`#id${id}`)
      .append('div')
      .text(`${data.title} ${data.startTime}~${data.endTime}`)
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

  renderTable(weeks, time, duration) {
    const table = d3.select('#calendar');
    const header = table.append('thead');
    const body = table.append('tbody');
    let that = this;
    header
      .append('tr')
      .append('td')
      .attr('colspan', 7)
      .text(`${months[time.month-1]}, ${time.year}`)
      .style('text-align', 'center')
      .style("opacity",0)
    .transition()
      .duration(duration)
      .style("opacity",1)

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
        .style("opacity",0)
      .transition()
        .duration(duration)
        .style("opacity",1)
 
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
    console.log('inside click');
    this.props.getPlan('2017')
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
