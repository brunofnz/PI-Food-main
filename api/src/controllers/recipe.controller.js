require('dotenv').config();
const { Recipe, Diet } = require('../db');
const { messageApi } = require('../helpers');

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
            messageApi(true, 'Recipes data founds!', dataDb)
        ) 
    } catch (error) {
        res.status(404).send(messageApi(false, 'Recipes data not found!')) 
    }
}

module.exports = {
    seedRecipes,
    getRecipes,
};