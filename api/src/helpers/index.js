const messageApi = (status, msg, data) => {
    if(status) return { status, msg, data }
    return { status, msg }
}

const filterRecipeDataApi = async (data) => {
    // console.log(`🚀 ~ file: index.js:7 ~ filterRecipeDataApi ~ data`, data)
    if(data === undefined || data === null) return null;
    return await data?.map(
        ({ 
            id,
            title,
            summary,
            healthScore,
            analyzedInstructions,
            image,
            diets 
        }) => ({
            id,
            title,
            summary,
            health_score: healthScore,
            steps: analyzedInstructions[0]?.steps,
            image,
            diets,
        })
    )
}

module.exports = {
    messageApi,
    filterRecipeDataApi,
}