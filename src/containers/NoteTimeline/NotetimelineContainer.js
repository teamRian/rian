import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ComponentStyleTimelineBox from '../../components/NoteTimeline/ComponentStyleTimelineBox.js'
import { updateTimelineRender } from '../../actions/NoteTimelineActions.js';
import { changeRenderedNote, changEditorState } from '../../actions/NoteEditorActions.js';
import { noteGet, noteOneGet, noteCancle, noteOneCancle } from '../../epics/NoteEpic';
import debounce from 'lodash.debounce'
import './css/timeline.css'




class NoteTimelineContainer extends Component {

  constructor(props) {
    super(props);
    
    this.makeTimelineRender = this.makeTimelineRender.bind(this)
    this.sizeSetup = this.sizeSetup.bind(this)
    this.ConditionalScroll = this.ConditionalScroll.bind(this)
    this.state = {
      renderCheck: true,
    }
    // setInterval(()=>{
    //   console.log('Top', this.refs.parentContainer.scrollTop)
    //   console.log('scorllsize', this.wholeScrollsize)
    //   console.log('ScorllHeight', this.refs.parentContainer.scrollHeight)
    //   if (this.wholeScrollsize !== this.refs.parentContainer.scrollHeight) {
    //     console.log("RESIZE")
    //     this.sizeSetup(this.props.timeline.length)
    //     this.wholeScrollsize !== this.refs.parentContainer.scrollHeight
    //     //Render할 재료 준비
    //     this.timelineRender = this.makeTimelineRender(this.props)
    //     //setState를 콜하면서 버츄얼 돔과의 비교를 시작
    //     this.setState((prevState, props)=>
    //      { renderCheck: !prevState.renderCheck }
    //     )
        
    //   }
      
    // }, 1000)
    this.timelineRender = 'loading'
    //size

    //뷰포인트 밖으로 몇개 더 보여줄 것인가?
    this.preView = 4
    //각 waypoint별 간격
    this.waypointStandard
    //스크롤뷰 전체 크기
    this.wholeScrollsize
    //실제 화면에 보이는 스크롤 길이
    this.viewpointsize
    //박스 하나당 사이즈
    this.boxsize = 150
    //위에 공백 div박스
    this.topboxer = 0
    //아래 공백 div 박스
    this.bottomboxer = 0
    //한번에 몇개의 노트를 렌더링 할 것인가
    this.howManyatOnce
    //웨이 포인트 지점
    this.waypointList = []
    //현재 내가 몇번 웨이 포인트에 있는가?
    this.nowIamHere = 0
    //컴포넌트가 최초 마운트 된 이후로, 받은 첫번째 타임라인 인가?
    this.timelineUpdate = true
    //천재 스크롤뷰의 길이
    this.scrollHeight

    //resize일때 다시 렌더링해줘야한다.
    window.addEventListener('resize', () => {
      if (this.props.timeline) {
              this.sizeSetup(this.props.timeline.length)
      }
      console.log(window.innerHeight)
    })
  }


 
  componentDidMount() {

    //서버에 타임라인 요청(마지막 수정 기준 순서로 렌더링)
    this.props.allofTimelineGet('final_modified')
    //요게 서버에서 받아오면 첫번째 프롭스 업데이트가 될 것이다.
    
  } 


  componentWillReceiveProps(nextProps) {
   
    if (this.timelineUpdate) {
      //만약에 마운드 된후로 첫번째 받는 타임라인일 경우
      this.timelineUpdate = false
      //전체 사이즈 셋업
      this.sizeSetup(nextProps.timeline.length)
      
      //렌더
      this.timelineRender = this.makeTimelineRender(nextProps)  
      
    } else if (this.props.timeline) {
        
      //그 다음 새로운 프롭스가 들어올때마다
       if (this.props.timeline.length !== nextProps.timeline.length) {
    
        //혹시 타임라인 길이가 변경이 있는지 체크해서 있으면 사이즈 다시 셋업
          this.sizeSetup(nextProps.timeline.length)

          //렌더 준비
          this.timelineRender = this.makeTimelineRender(nextProps)  

          //렌더 콜
          this.setState((prevState, props)=>
                    { renderCheck: !prevState.renderCheck }
          )
      }
        
    }  
      


}

  componentDidUpdate(prevProps, prevState) {
    // console.log("Didupdate")
  }



  componentWillUnmount() {
    this.props.noteCancle()
    this.props.noteOneCancle()
    // console.log('Unmount')
  }

