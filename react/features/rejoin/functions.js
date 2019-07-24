// @flow

import { getInviteURL, isInviteURLReady } from '../base/connection';
import { toURLString } from '../base/util';

import { STORE_NAME } from './constants';

/**
 * FIXME: Duplicated with features/mobile/watchos.
 *
 * Figures out what's the current conference URL which is supposed to indicate what conference is currently active.
 * When not currently in any conference and not trying to join any then undefined is returned.
 *
 * @param {Object} state - The whole Redux state object.
 * @returns {string|undefined}
 * @private
 */
export function getCurrentConferenceUrl(state: Object) {
    let currentUrl;

    if (isInviteURLReady(state)) {
        currentUrl = toURLString(getInviteURL(state));
    }

    // Check if the URL doesn't end with a slash
    if (currentUrl && currentUrl.substr(-1) === '/') {
        currentUrl = undefined;
    }

    return currentUrl ? currentUrl : undefined;
}

/**
 * FIXME.
 *
 * @param {Object} state - FIXME.
 * @returns {null|number}
 */
export function getLastConferenceDuration(state: Object) {
    const { startTime, endTime } = state[STORE_NAME];

    if (startTime && endTime) {
        return (endTime - startTime) / 1000;
    }

    return null;
}

/**
 * FIXME.
 *
 * @param {Object} state - FIXME.
 * @returns {string|undefined}
 */
export function getRejoinedUrl(state: Object) {
    return state[STORE_NAME].url;
}

/**
 * FIXME.
 *
 * @param {Object} state - FIXME.
 * @returns {string|undefined}
 */
export function getTimeSinceConferenceLeft(state: Object) {
    const { endTime } = state[STORE_NAME];

    return endTime ? (new Date().getTime() - endTime) / 1000 : null;
}
