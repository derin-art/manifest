import React from "react";

import setttingsImg from "./svg/icons8-settings-50 (1).png"
import locaImg from "./svg/icons8-location-50.png"

/*   document.getElementById("weather").innerHTML = `
                        <img src=${iconUrl} />
                        <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                        <p class="weather-city">${data.name}</p>
                    ` */


export default function Major(props){
    const [selectedCoin, setSelectedCoin] = React.useState(JSON.parse(localStorage.getItem("crypto")) || "bitcoin")
    const [mouseDiv, setmouseDiv] = React.useState("")
    const [weatherLocation, setweatherLocation] = React.useState({
        location: "", weatherIcon: "", temperature: ""
    })
    const [mouseOverSettings, setMouseSettings] = React.useState(false)
    const [mouseOver, setmouseOver] = React.useState(false)
    const [divOver, setDivOver] = React.useState(false)
    const [currencyInfo, setCurrencyInfo] = React.useState({
        current: "",
        low: "",
        high: "",
        icon: "",
        name: "",
    })
 
    const {themeSettings, setThemeSettings} = props.changeTheme
    const setThemeFont = (e)=>{
        const key = e.target.name
        setThemeSettings(prev => ({...prev, "font": e.target.value}))
        e.target.checked = true
    }

    const setThemeBackGround = (e)=>{
        setThemeSettings(prev => ({...prev, "backGroundTheme":e.target.value }))
        e.target.selected = true
    }

    const setCrypto = (e)=>{
        setSelectedCoin(e.target.value)
       localStorage.setItem("crypto", JSON.stringify(e.target.value))
        
    }

    const getCoinInfo = async ()=>{
        const data = await fetch(`https://api.coingecko.com/api/v3/coins/${selectedCoin}`)
        const res = await data.json()
        console.log(res)
        setCurrencyInfo(prev => ({
            current: `$${res.market_data.current_price.usd}`,
            high:  `$${res.market_data.high_24h.usd}`,
            low: `$${res.market_data.low_24h.usd}`,
            icon: res.image.small,
            name: res.name

        }))
    }
    React.useEffect(()=>{
        getCoinInfo()
    }, [selectedCoin])

    const getWeatherLocation = ()=>{
        navigator.geolocation.getCurrentPosition(position => {
            fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
                .then(res => {
                    if (!res.ok) {
                        throw Error("Weather data not available")
                    }
                    return res.json()
                })
                .then(data => {
                    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                    setweatherLocation(prev => ({weatherIcon: iconUrl, temperature: data.main.temp, location: data.name  }))
                })
                .catch(err => console.error(err))
        })
    }

    React.useEffect(()=>{
        getCoinInfo()
        getWeatherLocation()
    }, [])

    const handleMouseOver = (e)=>{
        if(e.target.name === "location"){
           setmouseDiv(
            <div className="flex flex-col  transition ease-in-out duration-350 delay-100 
            animate-fadeIn text-xs font-Poppins font-bold">
            <div className="flex">
                <div className="w-6"><img src={currencyInfo.icon}></img></div>
                {
                 ` ${currencyInfo.name} current ${currencyInfo.current} high ${currencyInfo.high} low ${currencyInfo.low}`
                }
            </div>

            <div className="flex">
                <div className="w-6">
                <img src={weatherLocation.weatherIcon}></img>
                </div>
                {weatherLocation.location} <div className="ml-4">{weatherLocation.temperature}</div>
            </div>
        </div>
           )
           setmouseOver(true)
        }
        else{
            return
        }

    }
   
    
    return <div className="flex flex-col">
        <div className="flex p-2 p-4">
        <div className="w-7 flex flex-col">
            <button name="location"  onMouseOut={()=>{setmouseOver(false)}}  onMouseOver={(e)=>{handleMouseOver(e)}}>
                <img name= "location" src={locaImg}></img>
            </button>
        </div>
        <div className="w-7 ml-4 flex flex-col hover:border-red-200 hover:border border-rounded" onClick={()=>{setDivOver(prev => !prev)}} onMouseOut={()=>{setMouseSettings(false)}} onMouseOver={()=>{setMouseSettings(true)}}>
            <button name="settings">
               <img name="settings" src={setttingsImg}></img>
            </button>
        </div>
    </div>
   {mouseOver ?  <div className="bg-red-200 w-48 h-32" >
        {mouseDiv}
    </div>: null}
    {mouseOverSettings || divOver ? <div className="bg-red-200 p-4 animate-fadeIn text-xs font-Poppins font-bold">
        <form>
            Font-Type:
            <label className="ml-3">
                <input type="radio" name="font" value="Radio"  onClick={(e)=>{setThemeFont(e)}}></input>
                Radio
            </label>
    
            <label className="ml-2">
              <input type="radio" name="font" value="DigitalAlt" onClick={(e)=>{setThemeFont(e)}}></input>
             Alt
            </label>
            <label className="ml-2">
                 <input type="radio" name="font" value="Digital" onClick={(e)=>{setThemeFont(e)}}></input>
                 Digital
            </label>
            <label className="ml-2">
              <input type="radio" name="font" value="SegmentLED" onClick={(e)=>{setThemeFont(e)}}></input>
              LED 
            </label>
            <label className="ml-2">
            <input type="radio" name="font" value="Poppins" onClick={(e)=>{setThemeFont(e)}}></input>
            Poppins
            </label>
        </form>
            <form className="mt-2">
                <label>crypto-data:
                    <select name="crypto" className="ml-2" defaultValue={JSON.parse(localStorage.getItem("crypto"))} >
                        <option name="crypto" value= "bitcoin"    onClick={(e)=>{setCrypto(e)}}>bitcoin</option>
                        <option name="crypto" value="dogecoin"  onClick={(e)=>{setCrypto(e)}}>dogecoin</option>
                        <option name="crypto" value="ethereum"  onClick={(e)=>{setCrypto(e)}}>ethereum</option>
                        <option name="crypto" value="apecoin"  onClick={(e)=>{setCrypto(e)}}>apecoin</option>
                        <option name="crypto" value="tezos"  onClick={(e)=>{setCrypto(e)}}>tezos</option>
                        <option name="crypto" value="filecoin" onClick={(e)=>{setCrypto(e)}}>filecoin</option>

                    </select>
                </label>
            </form>

            <form className="mt-2">
                <label>background Image:
                    <select name="backGroundTheme" className="ml-2" defaultValue={JSON.parse(localStorage.getItem("backgroundTheme"))}>
                        <option value= "snow" name="backGroundTheme" onClick={(e)=>{setThemeBackGround(e)}}  >snow</option>
                        <option value="nature" name="backGroundTheme" onClick={(e)=>{setThemeBackGround(e)}} >nature</option>
                        <option value="sand" name="backGroundTheme"  onClick={(e)=>{setThemeBackGround(e)}}>sand</option>
                    </select>
                </label>
            </form>
            
      

    </div> : null}
    </div>
}