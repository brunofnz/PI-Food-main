const { Diet } = require('../db');

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
        await data.results?.map(diet => {
            Diet.create({
                name: diet,
            }) 
        })
        res.status(200).send({ 
            msg: 'Seed diets success!',
        }) 
    } catch (error) {
        res.status(404).send('Not found data! Please server logs.');
    }
}

const getDiet = async (req,res) => {
    try {
        res.status(200).send(await Diet.findAll());
    } catch (error) {
        res.status(404).send('Not found data! Please server logs.');
    }
}

module.exports = {
    getDiet,
    seedDiets,
}