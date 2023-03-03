import { FETCH_TV, ADD_TO_FAVORITES, FETCH_SUCCESS, FETCH_FAILURE } from './types'
import { TvRepository } from "../../data/tvTracker/TvRepository"


export const fetchTvRequest = () => {
    return {
        type: FETCH_TV
    }
}

export const fetchSuccess = list => {
    return {
        type: FETCH_SUCCESS,
        payload: list
    }
}

export const fetchFailure = error => {
    return {
        type: FETCH_FAILURE,
        payload: error
    }
}

export const addToFavoritesRequest = () => {
    return {
        type: ADD_TO_FAVORITES
    }
}

const repository = new TvRepository()

export const fetchTvList = (tvType) => {
    return (dispatch) => {
        dispatch(fetchTvRequest)
        repository.getTvList(tvType)
            .then((response) => {
                dispatch(fetchSuccess(response))
            })
            .catch((error) => {
                dispatch(fetchFailure(error.message))
            })
    }
}

/** Adds the given data to favorites.
* @param {FavoriteTvData} data - The data to be stored
*/
export const addToFavorites = (data) => {
    return (dispatch) => {
        repository.addToFavorites(data)
        .then(() => {
            dispatch(addToFavoritesRequest)
        })
    }
}

