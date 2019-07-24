// @flow

import { SET_END_TIME, SET_START_TIME, WILL_HANGUP } from './actionTypes';

/**
 * Stores end time of the current conference.
 *
 * @param {string} url - Full URL of the current conference.
 * @returns {{
 *     endTime: number,
 *     type: SET_END_TIME,
 *     url: string
 * }}
 */
export function storeEndTime(url: string) {
    return {
        type: SET_END_TIME,
        endTime: new Date().getTime(),
        url
    };
}

/**
 * Stores start time of the current conference.
 *
 * @param {string} url - Full URL of the current conference.
 * @returns {{
 *     startTime: number,
 *     type: SET_START_TIME,
 *     url: string
 * }}
 */
export function storeStartTime(url: string) {
    return {
        type: SET_START_TIME,
        startTime: new Date().getTime(),
        url
    };
}

/**
 * Signals that the hangup button was used to end the conference.
 *
 * @param {string} url - Full URL of the current conference.
 * @returns {{
 *     type: WILL_HANGUP,
 *     url: string
 * }}
 */
export function willHangup(url: string) {
    return {
        type: WILL_HANGUP,
        url
    };
}
