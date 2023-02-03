import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterByApi, filterByDiet, filterByOwner, getAllDiets, getAllRecipes, orderBy, searchRecipe } from '../redux/actions'
import style from "../assets/styles/SearchBar.module.css";


const SearchBar = () => {
  const dispatch = useDispatch()
  const { allRecipes, paginated, diets } = useSelector(store => store)

  useEffect(() => {
    dispatch(getAllDiets())
  }, [])

  const handleSearchRecipe = (e) => {
    e.preventDefault();
    dispatch(searchRecipe(e.target.value))
  }

  function handleFilterByDiets(e) {
    e.preventDefault();
    dispatch(filterByDiet(e.target.value, allRecipes))
  };

  
  function handleFilterByOwnerApi(e) {
    e.preventDefault();
    if (e.target.value === 'owner') {
        dispatch(filterByOwner(allRecipes))
    }
    if (e.target.value === 'api') {
      dispatch(filterByApi(allRecipes))
    }
    if (e.target.value === 'reset') {
      dispatch(getAllRecipes())
    }
  };

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderBy(allRecipes, e.target.value))
  };

  return (
    <div className={style.container}>
      <div className={style.bar}>
        <div className={style.contentInputs}>
          <input
            type="text"
            name=""
            id=""
            placeholder="Search"
            className={style.inputSearch}
            onChange={handleSearchRecipe}
          />
        </div>
        <div className={style.contentInputs}>
          <label htmlFor="" className={style.textSelectss}>
            Filter By Diet
          </label>
          <select name="" id="" className={style.selectInput} onChange={handleFilterByDiets}>
          <option selected>Select...</option>

          {
              diets && diets?.map(diet => {
                return <option value={diet.name}>{diet.name}</option>
              })
            }
          </select>
        </div>
        <div className={style.contentInputs}>
          <label htmlFor="" className={style.textSelectss}>
            Filter By Owner
          </label>
          <select name="" id="" className={style.selectInput} onChange={handleFilterByOwnerApi}>
                <option selected>Select...</option>
                <option value={'reset'}>All</option>
                <option value={'api'}>API</option>
                <option value={'owner'}>Owner</option>
          </select>
        </div>
        <div className={style.contentInputs}>
          <label htmlFor="" className={style.textSelectss}>
            Order By
          </label>
          <select name="" id="" className={style.selectInput} onChange={e => handleSort(e)}>
          <option selected> Select order </option>
                  <option value='asc'>A - Z</option>
                  <option value='desc'>Z - A</option>
                  <option value='health_score'>Health Score</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default SearchBar