const messageApi = (status, msg, data) => {
    if(status) return { status, msg, data }
    return { status, msg }
}

const filterRecipeDataApi = async (data) => {
    // console.log(`🚀 ~ file: index.js:7 ~ filterRecipeDataApi ~ data`, data)
    if(data === undefined || data === null) return null;
    return Promise.all(data?.map( async ({ 
            id,
            title,
            summary,
            healthScore,
            analyzedInstructions,
            image,
            diets 
        }) => {
            const dietsMutado = await diets.map(diet => ({ name: diet }))
            return { 
                id,
                title,
                summary,
                health_score: healthScore,
                steps: analyzedInstructions[0]?.steps,
                image,
                diets: dietsMutado, 
            }
        }
    ))
    .then(res => res)
}

const filterRecipeDetailDataApi = async (data) => {
    // console.log(`🚀 ~ file: index.js:7 ~ filterRecipeDataApi ~ data`, data)
    if(data === undefined || data === null) return null;
    const { 
        id,
        title,
        summary,
        healthScore,
        analyzedInstructions,
        image,
        diets 
     } = data
     const dietsMutado = await diets.map(diet => ({ name: diet }))
    return { 
        id,
        title,
        summary,
        health_score: healthScore,
        steps: analyzedInstructions[0]?.steps,
        image,
        diets: dietsMutado, 
    }
}

module.exports = {
    messageApi,
    filterRecipeDataApi,
    filterRecipeDetailDataApi,
}