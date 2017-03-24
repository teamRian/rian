import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import ComponentStyleTimelineBox
  from "../../components/NoteTimeline/ComponentStyleTimelineBox.js";
import {
  updateTimelineRender,
  changeTimelineUpdate
} from "../../actions/NoteTimelineActions.js";
import {
  changeRenderedNote,
  changEditorState
} from "../../actions/NoteEditorActions.js";
import {
  noteGet,
  noteOneGet,
  noteCancle,
  noteOneCancle
} from "../../epics/NoteEpic";
import Infinite from "react-infinite";
import "./css/timeline.css";

class NoteTimelineContainer extends Component {
  constructor(props) {
    super(props);
    this.infiniteTimelineLoader = this.infiniteTimelineLoader.bind(this);
    this.state = {
      renderTimeline: "Waiting you",
      browserSize: window.innerHeight - 52
    };
    window.addEventListener("resize", () => {
      console.log(window.innerHeight);
      this.setState((prevState, props) => {
        return {
          browserSize: window.innerHeight - 52
        };
      });
    });
  }

  componentDidMount() {
    //서버에 타임라인 요청(마지막 수정 기준 순서로 렌더링)
    this.props.allofTimelineGet("final_modified");
    //요게 서버에서 받아오면 첫번째 프롭스 업데이트가 될 것이다.
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.TimelineUpdate) {
      //Timeline 전체를 새로 받아왔을 경우
      // console.log('First Update')
      this.setState((prevState, props) => {
        return {
          renderTimeline: this.infiniteTimelineLoader(nextProps)
        };
      });
    } else {
      // console.log("Changing Timeline")
      this.setState((prevState, props) => {
        return {
          renderTimeline: this.infiniteTimelineLoader(nextProps)
        };
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.TimelineUpdate) {
      this.props.changeTimelineUpdate(false);
    }
  }

  infiniteTimelineLoader(props) {
    var renderTimeline = props.timeline.map((a, index) => {
      // this.props.oneOfTimelineGet(a.id, a.timelineNum)
      return (
        <ComponentStyleTimelineBox
          key={a.timelineNum}
          timelineId={a.id}
          timelinekey={a.timelineNum}
          timeline={a}
          changEditorState={props.changEditorState}
          changeRenderedNote={props.changeRenderedNote}
          allofTimelineGet={props.allofTimelineGet}
          oneOfTimelineGet={props.oneOfTimelineGet}
          TimelineUpdate={props.TimelineUpdate}
        />
      );
    });
    return (
      <Infinite
        containerHeight={this.state.browserSize}
        elementHeight={150}
        timeScrollStateLastsForAfterUserScrolls={0}
      >
        {renderTimeline}
      </Infinite>
    );
  }

  render() {
    return (
      <div>
        {this.state.renderTimeline}
      </div>
    );
  }
}

function mapState(state) {
  return {
    timeline: state.NoteTimeline.timeline,
    HowManyNote: state.NoteTimeline.HowManyNote,
    TimelineUpdate: state.NoteTimeline.TimelineUpdate
  };
}

function mapDispatch(dispatch) {
  return {
    allofTimelineGet: sorting => dispatch(noteGet(sorting)),
    oneOfTimelineGet: (a, b) => dispatch(noteOneGet(a, b)),
    noteCancle: () => dispatch(noteCancle()),
    noteOneCancle: () => {
      console.log("------------------Cancle---------------------------");
      dispatch(noteOneCancle());
    },
    timelineRenderRequest: a => dispatch(updateTimelineRender(a)),
    changeRenderedNote: a => dispatch(changeRenderedNote(a)),
    changEditorState: a => dispatch(changEditorState(a)),
    changeTimelineUpdate: a => dispatch(changeTimelineUpdate(a))
  };
}

export default connect(mapState, mapDispatch)(NoteTimelineContainer);