  sizeSetup(length, a){
    console.log('Size!!!!!!!!!!!!!!!!!!!!')
     //1: 스크롤창 전체 길이를 설정.
    this.wholeScrollsize = this.boxsize*length //박스의 총 갯수가 전체 스크롤 뷰의 길이가 아니겠는가?
    //2: 스크롤 뷰포인트 길이를 잰다.
    this.viewpointsize = window.innerHeight - 52 //(52는 상단 네브바의 길이)
    //3: 뷰포인트에 넣었을 때, 꽉 차는 갯수는? Math.floor(this.viewpointsize/this.boxsize)+1 
    this.howManyatOnce = Math.floor(this.viewpointsize/this.boxsize)+1
    //4: waypoint는 뷰포인트 길이의 3/1지점쯤
    this.waypointStandard = Math.floor((this.viewpointsize/3)/this.boxsize)*this.boxsize
    for(var i = 0; i*this.waypointStandard < this.wholeScrollsize; i++) {
      this.waypointList.push(this.waypointStandard*i)
    }
    // console.log("this.wholeScrollsize", this.wholeScrollsize)
    // console.log("this.viewpointsize", this.viewpointsize)
    // console.log("this.howManyatOnce", this.howManyatOnce)
    // console.log("this.waypointStandard", this.waypointStandard)
    //console.log("this.waypointList", this.waypointList)
   
  }


  makeTimelineRender(props){
    // console.log('MAKETIMELINE')
    //##만약 타임라인이 없으면 그냥 이거 띄움

    if (props.timeline === null) return "Loading" 
    //5: timeline Array에서 렌더시킬 부분은 어디인가?, topboxer,bottom 맞추기
    //x, y는 타임라인 어레이를 기준으로 상위 웨이포인트, 하위 웨이포인트 지점을 체크한다.
    if (this.nowIamHere === 0) {
      var x = 0
      var y = 0 + this.howManyatOnce + this.preView
      var sliceTimeline = props.timeline.slice(0, y)
        // console.log('First Start', this.nowIamHere, y)
      if (sliceTimeline.length !== this.howManyatOnce + this.preView) {
        // console.log("Calculate Error First line", sliceTimeline.length)
      }

      this.topboxer = 0
      this.bottomboxer = this.wholeScrollsize - this.topboxer - (this.boxsize*sliceTimeline.length)
       
    } else {
      //x좌표 설정
      var x = this.waypointList[this.nowIamHere]/this.boxsize  
      //y 좌표 설정
      var y = x + this.howManyatOnce //OR this.endArray+(this.waypointStandard/this.boxsize)
      // console.log('NOT CHANGe', x, y)
      // x가 0보다 작으면
      if (x-this.preView <= 0) {
        var x = 0
      } else {
        var x = x - this.preView
      }
      //y가 타임라인 어레이 마지막보다 크면
      if (y >= props.timeline.length-1) {
        var y = props.timeline.length
      } else {
        var y = y + this.preView
      }
      // console.log('CHANGE xy', x, y)

      var sliceTimeline = props.timeline.slice(x, y)

      if (sliceTimeline.length !== this.howManyatOnce+(this.preView*2)) {
        //웨이 포인트 앞쪽에 아직 preView를 띄울만한 충분한 공간이 없으면 x가 그냥 0으로 들어가 버리기 때문에 초반에 에러가 뜰 수도 있음.
        // console.log("Caculate Error", this.howManyatOnce+(this.preView*2), sliceTimeline.length)

      }
      

      //topboxer설정
      // console.log(this.refs.parentContainer.scrollHeight, this.wholeScrollsize)
      this.topboxer = x*this.boxsize
      if (this.topboxer <= 0) {
        this.topboxer = 0
      }
      //bottomboxer 설정
      this.bottomboxer = this.wholeScrollsize - this.topboxer - (this.boxsize*sliceTimeline.length)
      if (this.bottomboxer <= 0) {
        // console.log('Final')
        this.bottomboxer = 0
      }
      //console.log(x, y, this.topboxer, this.bottomboxer, sliceTimeline.length*150, this.topboxer+this.bottomboxer+(sliceTimeline.length*150), this.refs.parentContainer.scrollHeight, this.wholeScrollsize, this.topboxer+this.bottomboxer+(sliceTimeline.length*150) === this.refs.parentContainer.scrollHeight)
      //console.log(sliceTimeline.length*150, this.topboxer+this.bottomboxer+(sliceTimeline.length*150), this.refs.parentContainer.scrollHeight, this.wholeScrollsize, this.topboxer+this.bottomboxer+(sliceTimeline.length*150) === this.refs.parentContainer.scrollHeight)
    } 

    //일단 그전까지 보내놓았던 AJAX는 모두 캔슬시키고
    this.props.noteOneCancle()
    return sliceTimeline.map((a, index)=>{
      //각각 다시 노트에 요청을 보냄
      this.props.oneOfTimelineGet(a.id, a.timelineNum)
      return <ComponentStyleTimelineBox 

        key={a.timelineNum} 
        timelineId={a.id} 
        timelinekey={a.timelineNum} 
        timeline={a}
        changEditorState={this.props.changEditorState}
        changeRenderedNote={this.props.changeRenderedNote}
        allofTimelineGet={this.props.allofTimelineGet}
      />
    })
 }
    
    
  

