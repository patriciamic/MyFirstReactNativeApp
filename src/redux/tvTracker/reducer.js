import { ADD_TO_FAVORITES, FAILURE_ADD_TO_FAVORITES, FAILURE_REMOVE_FROM_FAVORITES, FETCH_DETAILS, FETCH_DETAILS_FAILURE, FETCH_DETAILS_SUCCESS, FETCH_FAILURE, FETCH_SUCCESS, FETCH_TV, REMOVE_FROM_FAVORITES, SUCCESS_ADD_TO_FAVORITES, SUCCESS_REMOVE_FROM_FAVORITES } from "./types"
import { DetailsTvData } from "../../data/tvTracker/TvData"

const initialStateTvReducer = {
    loading: false,
    data: [],
    error: ''
}

export const tvReducer = (state = initialStateTvReducer, action) => {
    switch (action.type) {
        case FETCH_TV:
        case REMOVE_FROM_FAVORITES:
            return {
                ...state,
                loading: true
            }
        case FETCH_SUCCESS:
        case SUCCESS_REMOVE_FROM_FAVORITES:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: ''
            }
        case FETCH_FAILURE:
        case FAILURE_REMOVE_FROM_FAVORITES:
            return {
                ...state,
                loading: false,
                data: [],
                error: action.payload
            }
        default: return state
    }
}

const initialStateTvDetails = {
    loading: false,
    data: new DetailsTvData(" ", " ", " ", " ", " "),
    isFavorite: false,
    error: ''
}

export const tvDetailsReducer = (state = initialStateTvDetails, action) => {
    switch (action.type) {
        case FETCH_DETAILS:
            return {
                ...state,
                loading: true
            }
        case FETCH_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload.data,
                isFavorite: action.payload.isFavorite,
                error: ""
            }
        case FETCH_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                data: {},
                isFavorite: false,
                error: action.payload
            }
        case ADD_TO_FAVORITES:
            return {
                ...state,
                loading: true
            }
        case SUCCESS_ADD_TO_FAVORITES:
            return {
                ...state,
                loading: false,
                isFavorite: action.payload,
                error: ""
            }
        case FAILURE_ADD_TO_FAVORITES:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}