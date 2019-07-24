import { StateListenerRegistry } from '../base/redux';

import {
    getCurrentConferenceUrl,
    getLastConferenceDuration,
    getRejoinedUrl,
    getTimeSinceConferenceLeft
} from './functions';
import { storeStartTime, storeEndTime } from './actions';
import { createRejoinedEvent, sendAnalytics } from '../analytics';

StateListenerRegistry.register(
    /* selector */ state => getCurrentConferenceUrl(state),
    /* listener */ (currentUrl, { dispatch, getState }, prevUrl) => {
        // Enable only on web
        if (typeof APP === 'undefined') {
            return;
        }

        if (!prevUrl && currentUrl) {
            const state = getState();
            const rejoinedUrl = getRejoinedUrl(state);

            if (currentUrl === rejoinedUrl) {
                console.info('REJOIN', {
                    lastDuration: getLastConferenceDuration(state),
                    url: rejoinedUrl,
                    timeSinceLeft: getTimeSinceConferenceLeft(state)
                });

                sendAnalytics(
                    createRejoinedEvent({
                        lastConferenceDuration: getLastConferenceDuration(state),
                        timeSinceLeft: getTimeSinceConferenceLeft(state),
                        url: rejoinedUrl
                    })
                );
            }

            dispatch(storeStartTime(currentUrl));

            // NOTE This is ok only on web, because conference is only ever
            // joined once
            window.addEventListener(
                'beforeunload',
                () => {
                    dispatch(storeEndTime(currentUrl));
                });
        } else if (!currentUrl && prevUrl) {
            dispatch(storeEndTime(prevUrl));
        }
    });
