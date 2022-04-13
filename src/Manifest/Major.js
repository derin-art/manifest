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
            <div className="flex flex-col transition ease-in-out duration-350 delay-100 
            animate-fadeIn text-xs mt-4 font-Poppins font-bold text-gray-600">
            <div className="flex flex-col justify-center items-center ">
                <div className="w-10 flex text-center"><img src={currencyInfo.icon}></img></div>
                <div className="text-md text-black">    {
                 ` ${currencyInfo.name}`
                }</div>
                <div className="self-start ml-2 text-xs">
                <div>current : <span className="ml-2">{currencyInfo.current}</span></div>
                <div> high : <span className="ml-7">{currencyInfo.high}</span></div>
                <div>low : <span className="ml-8">{currencyInfo.low}</span></div>
                </div>
            </div>

            <div className="flex">
                <div className="w-6">
                <img src={weatherLocation.weatherIcon}></img>
                </div>
                {weatherLocation.location} <div className="ml-4">{weatherLocation.temperature} F</div>
            </div>
            <div className="ml-2 text-xs">
               <span className="text-red-400">Photo By</span> {props.info}
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
   {mouseOver ?  <div className="bg-gray-200 w-48 h-48 opacity-75 rounded" >
        {mouseDiv}
    </div>: null}
    {mouseOverSettings || divOver ? <div className=" accent-red-500 bg-gray-200 opacity-75 p-4 animate-fadeIn text-xs font-Poppins font-bold">
        <form defaultValue={JSON.parse(localStorage.getItem("font"))}>
            Font-Type:
            <label className="ml-3 text-gray-700">
                <input className="mr-2 " type="radio" defaultChecked={themeSettings.font === "Radio"} name="font" value="Radio"  onClick={(e)=>{setThemeFont(e)}}></input>
                Radio
            </label>
    
            <label className="ml-2 text-gray-700">
              <input className="mr-2" type="radio" defaultChecked={themeSettings.font === "DigitalAlt"} name="font" value="DigitalAlt" onClick={(e)=>{setThemeFont(e)}}></input>
             Alt
            </label>
            <label className="ml-2 text-gray-700">
                 <input className="mr-2" type="radio" defaultChecked={themeSettings.font === "Digital"} name="font" value="Digital" onClick={(e)=>{setThemeFont(e)}}></input>
                 Digital
            </label>
            <label className="ml-2 text-gray-700">
              <input className="mr-2" type="radio" defaultChecked={themeSettings.font === "SegmentLED"} name="font" value="SegmentLED" onClick={(e)=>{setThemeFont(e)}}></input>
              LED 
            </label>
            <label className="ml-2 text-gray-700">
            <input className="mr-2" type="radio" defaultChecked={themeSettings.font === "Poppins"} name="font" value="Poppins" onClick={(e)=>{setThemeFont(e)}}></input>
            Poppins
            </label>
        </form>
            <form className="mt-2">
                <label>crypto-data:
                    <select name="crypto" className="ml-2 text-gray-800" defaultValue={JSON.parse(localStorage.getItem("crypto"))} >
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
                    <select name="backGroundTheme" className="ml-2 text-gray-800" defaultValue={JSON.parse(localStorage.getItem("backgroundTheme"))}>
                        <option value= "snow" name="backGroundTheme" onClick={(e)=>{setThemeBackGround(e)}}  >snow</option>
                        <option value="nature" name="backGroundTheme" onClick={(e)=>{setThemeBackGround(e)}} >nature</option>
                        <option value="sand" name="backGroundTheme"  onClick={(e)=>{setThemeBackGround(e)}}>sand</option>
                    </select>
                </label>
            </form>
            <div>click to pin</div>
      

    </div> : null}
    </div>
}