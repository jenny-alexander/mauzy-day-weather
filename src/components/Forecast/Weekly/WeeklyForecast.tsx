import styles from './WeeklyForecast.module.scss';
import { IWeatherResponseDTO } from '../../../api/weather/weatherApi';

const dayNames: string[] = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
];

let week: string[] = [];

let today:Date = new Date();
for(let i= 1; i < 8; i++) {
    let thisDay:Date = new Date(today);
    thisDay.setDate(today.getDate() + i);    
    week.push(dayNames[thisDay.getDay()]);
}

type WeeklyForecastProps = {
    mobileView: boolean;
    weather: IWeatherResponseDTO;
}

const WeeklyForecast = ({mobileView, weather}: WeeklyForecastProps): JSX.Element => {
    return (
        <div className={styles.weekly}> 
            <div className={styles.weeklyTitle}>Weekly Forecast</div>
            <div className={styles.weeklyForecast}>
                {week.map((weekDay, index: number) => {
                    return (
                        <div className={styles.dayForecast} key={weekDay + '-' + index}>
                            <div className={styles.dayOfWeek}>{weekDay}</div>
                            <div className={styles.imageContainer}>                         
                                <img className={styles.image} src="/images/008-rain.png"/>
                                <div className={styles.rainPrecip}>30% rain</div>
                            </div>
                            <div className={styles.highLowContainer}>
                                <div className={styles.highTemp}>40°</div>
                                <div>/</div>
                                <div className={styles.lowTemp}>32°</div>
                            </div>
                        </div>)
                })}
            </div>
        </div>
    )
}

export default WeeklyForecast;