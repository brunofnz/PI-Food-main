const initialState = {
    allRecipes: [],
    filteredRecipes: [],
    orderBy: [],
    paginado: [], 
    numPaginado: 0,
    recipes: null,
    diets: [],
}

export const rootReducer = (state = initialState, { type, payload}) => {
    switch (type) {
        default:
            return state
    }
}