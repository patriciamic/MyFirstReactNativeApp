import {FETCH_FAILURE, FETCH_SUCCESS, FETCH_TV } from "./types"

const initialStateTvReducer = {
    loading: false,
    data: [],
    error: ''
}

export const tvReducer = (state = initialStateTvReducer, action) => {
    switch (action.type) {
        case FETCH_TV:
            return {
                ...state,
                loading: true
            }
        case FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: ''
            }
        case FETCH_FAILURE:
            return {
                ...state,
                loading: false,
                data: [],
                error: action.payload
            }
        default: return state
    }
}