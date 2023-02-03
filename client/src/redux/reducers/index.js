import { paginationArray } from "../../helpers"
import { GET_ALL_DIETS, GET_ALL_RECIPES, POST_RECIPE, SET_NUM_PAGINATED, GET_DETAIL_RECIPE, SET_RECIPE, SEARCH_RECIPE, FILTER_RECIPES_BY_DIET, FILTER_RECIPES_OWNER, FILTER_RECIPES_API } from "../actions/actionsTypes"

const initialState = {
    allRecipes: [],
    filteredRecipes: [],
    orderBy: [],
    paginated: [], 
    numPaginado: 0,
    recipe: null,
    diets: [],
}

export const rootReducer = (state = initialState, { type, payload}) => {
    switch (type) {
        case GET_ALL_RECIPES:
            return {
                ...state,
                allRecipes: payload,
                paginated: paginationArray(payload,9),
            }
        case GET_ALL_DIETS:
            return {
                ...state,
                diets: payload,
            }
        case POST_RECIPE:
            return {
                ...state,
                recipe: payload,
            }
        case SET_NUM_PAGINATED:
            return {
                ...state,
                numPaginado: payload
            }
        case SET_RECIPE:
            return {
                ...state,
                recipe: payload
            }
        case SEARCH_RECIPE:
            return {
                ...state,
                paginated: paginationArray(
                    state.allRecipes.filter(item => 
                        item.title.slice(0, payload.trim().length).toLowerCase() === payload.trim().toLowerCase()
                    ), 15),
            }
        case FILTER_RECIPES_BY_DIET:
            return {
                ...state,
                paginated: paginationArray(payload, 9)
            }
        case FILTER_RECIPES_OWNER:
            return {
                ...state,
                paginated: paginationArray(payload, 9)
            }
        case FILTER_RECIPES_API:
            return {
                ...state,
                paginated: paginationArray(payload, 9)
            }
        default:
            return state
    }
}