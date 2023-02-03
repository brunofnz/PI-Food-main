const { Diet } = require('../db');
const { messageApi } = require('../helpers');

const seedDiets = async (req,res) => {
    try {
        const data = [
            'gluten free',
            'ketogenic',
            'vegetarian',
            'lacto-vegetarian',
            'ovo-vegetarian',
            'vegan',
            'pescetarian',
            'paleo',
            'primal',
            'low fodmap',
            'whole30',
        ]
        await data.map(diet => {
            Diet.create({
                name: diet,
            }) 
        })
        res.status(200).send(messageApi(true, 'Seed diets success!', 'GET /diets'))
    } catch (error) {
        res.status(404).send('Not found data! Please server logs.');
    }
}

const getDiet = async (req,res) => {
    try {
        const diets = await Diet.findAll()
        res.status(200).send(messageApi(true, 'Diets found!', diets));
    } catch (error) {
        res.status(404).send('Not found data! Please server logs.');
    }
}

module.exports = {
    getDiet,
    seedDiets,
}