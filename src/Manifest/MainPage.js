import { data } from "autoprefixer";
import React from "react";
import Side from "./Major";


export default function MainPage(){
    const [backGroundImg, setBackGround]= React.useState({
        img: "",
        author: ""
    })
    const [themeSettings, setThemeSettings] = React.useState("RED")
    const [time,setTime] = React.useState("")
    const [backGroundType, setBackGroundType] = React.useState("nature")

    function getCurrentTime() {
        const date = new Date()
        const currentTime = date.toLocaleTimeString("en-us", {timeStyle: "short"})
        setTime(currentTime)
    } 
    
    setInterval(getCurrentTime, 1000)
    
    const fetchImage = async ()=>{
        const width = window.innerWidth
        const orientation = width > 600 ? "landscape" : "portrait"
        const res = await fetch(`https://apis.scrimba.com/unsplash/photos/random?orientation=${orientation}&query=${backGroundType}`)
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

    return <div className={`w-screen h-screen flex flex-col justify-center`} style= {{
        "backgroundImage": `url(${backGroundImg.img})`,
         "backgroundRepeat": "no-repeat",
         "backgroundSize": "cover"}
         } >
          <div className="block self-center justify-self-center justify-items-center">
          <h1 className="font-Radio text-5xl text-red-500">{time}</h1>
          </div>

          <Side changeTheme= {{themeSettings, setThemeSettings}}/>
    
        </div>
}