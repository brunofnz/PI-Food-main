const { Router } = require('express');
const { seedDiets, getDiet } = require('../controllers/diet.controller');
const { seedRecipes, getRecipes, getRecipeById, createRecipe } = require('../controllers/recipe.controller');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.post('/seedDiets', seedDiets)

router.post('/seedRecipes', seedRecipes)

router.get('/recipes', getRecipes)

router.get('/recipes/:idReceta', getRecipeById)

router.post('/recipes', createRecipe)

router.get('/diets', getDiet)

module.exports = router;
