import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import ComponentStyleTimelineBox
  from "../../components/NoteTimeline/ComponentStyleTimelineBox.js";
import {
  changeTimelineUpdate
} from "../../actions/NoteTimelineActions.js";
import {
  changeRenderedNote,
  changEditorState
} from "../../actions/NoteEditorActions.js";
import {
  noteGetMyOwnServer,
  noteGet,
  noteOneGet,
  noteCancle,
  noteOneCancle
} from "../../epics/NoteEpic";
import { graphql, compose, withApollo } from "react-apollo";
import Infinite from "react-infinite";
import "./css/timeline.css";

class NoteTimelineContainer extends Component {
  constructor(props) {
    super(props);
    this.infiniteTimelineLoader = this.infiniteTimelineLoader.bind(this);
    this.state = {
      renderTimeline: "Waiting you",
      browserSize: window.innerHeight - 150
    };
    window.addEventListener("resize", () => {
      // console.log(window.innerHeight);
      this.setState((prevState, props) => {
        return {
          browserSize: window.innerHeight - 150
        };
      });
    });
  }

  componentDidMount() {
    //서버에 타임라인 요청(마지막 수정 기준 순서로 렌더링)
    this.props.allofTimelineGet("final_modified_at");
    //요게 서버에서 받아오면 첫번째 프롭스 업데이트가 될 것이다.
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps)
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

  componentWillUnmount() {
    //Store에 있는 Note Timeline을 Clear해야함
  }

  infiniteTimelineLoader(props) {
    var renderTimeline = props.timeline.map((a, index) => {
      return (
        <ComponentStyleTimelineBox
          key={a.timelineNum}
          timelineNum={a.timelineNum}
          notelocation={a.note_location}
          inforlocation={a.infor_location}
          indexlocation={a.index_location}
          title={a.title}
          snippet={a.snippet}
          createAt={a.created_at}
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
        className="infinite"
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
      <div className="timelineContainer">
        <div className="timelineSearch">
          검색하기
        </div>
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
    allofTimelineGet: sorting => dispatch(noteGetMyOwnServer(sorting)),
    oneOfTimelineGet: (a, b) => dispatch(noteOneGet(a, b)),
    noteCancle: () => dispatch(noteCancle()),
    noteOneCancle: () => {
      console.log("------------------Cancle---------------------------");
      dispatch(noteOneCancle());
    },
    changeRenderedNote: (a, b, c) => dispatch(changeRenderedNote(a, b, c)),
    changEditorState: a => dispatch(changEditorState(a)),
    changeTimelineUpdate: a => dispatch(changeTimelineUpdate(a))
  };
}

var ApolloNoteTimelineContatiner = withApollo(NoteTimelineContainer)
export default connect(mapState, mapDispatch)(ApolloNoteTimelineContatiner)




