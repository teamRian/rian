import React, { Component, PropTypes } from "react";
// import { Calendar } from "calendar";
// import {Motion, spring, StaggeredMotion, TransitionMotion} from "react-motion";
import FlexMonth from "./FlexMonth";
import FlexWeek from "./FlexWeek";
import { connect } from "react-redux";
import { getStampFire } from "./Utils/FlexUtils.js";
import {
  planChildAdded,
  planChildRemoved,
  planChildChanged,
  planUpdateComplete
} from "../../actions/PlanActions";
import { planEpicRequestData } from "../../epics/PlanEpic";
import moment from "moment";
import database from "firebase/database";

class FlexCalendarBody extends Component {
  constructor(props) {
    super(props);
    this.loaded = false;
    this.projectsLoaded = false;
  }

  componentDidMount() {
    const { User, Project } = this.props;
    this.ref = this.getStampFire();
  }

  componentWillUnmount() {
    // Unmount 될 때 파이어베이스 통신을 제거합시다
    this.ref.forEach(item => item.off());
  }

  componentWillReceiveProps(nextProps) {
    // 달이 바뀌면 기존 연결을 갱신하죠
    if (nextProps.Calendar.month !== this.props.Calendar.month) {
      if (this.ref) {
        const { User, Project } = nextProps;
        this.ref.forEach(item => item.off());
        this.ref = this.getStampFire(nextProps);
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("UPDATED?");
    // if (this.props.Plan.update) {
    //   console.log("UPDATED, complete!");
    //   this.props.planUpdateComplete();
    // }
  }

  getStampFire(nextProps) {
    const { Calendar, User, Project } = nextProps || this.props;
    const { monthDays } = Calendar;
    const totalRefs = [];

    // TimeStamp 쿼리를 준비한다
    const firstDay = monthDays[0][0];
    const lastDay = monthDays[monthDays.length - 1][6];
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

    // 유저 자신의 파이어베이스 통신을 준비해요
    const db = database();
    let ref = db.ref(`duck/users/${User._id}/plans`);
    ref = ref.orderByChild("timeStamp").startAt(startStamp).endAt(lastStamp);
    totalRefs.push(ref);
    console.log("TIMESTAMP", startStamp, lastStamp);

    ref.on("child_added", snap => {
      if (!this.props.Plan.loading) {
        console.log("ADDED EVENT!", snap.val());
        this.props.planChildAdded(snap.val());
      }
    });
    ref.on("child_changed", snap => {
      console.log("CHANGED EVENT!", snap.val());
    });
    ref.on("child_removed", snap => {
      console.log("REMOVED EVENT!", snap.val());
    });

    // 유저가 속해 있는 프로젝트들의 통신도 준비해야겠죠?
    const projectsRefArray = [];
    Project.projects.forEach(item => {
      projectsRefArray.push(db.ref(`duck/projects/${item._id}/plans`));
    });

    const projectsRefPromises = [];
    projectsRefArray.forEach(projectRef => {
      projectRef = projectRef
        .orderByChild("timeStamp")
        .startAt(startStamp)
        .endAt(lastStamp);
      totalRefs.push(projectRef);

      projectRef.on("child_added", snap => {
        if (!this.props.Calendar.loading) {
        }
      });
      projectRef.on("child_changed", snap => {});
      projectRef.on("child_removed", snap => {});
    });

    this.props.planEpicRequestData(totalRefs);
    return totalRefs;
  }

  render() {
    return (
      <div id="FlexCalendarBody">
        <FlexWeek />
      </div>
    );
  }
}

function mapState(state) {
  return {
    User: state.User,
    Calendar: state.Calendar,
    Plan: state.Plan,
    Project: state.Project
  };
}

function mapDispatch(dispatch) {
  return {
    planEpicRequestData: refs => {
      dispatch(planEpicRequestData(refs));
    },
    planChildAdded: addedChild => {
      dispatch(planChildAdded(addedChild));
    },
    planChildRemoved: removedChild => {
      dispatch(planChildRemoved(removedChild));
    },
    planChildChanged: changedChild => {
      dispatch(planChildChanged(changedChild));
    },
    planUpdateComplete: () => {
      dispatch(planUpdateComplete());
    }
  };
}

FlexCalendarBody.PropTypes = {
  User: PropTypes.object,
  Calendar: PropTypes.object,
  projectsPlans: PropTypes.object,
  plans: PropTypes.object,
  firebase: PropTypes.object
};

export default connect(mapState, mapDispatch)(FlexCalendarBody);