  ConditionalScroll(){


            //스크롤 아래로 내릴때 다음 웨이포인트 지점을 지나갔으면
            if (this.refs.parentContainer.scrollTop >= this.waypointList[this.nowIamHere+1]) {
                // console.log('Round1')
                //현재 내가 있는 웨이포인트 다시 셋업해주고
                this.nowIamHere++
                // console.log("I was moved!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", this.nowIamHere)
                //Render할 재료 준비
                this.timelineRender = this.makeTimelineRender(this.props)
                //setState를 콜하면서 버츄얼 돔과의 비교를 시작
                this.setState((prevState, props)=>
                 { renderCheck: !prevState.renderCheck }
                )
                
                
            } else if (this.nowIamHere !== 0) {
              //스크롤 위로 올릴때
              if (this.refs.parentContainer.scrollTop <= this.waypointList[this.nowIamHere-1]) {
                                  // console.log('Round2')
           
                  //현재 내가 있는 웨이포인트 다시 셋업해주고
                  this.nowIamHere--
                   //Render할 재료 준비
                  this.timelineRender = this.makeTimelineRender(this.props)
                   //setState를 콜하면서 버츄얼 돔과의 비교를 시작
                  this.setState((prevState, props)=>
                    { renderCheck: !prevState.renderCheck }
                  )
            }
          } 
          // if (this.wholeScrollsize !== this.refs.parentContainer.scrollHeight && this.waypointList[this.nowIamHere-1] < this.refs.parentContainer.scrollTop && this.refs.parentContainer.scrollTop < this.waypointList[this.nowIamHere+1]) {
          //     console.log('Replacing')

          //     this.timelineRender = this.makeTimelineRender(this.props)
          // }

          


  }

  render(){

      return (
        <div ref='parentContainer' className="parentWaypoint" onScroll={(e)=>{ 
          e.preventDefault(); 
          /*스크롤할때마다 계속 웨이포인트를 감시하는 이벤트 발생*/

          // var debounceCoditonalScroll = debounce(this.ConditionalScroll, 0, {
          //  "leading": true,
          //  "trailing": false,
          //  "maxWait": 2000
          // })

          // debounceCoditonalScroll() 

          this.ConditionalScroll()
        }}>
          <div className="topspacer" style={ {flex: "0 0 " + this.topboxer + "px"} }></div>
            {this.state.renderCheck && this.timelineRender} 
            {!this.state.renderCheck && this.timelineRender}     
          <div className="bottomspacer" style={ {flex: "0 0 " + this.bottomboxer + "px"} }></div>
        </div>
      )
  }

}


function mapState(state) {

  return { 
    timeline: state.NoteTimeline.timeline, 
    HowManyNote: state.NoteTimeline.HowManyNote,
  }

}

function mapDispatch(dispatch) {
  return {
    allofTimelineGet: (sorting) => dispatch(noteGet(sorting)),
    oneOfTimelineGet: (a, b) => dispatch(noteOneGet(a, b)),
    noteCancle: () => dispatch(noteCancle()),
    noteOneCancle: () => {
      //console.log('------------------Cancle---------------------------'); 
      dispatch(noteOneCancle())},
    timelineRenderRequest: (a)=> dispatch(updateTimelineRender(a)),
    changeRenderedNote: (a) => dispatch(changeRenderedNote(a)),
    changEditorState: (a) => dispatch(changEditorState(a))
  };
}

export default connect(mapState, mapDispatch)(NoteTimelineContainer)