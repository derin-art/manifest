import { data } from "autoprefixer";
import React from "react";
import Side from "./Major";
import pcwallpaper from "./img/pcwallpaper.jpg"
import mobilewallpaper from "./img/mobilewallpaper.jpg"


export default function MainPage(){
    const [backGroundImg, setBackGround]= React.useState({
        img: "",
        author: "",
        
    })
    /* Radio : ["RadioLand", "san-serif"],
        Digital : ["Digital", "san-serif"],
        DigitalAlt : ["DigitalAlt", "san-serif"], 
        SegmentLED: ["SegmentLED", "san-serif"],
        Poppins: ["Poppins", "san-serif"],
        Oswald */
     const localStorageImg = JSON.parse(localStorage.getItem("backgroundTheme")) || "snow" 
     const localStorageFont = JSON.parse(localStorage.getItem("font")) || "Radio" 
    const [themeSettings, setThemeSettings] = React.useState({
        font: "Digital", backGroundTheme: localStorageImg , crypto: ""
    })
     localStorage.setItem("backgroundTheme", JSON.stringify(themeSettings.backGroundTheme)) 
    localStorage.setItem("font", JSON.stringify(themeSettings.font)) 
    const [time,setTime] = React.useState("")
    const [backGroundType, setBackGroundType] = React.useState("snow")

    function getCurrentTime() {
        const date = new Date()
        const currentTime = date.toLocaleTimeString("en-us", {timeStyle: "short"})
        setTime(currentTime)
    } 
    
    setInterval(getCurrentTime, 1000)
    
    const fetchImage = async ()=>{
        const width = window.innerWidth
        const orientation = width > 600 ? "landscape" : "portrait"
        const res = await fetch(`https://apis.scrimba.com/unsplash/photos/random?orientation=${orientation}&query=${JSON.parse(localStorage.getItem("backgroundTheme"))}`)
        const data = await res.json()
        console.log(data)

         setBackGround(prev => ({
            img: data.urls.regular,
            author: data.user.name
        })) 

    }
    React.useEffect(()=>{
        fetchImage()
    }, [])
    console.log(themeSettings.font)

    return <div className={`w-screen h-screen flex flex-col  justify-center`} style= {{
        "backgroundImage": `url(${backGroundImg.img ? backGroundImg.img : pcwallpaper})`,
         "backgroundRepeat": "no-repeat",
         "backgroundSize": "cover"}
         } >
          <div className="self-start justify-self-start text-left border border-red-400 w-screen absolute top-3">
          <Side changeTheme= {{themeSettings, setThemeSettings}} info = {backGroundImg}/>
             
          </div>
          <div className="block self-center justify-self-center justify-items-center">
          <h1 className= {`font-${themeSettings.font} text-5xl text-red-500`}>{time}</h1>
          </div>

        
    
        </div>
}