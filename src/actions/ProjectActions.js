import {
  PROJECT_SUCCESS_POST,
  PROJECT_FAIL_POST,
  PROJECT_REQUEST_DELETE,
  PROJECT_SUCCESS_DELETE,
  PROJECT_FAIL_DELETE,
  PROJECT_DETACH
} from "../constants";
import axios from "axios";

export function projectRequestDelete() {
  return {
    type: PROJECT_REQUEST_DELETE,
    loading: true
  };
}

export function projectSuccessDelete(res) {
  return {
    type: PROJECT_SUCCESS_DELETE,
    loading: false
  };
}

export function projectFailDelete(err) {
  return {
    type: PROJECT_FAIL_DELETE,
    loading: false
  };
}

export function projectDelete(form) {
  return function(dispatch) {
    dispatch(projectRequestDelete());

    return axios
      .delete("/api/project/newProject", { form })
      .then(res => {
        dispatch(projectSuccessDelete(res.data));
      })
      .catch(err => {
        dispatch(projectFailDelete(err));
      });
  };
}
