import { useSelector } from 'react-redux';
import Card from './Card';


const ContainerCards = ({ listArray }) => {
  const numPaginado = useSelector(store => store.numPaginado)
  return (
    <div
      style={{
        width: "100%",
        height:'100%',
        padding: "30px 50px",
        margin: "0px 0",
        display: "grid",
        gridTemplateColumns: 'repeat(3, 380px)',
        gridTemplateRow: 'repeat(3, 2800px)',
        gridRowGap: '20px',
        gridColumnGap: '5px',
        backgroundColor: '#E27713',
        justifyContent: "space-around",
        boxSizing: 'border-box',
      }}
    >
      {listArray[numPaginado]?.map((recipe, index) => {
        return ( <Card              
                    id ={recipe.id}
                    name={recipe.title}
                    image={recipe.image}
                    diets={recipe.diets} 
                />);
      })}
    </div>
  );
};

export default ContainerCards;