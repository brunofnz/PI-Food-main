import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { detailRecipe } from "../redux/actions";
// import style from "../assets/styles/ContainerCards.module.css";
import style from "../assets/styles/DetailRecipe.module.css";
import Header from "../components/Header";

const Detail = () => {
  const { idRecipe } = useParams();

  const dispatch = useDispatch();
  const recipe = useSelector((store) => store.recipe);
  const [loading, setLoading] = useState('Loading...')
  useEffect(() => {
    dispatch(detailRecipe(idRecipe));
  }, []);

  useEffect(() => {
  }, [recipe]);

  return (
    <>
      {recipe ? (
        <>
          <Header />
          <div className={style.detailContent}>
            <h1 className={style.title}>Detail Recipe</h1>
            <div className={style.containerRecipe}>
              <div className={style.containerInfoRecipe}>
                <div
                  style={{
                    backgroundImage: recipe.data.data
                      ? `url(${recipe.data.data.image})`
                      : "https://img.freepik.com/premium-vector/system-software-update-upgrade-concept-loading-process-screen-vector-illustration_175838-2182.jpg?w=2000",
                  }}
                  className={style.image}
                ></div>
                <div className={style.infoRecipe}>
                  <h4 className={style.nameRecipe}>
                    {recipe.data.data
                      ? recipe.data.data.title
                      : "Cargando"}
                  </h4>

                  <div>
                    <h4 className={style.titleDiet}> Diets </h4>
                    <div className={style.contentDiet}>
                      {recipe.data.data
                        ? recipe.data.data.diets?.map((item, index) => {
                            console.log(`🚀 ~ file: DetailRecipe.js:51 ~ ?recipe.data.data.diets?.map ~ item`, item)
                            return (
                              <p key={index} className={style.diet}>
                                #{item.name}
                              </p>
                            );
                          })
                        : "Cargando..."}
                    </div>
                  </div>
                  <h4 className={style.titleDescirption}>Description </h4>
                  <div className={style.containerDescription}>
                    <p className={style.textDescription}>
                      {recipe.data.data
                        ? recipe.data.data.summary
                        : "Cargando"}
                    </p>
                  </div>
                  {recipe.data.data.steps && <h4 className={style.titleDiet}> Steps </h4>}
                  <div>
                    <div className={style.contentDiet}>
                      {recipe.data.data
                        ? recipe.data.data.steps?.map((item, index) => {
                            return (
                              <p key={index} className={style.diet}>
                                #{item.number} - {item.step}
                              </p>
                            );
                          })
                        : "Cargando..."}
                    </div>
                  </div>
                </div>
              </div>
              <div className={style.containerSpecs}>
                <div>
                  <h4 className={style.titleDescirption}> Health Score: {recipe.data.data
                    ? recipe.data.data.health_score
                    : "Cargando"} </h4>
                  
                </div>
                <div>
                  <h4 className={style.titleDescirption}>{''}</h4>

                  {/* <p className={style.font}>
                    {" "}
                    {recipe.data.data
                      ? recipe.data.data.released
                      : "Cargando"}{" "}
                  </p> */}
                </div>
                
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Header />
          {
            <h1>{loading}</h1>
          }
            </>
      )}
    </>
  );
};

export default Detail;