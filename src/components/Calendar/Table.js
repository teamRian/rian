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
  }

  componentDidMount(){
    const {data,day,locale,month,type,year} = this.props.Calendar
    var that = this;
    var initialTime = {
      locale: locale,
      currentDate: moment().format('l').split('/').map(function(item){
        return parseInt(item);
      })
    }
    var weeks = this.renderTime(year, month);
    const table = d3.select('#calendar');
    const header = table.append('thead');
    const body = table.append('tbody');
    this.renderTableHeader(table,header,body)
    this.renderTable(table, header, body, duration, weeks, month, year);
    this.selectDate(day);
    this.props.calendarRequest();

  }


  componentWillReceiveProps(nextProps){
    if(!nextProps.Calendar.loading){
      nextProps.Calendar.data.forEach(d=>{
        this.renderData(d)
      })

    }
   
  }

  selectDate(day){
    d3.select('#calendar tbody td.active')
      .classed('active', false)
    d3.select(`#id${day}`)
      .classed('active', true);
  }
  renderData(data){
      console.log(data);
    d3.select(`#id${data.day}`)
      .append('div')
      .text(`${data.title}`)
  }
  // getTime(time){
  //   time.day = time.currentDate[1]; // 22
  //   time.month = time.currentDate[0]; // 2
  //   time.year = time.currentDate[2]; // 2017
  //   time.currentDate = time.currentDate.join('/');
  //   return time;
  // }


  renderTime(year, month) {
    const cal = new Calendar(0);
    var weeks = cal.monthDays(year, month-1); //[0,0,0,1,2,3,4], ....
        // var weeks = cal.monthDays(2017,1); // 2017,1** = 2017 Feb
    return weeks;
  }

  renderTableHeader(table, header, body, duration){
    
    header
      .append('tr')
      .append('button')
      .text('Add')
      .on('click', (d,i)=> that.handleButtonClick(d,i))
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

  }

  renderTable(table, header, body, duration, weeks, month, year) {
    let that = this;

    body
      .append('tr')
      .attr('colspan', 7)
      .text(`${months[month-1]}, ${year}`)
      .style('text-align', 'left')
      .style('font-weight', 'bold')
      .style('font-size', '14px')
      .style("opacity",0)
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
        .attr('class', (d,i)=>{
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
    this.props.calendarPost({
      year, month, day, 
      type: "once",
      title: "New Event",
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
    this.props.calendarRequest({
      year:2017,
      month: 2
    })
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
