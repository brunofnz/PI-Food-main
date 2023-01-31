require('dotenv').config();
const axios = require('axios');
const { Recipe, Diet } = require('../db');
const { messageApi, filterRecipeDataApi,  } = require('../helpers');
const {
    URL_RECIPES,
} = process.env;
const { Sequelize:{Op} } = require('sequelize');

const dietAsync = async (name) => {
    let dietFind = await Diet.findOne({ where: { name } });
    return dietFind;
}

const seedRecipes = async (req,res) => {
    try {
        const data = [
            {
                title: 'Ice Cream Yogur',
                summary: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem 
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
                took a galley of type and scrambled it to make a type specimen book. It has survived not only 
                five centuries.`,
                health_score: 38,
                steps:[
                    {
                        number: 1,
                        step: "Take some yogurt in your favorite flavor and add 1 container to your blender.",
                        ingredients: [
                            {
                                "name": "yogurt",
                            }
                        ],
                        equipment: [
                            {
                                "name": "blender",
                            }
                        ]
                    },
                ],
                image: 'https://i.blogs.es/9058b3/receta-de-helado-de-yogur/840_560.jpg',
                diets: [
                    'gluten free',
                    'ketogenic',
                ],
            },
        ]
        await Promise.all(
            await data?.map(async (recipe) => {
                const {
                    title,
                    summary,
                    health_score,
                    steps,
                    image,
                    diets,
                } = recipe
                const recipeValidate = await Recipe.findOne({
                    where: {title}
                })
                if (!recipeValidate) {
                    const recipeCreate = await Recipe.create({ 
                        title, 
                        summary, 
                        health_score, 
                        steps, 
                        image, 
                    })
                    diets.map(async (diet) => {
                        let dietFinded = await dietAsync(diet);
                        if(dietFinded){
                            recipeCreate.addDiet(dietFinded.id);
                        }
                    })
                }
            })
        )
        .then(() => res.status(200).send({ 
            msg: 'Seed recipes success!',
        }))
    } catch (error) {
        res.status(500).send({ 
            msg: 'Data not loaded.',
            error
        }) 
    }
}

const getRecipes = async (req,res) => {
    try {
        const array9 = [];
        const { name } = req.query;
        if( name ) {
            const findRecipe = await Recipe.findAll({     
                where: {
                    title: {
                        [Op.like]: `%${name}%`,
                    }
                },
                attributes: [
                    'id',
                    'title',
                    'summary',
                    'health_score',
                    'steps',
                    'image',
                ],
                include: {
                    model: Diet,
                    attributes: ['name']
                }
            })
            if (findRecipe?.length > 0) {
                findRecipe?.map(recipe => array9.push(recipe))
            }
            const { data:{ results } } = await axios.get(`${URL_RECIPES}&titleMatch=${name}`);
            const suma = results?.length + findRecipe?.length >= 9 ? 9 - findRecipe?.length : results?.length - findRecipe?.length
            if(results?.length > 0) {
                for (let i = 0; i < suma ; i++) {
                    array9.push({
                            id: results[i].id,
                            title: results[i].title,
                            summary: results[i].summary,
                            health_score: results[i].healthScore,
                            steps: results[i].analyzedInstructions[0]?.steps,
                            image: results[i].image,
                            diets: results[i].diets,
                        });
                }
            }
            if (findRecipe?.length === 0 && results?.length === 0)  res.status(404).send(message(false, `Not found recipe ${title}.`))
            res.status(200).send(messageApi(true, 'Found recipes.',array9))
        } else {
            const { data:{ results } } = await axios.get(`${URL_RECIPES}`)
            const dataApi = await filterRecipeDataApi(results)
            const dataDb = await Recipe.findAll({                    
                attributes: [
                    'id',
                    'title',
                    'summary',
                    'health_score',
                    'steps',
                    'image',
                ],
                include: {
                    model: Diet,
                    attributes: ['name']
                }
            })
            res.status(200).send(
                messageApi(
                    true, 
                    'Recipes data founds!', 
                    [...dataDb, ...dataApi]
                )
            )         
        }
    } catch (error) {
        console.log(`🚀 ~ file: recipe.controller.js:158 ~ getRecipes ~ error`, error)
        res.status(404).send(messageApi(false, 'Recipes data not found! Please server logs')) 
    }
}

const getRecipeById = async (req,res) => {
    try {
        const regex = /^[0-9(a-f|A-F)]{8}-[0-9(a-f|A-F)]{4}-4[0-9(a-f|A-F)]{3}-[89ab][0-9(a-f|A-F)]{3}-[0-9(a-f|A-F)]{12}$/g;
        const { idReceta } = req.params;
        if(idReceta === undefined) res.status(400).send(messageApi(false, 'Bad Request'));
        const found = idReceta.match(regex);
        if(found !== null && found.length > 0) {
            const recipe = await Recipe.findOne({
                where: { 
                    id: idReceta 
                },
                attributes: [
                    'id',
                    'title',
                    'summary',
                    'health_score',
                    'steps',
                    'image',
                ],
                include: {
                    model: Diet,
                    attributes: ['name']
                }
            })
            if(recipe) {
                res.status(200).send(messageApi(true,'Recipe found', recipe));
            } else {
                res.status(404).send(messageApi(false,'Recipe not found'));
            }
        } else if(found === null){
            const { data:{ 
                id,
                title,
                summary,
                healthScore,
                analyzedInstructions,
                image,
                diets 
            } } = await axios.get(`https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=1ace762ad72d4ee7bc0da59cf3815ccc`);     
            res.status(200).send(messageApi(true,'Recipe found', { 
                id,
                title,
                summary,
                health_score: healthScore,
                steps: analyzedInstructions[0]?.steps,
                image,
                diets,
            }))   
        } else {
            res.status(400).send(messageApi(false, 'Bad Request'));
        }
    } catch (error) {
        console.log(`🚀 ~ file: recipe.controller.js:201 ~ getRecipeById ~ error`, error)
        res.status(error.response.status).send(message(false, error.response.data.detail));
    }
}

const createRecipe = async (req,res) => {
    try {
        const { 
            title,
            summary,
            image,
            health_score,
            steps,
            diets,         
        } = req.body;
        if( 'string' !== typeof title) res.status(400).send(messageApi(false, `Bad Request! 'title' must be string`));
        if( 'string' !== typeof summary) res.status(400).send(messageApi(false, `Bad Request! 'summary' must be string`));
        if( 'string' !== typeof image) res.status(400).send(messageApi(false, `Bad Request! 'image' must be string`));
        if( 'number' !== typeof health_score) res.status(400).send(messageApi(false, `Bad Request! 'health_score' must be string`));
        if (!Array.isArray(diets)) {
            res.status(400).send(messageApi(false, `Bad Request! 'diets' must be object[] => [{id: string, name: string}]`));
        } 
        if (!Array.isArray(steps)) {
            res.status(400).send(messageApi(false, `Bad Request! 'steps' must be object[] => [{id: string, name: string}]`));
        }
        const recipeValidate = await Recipe.findOne({
            where: {title}
        })
        const dietAsync = async (id) => {
            let dietFind = await Diet.findByPk(id);
            return dietFind;
        }
        if (!recipeValidate) {
            const recipeCreate = await Recipe.create({ 
                title, 
                summary, 
                health_score, 
                steps, 
                image, 
                diets,
            })
            diets.map(async (diet) => {
                let dietFinded = await dietAsync(diet.id);
                if(dietFinded){
                    recipeCreate.addDiet(diet.id);
                }
            })
            res.status(200).send(messageApi(true, 'Recipe created.', recipeCreate))
        } else {
            res.status(417).send(messageApi(false, 'Existing recipe in database.'))
        }
    } catch (error) {
        res.status(400).send(messageApi(false, 'Recipe not created.'))
    }
}

module.exports = {
    seedRecipes,
    getRecipes,
    getRecipeById,
    createRecipe,
};