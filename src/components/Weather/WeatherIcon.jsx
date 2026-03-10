import icon from '../../media/icons/weathers.png'
export default function WeatherIcon ({iconId}) {
    const source = (iconId) ? `https://openweathermap.org/payload/api/media/file/${iconId}.png` : icon;
    const content = <img style={{width: 300,height:300}} src={source} alt="Icon"></img>
    if (source) {
          return <div style={{paddingLeft: "5em"}}>{content}</div>
    }
    return <div></div>
}
