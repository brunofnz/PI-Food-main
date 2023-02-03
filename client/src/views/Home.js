import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Footer, Header, Paginated } from '../components'
import ContainerCards from '../components/ContainerCards'
import SearchBar from '../components/SearchBar'
import { cleanDetailRecipe, detailRecipe, getAllRecipes } from '../redux/actions'

const Home = () => {
  const dispatch = useDispatch();
  const { paginated } = useSelector(store => store)

  useEffect(() => {
    dispatch(getAllRecipes())
    dispatch(cleanDetailRecipe())
  }, [])

  useEffect(() => {
    console.table(paginated);
  }, [paginated])

  return (
    <>
      <Header/>
      <SearchBar/>
      <Paginated />
      <ContainerCards listArray={paginated}/>
      <Paginated />
      <Footer/>
    </>
  )
}

export default Home