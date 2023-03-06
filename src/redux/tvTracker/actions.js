import { FETCH_TV, FETCH_SUCCESS, FETCH_FAILURE, REMOVE_FROM_FAVORITES, SUCCESS_REMOVE_FROM_FAVORITES, FAILURE_REMOVE_FROM_FAVORITES, ADD_TO_FAVORITES, SUCCESS_ADD_TO_FAVORITES, FAILURE_ADD_TO_FAVORITES, FETCH_DETAILS, FETCH_DETAILS_SUCCESS, FETCH_DETAILS_FAILURE } from './types'
import { TvRepository } from "../../data/tvTracker/TvRepository"
import TvType from '../../screens/tvTracker/TvType'


const fetchTvRequest = () => {
    return {
        type: FETCH_TV
    }
}

const fetchSuccess = list => {
    return {
        type: FETCH_SUCCESS,
        payload: list
    }
}

const fetchFailure = error => {
    return {
        type: FETCH_FAILURE,
        payload: error
    }
}

const removeFromFavoritesRequest = () => {
    return {
        type: REMOVE_FROM_FAVORITES
    }
}

const successRemoveFromFavorites = list => {
    return {
        type: SUCCESS_REMOVE_FROM_FAVORITES,
        payload: list
    }
}

const failureRemoveFromFavorites = error => {
    return {
        type: FAILURE_REMOVE_FROM_FAVORITES,
        payload: error
    }
}

const fetchTvDetailsRequest = () => {
    return {
        type: FETCH_DETAILS
    }
}

const fetchTvDetailsSuccess = (data, isFavorite) => {
    return {
        type: FETCH_DETAILS_SUCCESS,
        payload: {
            data: data,
            isFavorite: isFavorite
        }
    }
}

const fetchTvDetailsFailure = error => {
    return {
        type: FETCH_DETAILS_FAILURE,
        payload: error
    }
}

const addToFavoritesRequest = () => {
    return {
        type: ADD_TO_FAVORITES
    }
}

const successAddToFromFavorites = isFavorite => {
    return {
        type: SUCCESS_ADD_TO_FAVORITES,
        payload: isFavorite
    }
}

const failureAddToFromFavorites = error => {
    return {
        type: FAILURE_ADD_TO_FAVORITES,
        payload: error
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

export const removeFromFavorites = (id) => {
    return (dispatch) => {
        dispatch(removeFromFavoritesRequest())
        repository.removeFromFavorites(id)
            .then(() => repository.getTvList(TvType.FAVORITES))
            .then((list) => {
                dispatch(successRemoveFromFavorites(list))
            })
            .catch((error) => {
                dispatch(failureRemoveFromFavorites(error.messageÒ))
            })
    }
}

export const fetchTvDetails = (id) => {
    return (dispatch) => {
        dispatch(fetchTvDetailsRequest)
        Promise.all([repository.getTvDetails(id), repository.getFavorites()])
            .then(function ([details, favorites]) {
                if (favorites == null) {
                    dispatch(fetchTvDetailsSuccess(details, false))
                    return;
                }

                let isFavorite = false;
                favorites.forEach(item => {
                    if (item.id == details.id) {
                        isFavorite = true;
                    }
                });

                dispatch(fetchTvDetailsSuccess(details, isFavorite))
            })
            .catch((error) => {
                dispatch(fetchTvDetailsFailure(error.message))
            })
    }
}

/** Adds the given data to favorites.
* @param {FavoriteTvData} data - The data to be stored
*/
export const addToFavorites = (data) => {
    return (dispatch) => {
        dispatch(addToFavoritesRequest)
        repository.addToFavorites(data)
            .then(() => {
                dispatch(successAddToFromFavorites(true))
            })
            .catch((error) => {
                dispatch(failureAddToFromFavorites(error.message))
            })
    }
}
