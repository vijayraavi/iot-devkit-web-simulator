import * as types from '../constants/actionTypes';
import {dispatch} from 'redux';
// board
export const switchBoard = (dispatch, on) => {
    dispatch({
        type: types.SWITCH_ON_OFF_BOARD,
        data: on,
    });
};

export const setSensorData = (dispatch, sensor, data) => {
    dispatch({
        type: types.SET_SENSOR_DATA,
        sensor,
        data,
    });
};

// help
export const switchHelp = (dispatch, on) => {
    dispatch({
        type: types.SWITCH_HELP,
        data: on,
    });
};

// main
export const runSample = (dispatch) => {
    dispatch({
        type: types.RUN_SAMPLE,
    });
};

export const stopSample = (dispatch) => {
    dispatch({
        type: types.STOP_SAMPLE,
    });
};

export const appendConsoleLog = (dispatch, data) => {
    dispatch({
        type: types.APPEND_CONSOLE_LOG,
        data,
    });
};

export const setEditorPath = (dispatch, path) => {
    dispatch({
        type: types.SET_EDITOR_PATH,
        path,
    });
};

export const selectProject = (dispatch, name) =>{
	dispatch({
		type: types.SELECT_PROJECT,
		data: name,
	});
}