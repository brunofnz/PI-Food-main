import { useDispatch, useSelector } from "react-redux";
import style from "../assets/styles/Paginated.module.css";
import { numPaginadoChange } from "../redux/actions";

const Paginated = () => {
  const { numPaginado, paginated } = useSelector(store => store)
  const dispatch = useDispatch()
  return (
    <div className={style.container}>
      <button
            className={style.buttonIndexColor}
            onClick={() => dispatch(numPaginadoChange(numPaginado - 1))}
            disabled={ numPaginado === 0 }
          >
            {'<'}
      </button>
      {paginated?.map((item, index) => {
        return (
          <button
            className={
              numPaginado === index ? style.buttonIndexColor : style.buttonIndex
            }
            onClick={() => dispatch(numPaginadoChange(index))}
          >
            {index + 1}
          </button>
        );
      })}
      <button
        disabled={numPaginado === paginated?.length - 1 }
        className={style.buttonIndexColor}
        onClick={() => dispatch(numPaginadoChange(numPaginado + 1))}
      >
        {'>'}
      </button>
    </div>
  );
};

export default Paginated;
