import {useState, useEffect} from 'react';
import styles from './App.module.scss';
import SearchBar from '../SearchBar/SearchBar';
import DailyForecast from '../Forecast/Daily/DailyForecast';
import WeeklyForecast from '../Forecast/Weekly/WeeklyForecast';
import Highlights from '../Highlights/Highlights';
import Switch from '../Common/Switch/Switch';
import Modal from '../Common/Modal/Modal';
import Alert from '../Alert/Alert';
import { config } from '../../config/appConfig';
import { IWeatherResponseDTO } from '../../api/weather/weatherApi';

const App = (): JSX.Element => {
  const [mobileView, setMobileView] = useState(false);
  const mql = window.matchMedia('(max-width: 1025px)');
  const [weather, setWeather] = useState<IWeatherResponseDTO>();
  const [location, setLocation] = useState<string>('');
  const [alert, setAlert] = useState<boolean>(false);
  const [isToggled, setIsToggled] = useState<boolean>(true);
  const [theme, setTheme] = useState<string>('light');
  const [fontLoaded, setFontLoaded] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
      setMobileView(mql.matches)
  },[mql.matches]);

  useEffect(() => {
    document.fonts.ready.then(() => {
      setFontLoaded(true);
    })
  },[])

  mql.addEventListener('change', (e) => { setMobileView(mql.matches)  });

  const handleGetWeather = (weather: IWeatherResponseDTO): void => {
    setWeather(weather);
    if ( weather?.alerts && weather.alerts.length > 0) {
      setAlert(true);
    }
  }
  const handleGetLocation = (location: string): void => {
    setLocation(location);
  }

  const toggleMode = () => {    
    setIsToggled(!isToggled);
    const newTheme = theme === 'light' ? 'dark' : 'light';    
    setTheme(newTheme);
  }

  const showAlarmModal = () => {
    console.log('about to show the alarm modal')
    setShowModal(!showModal);
  }

  const hideAlarmModal = () => {
    console.log('in hideAlarmModal')
    setShowModal(false);
  }

  if (!fontLoaded) {
    return(
      <></>
    )
  } else {
      return (
        <div className={styles.mainContainer} data-theme={theme}>
          <div className={styles.menuOptions}>
            <Switch title="Dark Theme Toggle" isToggled={isToggled} onToggle={toggleMode} />
            { alert ?  
              <button id='alerts' title="Alerts" className={styles.alerts} onClick={() => setShowModal(true)}>
                <i className="fa-solid fa-triangle-exclamation"/>
              </button> 
              : null 
            }
          </div>
          <Modal show={showModal} 
                 setShow={setShowModal} 
                 config={config.alertModal}
                 wrapperId='modal-portal'
                 theme={theme}
                >
              <div className={styles.modalContainer}>
                <div className={styles.modal}>
                  <div className={styles.modalTitle}>{config.alertModal.title}</div>                  
                    <div className={styles.modalBody}>
                      <div className={styles.modalContentContainer} tabIndex={0} >
                          { weather?.alerts && weather.alerts.length > 0 && (
                              weather.alerts.map((alert) => {
                                return(
                                  <div className={styles.modalContent}>{alert.description}</div>
                                )
                              })
                            ) 
                          }
                          { weather?.alerts && weather.alerts.length > 0 && (
                              weather.alerts.map((alert) => {
                                return(
                                  <div className={styles.modalContent}>{alert.description}</div>
                                )
                              })
                            ) 
                          }
                          </div>
                    <div className={styles.modalActions}>
                      <div className={styles.actionButtons}>
                        <button onClick={()=> setShowModal(false)}>Close</button>
                      </div>
                    </div>                    
                  </div>
              </div>
            </div>
					</Modal>
          { weather === undefined ? <div className={styles.centerAppContainer}></div> : null }
          <div className={`${mobileView ? styles.smallAppContainer : styles.appContainer}`}>
            <SearchBar 
                returnWeather={handleGetWeather}
                returnLocation={handleGetLocation}
              />
            <div className={styles.titleContainer}>
              <div className={styles.appTitle}>Rainy Day Weather</div>
            </div>
              {
                weather !== undefined ?
                  <div className={styles.detailsContainer}>
                    <DailyForecast 
                      mobileView={mobileView}  
                      weatherProp={weather}
                      locationProp={location}     
                    /> 
                    <Highlights mobileView={mobileView} 
                                weatherProp={weather}
                    />
                    <WeeklyForecast weatherProp={weather}/> 
                  </div> : 
                  <div className={styles.logoContainer}>
                    <img className={styles.logo} alt="Umbrella logo of app" src='/images/umbrella_yellow.png'></img>
                  </div>
              }
          </div>
        </div>
      );
    }

}

export default App;