import { GET_ALL_RECIPES, SET_NUM_PAGINATED, GET_ALL_DIETS, POST_RECIPE, GET_DETAIL_RECIPE, SET_RECIPE, SEARCH_RECIPE, FILTER_RECIPES_BY_DIET, FILTER_RECIPES_OWNER, FILTER_RECIPES_API } from './actionsTypes';

import axios from 'axios';
import { orderArray } from '../../helpers';

export function getAllRecipes() {
    return (dispatch) => {
        return axios.get('http://localhost:3001/recipes')
            .then(res => dispatch({
                type: GET_ALL_RECIPES,
                payload: res.data.data
            }))
            .catch(error => console.error(error))
    }
};

export function detailRecipe(idRecipe) {
    return async function (dispatch) {
        try {
            axios.get(`http://localhost:3001/recipes/${idRecipe}`)
                .then((data) => {
                    return dispatch({
                        type: SET_RECIPE,
                        payload: data
                    })
                })
        }
        catch (error) {
            console.log(error)
        }
    }
};

export function getAllDiets() {
    return (dispatch) => {
        return axios.get('http://localhost:3001/diets')
            .then(res => dispatch({
                type: GET_ALL_DIETS,
                payload: res.data.data
            }))
            .catch(error => console.error(error))
    }
};

export function postRecipe(form) {
    return (dispatch) => {
        return axios.post('http://localhost:3001/recipes', form)
            .then(res => {
                dispatch({
                    type: POST_RECIPE,
                    payload: res.data.data
                })
                return true
            })
            .catch(error => false)
    }
};

export function numPaginadoChange(num) {
    return (dispatch) => {
        return dispatch({
                type: SET_NUM_PAGINATED,
                payload: num
            })
    }
};

export function cleanDetailRecipe() {
    return (dispatch) => {
        return dispatch({
                type: SET_RECIPE,
                payload: null
            })
    }
};

export function searchRecipe(recipe) {
    return (dispatch) => {
        return dispatch({
                type: SEARCH_RECIPE,
                payload: recipe
            })
    }
};

export function filterByDiet(payload, allRecipes) {
    return {
        type: FILTER_RECIPES_BY_DIET,
        payload: allRecipes.filter(item => item.diets.find(diet => diet.name === payload))
    }
};

export function filterByOwner(payload) {
    return {
        type: FILTER_RECIPES_OWNER,
        payload: payload.filter(item => String(item.id).length > 10)
    }
};

export function filterByApi(payload) {
    return {
        type: FILTER_RECIPES_API,
        payload: payload.filter(item => String(item.id).length < 10)
    }
};

export function orderBy(data,option) {
    return (dispatch) => {
        return dispatch({
            type: GET_ALL_RECIPES,
            payload: orderArray(data,option),
        })
    }
};