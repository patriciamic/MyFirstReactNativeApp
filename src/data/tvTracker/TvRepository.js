import { TvData, DetailsTvData, FavoriteTvData } from "./TvData";
import TvType from "../../screens/tvTracker/TvType";
import Storage from "../Storage";


const TvEndpoint = {
    POPULAR: '/popular',
    TOP_RATED: '/top_rated'
}

BASE_URL = "https://api.themoviedb.org/3/tv"
IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/'

export function buildImageUrl(imageName) {
    return this.IMAGE_BASE_URL + imageName
}

export class TvRepository {

    // TODO find best practice for adding the API Key to URL
    API_KEY = "?api_key=0a416fc6c49f4a04db6e3bd398ef8579"
    // TODO execute the config endpoint in order to get the image base URL
    FAVORITES_STORED_KEY = "tv_tracker_favorites"

    /** Gets the Tv List.
     * @param {TvType} tvType - The type category to be fetched
     * @returns {[TvData] | [FavoriteTvData]} The list fetched from the given tvType
     */
    getTvList = async (tvType) => {
        try {
            if (tvType == TvType.FAVORITES) {
                console.log("Executing Get Favorites..")
                return this.getFavorites()
            }

            const tvRoute = tvType == TvType.POPULAR ? TvEndpoint.POPULAR : TvEndpoint.TOP_RATED
            const URL = BASE_URL + tvRoute + this.API_KEY
            console.log("Executing GET for " + tvType + " URL: " + URL)

            const response = await fetch(URL, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            const result = await response.json()

            return result.results.map((item) => new TvData(item.id, item.name, item.backdrop_path))
        } catch (error) {
            console.log("Error while trying to get data: " + error)
            return []
        }
    }

    getTvDetails = async (id) => {
        try {
            const idRoute = '/' + id
            const URL = BASE_URL + idRoute + this.API_KEY
            console.log("Executing GET for " + id + " URL: " + URL)

            const response = await fetch(URL, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            const result = await response.json()

            return new DetailsTvData(
                result.id,
                result.name,
                result.backdrop_path,
                result.overview,
                result.poster_path
            )
        } catch (error) {
            console.log("Error while trying to get data: " + error)
            return {}
        }
    }

    /** Adds the given data to favorites.
     * @param {FavoriteTvData} data - The data to be stored
     */
    addToFavorites = async (data) => {
        let currentFavorites = await this.getFavorites();

        let newFavorites = currentFavorites != null ? [...currentFavorites, data] : [data]

        return await Storage.store(this.FAVORITES_STORED_KEY, newFavorites);
    }

    /** @returns {[FavoriteTvData]} */
    getFavorites = async () => {
        return Storage.get(this.FAVORITES_STORED_KEY);
    }

    removeFromFavorites = async (id) => {
        let currentFavorites = await this.getFavorites();

        if (currentFavorites == null) return;

        let newFavorites = currentFavorites.filter((item) => item.id != id);

        return await Storage.store(this.FAVORITES_STORED_KEY, newFavorites);
    }
} 