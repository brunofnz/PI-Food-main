import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Header } from '../components'
import { getAllDiets, postRecipe } from '../redux/actions';
import style from "../assets/styles/AddRecipe.module.css";


// * [ ] Un formulario controlado con JavaScript con los siguientes campos:
// * Nombre
// * Resumen del plato
// * Nivel de "comida saludable" (health score)
// * Paso a paso
// * [ ] Posibilidad de seleccionar/agregar uno o más tipos de dietas
// * [ ] Botón/Opción para crear una nueva receta

const AddRecipe = () => {
  const dispatch = useDispatch();
  const { diets } = useSelector(store => store);
  
  const [form, setForm] = useState({ 
    title: '',
    summary: '',
    health_score: 0,
    steps: [],
    image: '',
    diets: [],
  });

  const [step, setStep] = useState('')
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const [contStep, setContStep] = useState('')
  const [contTitle, setContTitle] = useState('')
  const [contDescription, setContDescription] = useState('')

  const history = useHistory()
  useEffect(() => {
    dispatch(getAllDiets())
  }, [])
    
  const handleChange = (e) => {
    setForm(() => {
      const newInput = {
        ...form,
        [e.target.id]: e.target.value,
      };
      const errors = validate(newInput);
      setErrors(errors);
      return newInput;
    });
  };

  const handleInput = ( e, size ) => {
    if (e.target.value.length <= size) handleChange(e)
  }

  const validate = (input) => {
    let errors = {};
    if(!input.title) {
      errors.title = 'Title is required';
    }
    if(!input.summary) {
      errors.summary = 'Summary is required';
    }
    if(!input.health_score) {
      errors.health_score = 'Health score is required';
    }
    if(!input.steps) {
      errors.steps = 'Steps is required';
    }
    if(!input.image) {
      errors.image = 'Image is required';
    }
    if(!input.diets) {
      errors.diets = 'Diets is required';
    }
    return errors
  }

  const handleStep = (e) => {
    setStep(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    form.health_score = Number(form.health_score)
    const cond = await dispatch(postRecipe(form));
    if (cond) {
      setMessage('Carga exitosa.')
      setTimeout(() => {
        setMessage('')
        history.push('/recipes')
      }, 2000);
    } else {
      setMessage('Error en la carga de datos.')
      setTimeout(() => {
        setMessage('')
      }, 5000);
    }
  };

  const disabledSubmit = useMemo(() => {
    if (
      form.title.length > 0 &&
      form.summary.length > 0 &&
      form.health_score.length > 0 &&
      form.steps.length > 0 &&
      form.image.length > 0 &&
      form.diets.length > 0 
    ) return false
    return true
  }, [form])
  

  function handleAddDiet(e) {
    if(!form.diets?.find(item => e.target.value === item.id)) {
      const value = diets?.find(item => e.target.value === item.id)
      setForm({
        ...form,
        diets:  [...form.diets, {
          id: value.id,
          name: value.name
        }]
      })
    }
  }

  function handleDeleteDiet(id) {
      setForm({
        ...form,
        diets: form.diets?.filter(item => id !== item.id)
      })
    }

    function handleAddStep() {
        if(!form.steps?.find(item => step === item.step)) {
            setForm({
              ...form,
              steps:  [...form.steps, {
                step: step
              }]
            })
        }
    }

    function handleDeleteStep(name) {
        setForm({
          ...form,
          steps: form.steps?.filter(item => name !== item.step)
        })
      }

  return (
    <>
      <Header />
      <div className={style.container}>
      <div className={style.containerForm}>
        <form onSubmit={handleSubmit} className={style.form}>
          <div style={{justifyContent: 'space-between'}}>
            <label htmlFor="" className={style.lebelForm}>Name</label>
          </div>
          <div>
            <input id='title' onChange={(e) => handleInput(e, 50)} type="text" placeholder="..." className={style.inputForm} />
            <label>{errors.title ? <span style={{color: 'red'}}>{errors.title}</span>  : form.title.length + '/50'}</label>
            
          </div>
          <div>
            <label htmlFor="" className={style.lebelForm}>Description</label>
          </div>
          <div>
            <textarea id='summary'  onChange={(e) => handleInput(e, 500)} type="text" placeholder="..." className={style.textarea} />
            <label>{errors.summary ? <span style={{color: 'red'}}>{errors.summary}</span>  : form.summary.length + '/500'}</label>
          </div>
          
          <div>
            <label  className={style.lebelForm} htmlFor="">Health Score</label>
          </div>
          <div>
            <input id='health_score' onChange={handleChange}
              type="number"
              className={style.inputForm}
              min={0}
              max={100}
              placeholder="1" 
              // step="0.01"
            />
            <label>{errors.health_score && <span style={{color: 'red'}}>{errors.health_score}</span>}</label>
          </div>
          <div>
            <label  className={style.lebelForm} htmlFor="">Select diets</label>
          </div>
          <div className={style.containerSelectItems}>
            {
              form.diets && form.diets?.map(diet => {
                return <div onClick={() => handleDeleteDiet(diet.id)} className={style.selectItem} key={diet.id}>{diet.name}</div>
              })
            } 
          </div>
          <div>
            <select name="select" className={style.inputSelect} onChange={handleAddDiet}>
              <option value={0} selected>
                 ...
              </option>
              {
              diets && diets?.map(diet => {
                return <option value={diet.id}>{diet.name}</option>
              })
            }
            </select>
            <label>{errors.diets && <span style={{color: 'red'}}>{errors.diets}</span>}</label>
          </div>
          
          
          <div>
            <label  className={style.lebelForm} htmlFor="">Image</label>
          </div>
          <div>
            <input id='image' onChange={handleChange}
              type="text"
              className={style.inputForm}
              placeholder="..." 
            />
            <label>{errors.image && <span style={{color: 'red'}}>{errors.image}</span>}</label>
          </div>
          <span>{message}</span>

          <input disabled={disabledSubmit} type="submit" value="Add" placeholder="ADD" className={ disabledSubmit ? style.buttonLinksDisabled : style.buttonLinks}/>
        </form>
      </div>
      <div className={style.containerSteps}>
        <div>
          <label className={style.lebelForm} htmlFor="">Steps</label>
        </div>
          <div>
            <input 
              onChange={handleStep}
              type="text"
              id="steps"
              name="steps"
              className={style.inputForm}
              placeholder="..." 
            />
            <button onClick={handleAddStep} className={style.buttonLinks}>
              Add step
            </button>
          </div>
          {
              form.steps && form.steps?.map((step, index) => {
                return <p onClick={() => handleDeleteStep(step.step)} className={style.step} key={index}>#{index + 1} {step.step}</p>
              })
            } 
            <label>{errors.steps && <span style={{color: 'red'}}>{errors.steps}</span>}</label>
            
      </div>
      </div>

    </>
  );
};

export default AddRecipe