import React from "react";


export default function Major(){
    const [selectedCoin, setSelectedCoin] = React.useState("bitcoin")

    const [currencyInfo, setCurrencyInfo] = React.useState({
        current: "",
        low: "",
        high: "",
        icon: "",
        name: "",
    })

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
    }, [])

    console.log(currencyInfo)
    return <div>
        

    </div>
}