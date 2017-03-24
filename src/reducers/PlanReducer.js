import {
  PLAN_EPIC_REQUEST_DATA,
  PLAN_EPIC_SUCCESS_DATA,
  PLAN_EPIC_FAIL_DATA,
  PLAN_UPDATE_CHILD_ADDED,
  PLAN_UPDATE_CHILD_REMOVED,
  PLAN_UPDATE_CHILD_CHANGED,
  PLAN_UPDATE_COMPLETE
} from "../constants";

var PlanState = {
  loading: false,
  plans: {}, // [plan, plan, plan]
  update: false
};

export function Plan(state = PlanState, action) {
  switch (action.type) {
    case PLAN_EPIC_REQUEST_DATA: 
      return Object.assign({}, state, {
        loading: true
      });
    case PLAN_EPIC_SUCCESS_DATA:
      return Object.assign({}, state, {
        plans: action.plans,
        loading: false
      });
    case PLAN_UPDATE_CHILD_ADDED:
      return Object.assign({}, state, {
        plans: { ...state.plans },
        loading: false,
        update: action.update
      });
    case PLAN_UPDATE_CHILD_REMOVED:
      const { [action.value]: omit, ...res } = state;
      return Object.assign({}, state, {
        plans: res,
        loading: false,
        update: action.update
      });
    case PLAN_UPDATE_CHILD_CHANGED:
      return Object.assign({}, state, {
        plans: action.plans,
        loading: false,
        update: action.update
      });
    case PLAN_UPDATE_COMPLETE:
      return Object.assign({}, state, {
        update: action.update
      });
    default:
      return state;
  }
}