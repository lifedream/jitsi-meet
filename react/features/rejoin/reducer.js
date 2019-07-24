// @flow

import { ReducerRegistry } from '../base/redux';
import { PersistenceRegistry } from '../base/storage';

import { SET_START_TIME, SET_END_TIME, WILL_HANGUP } from './actionTypes';
import { STORE_NAME } from './constants';

PersistenceRegistry.register(STORE_NAME, {
    url: true,
    startTime: true,
    endTime: true
});

ReducerRegistry.register(STORE_NAME, (state = {}, action) => {
    const { url } = action;

    switch (action.type) {
    case WILL_HANGUP: {
        if (url === state.url) {
            return { };
        }
        break;
    }

    case SET_START_TIME: {
        return {
            ...state,
            startTime: action.startTime,
            url: action.url
        };
    }
    case SET_END_TIME: {
        if (url === state.url) {
            return {
                ...state,
                endTime: action.endTime
            };
        }
    }
    }

    return state;
});
