import {useHistory} from 'react-router-dom'
import style from '../assets/styles/LandingPage.module.css'
import logoRecipe from '../assets/svg/LOGO.svg'

export const LandingPage = () => {

  const history = useHistory();

  function onNavigate(path) {
    history.push(path)
  }

  return (
    <div className={style.container}>
      <div className={style.displayLogo}>
        <div>
          <img src={logoRecipe} alt="Foods Logo" />
        </div>
        <div className={style.presentacionText}>Find the best recipes for your diet or to be happy.</div>
      </div>
      <div>
        <button className={style.buttonStart} onClick={() => onNavigate('/recipes')}>Start</button>
      </div>
    </div>
  )
}

export default LandingPage;