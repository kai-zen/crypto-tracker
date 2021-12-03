import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './app.css';
import Coin from './Coin';


function App() {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');

    const handleSearchInputChange = e => {
        setSearch(e.target.value);
    }

    const filteredCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()));

    useEffect(()=>{
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false')
        .then(res=>{
            setCoins(res.data);
            console.log(res.data);
        })
        .catch(error => console.log(error))
    }, [])

    return ( 
        <div className = "coin-app">
            <div className="coin-search">
                <h1 className="coin-text">Search a currency</h1>
                <form action="">
                    <input type="text" className="coin-input" placeholder="Search..." onChange={e => handleSearchInputChange(e)}/>
                </form>
            </div>
            {filteredCoins.map(coin => {
                return (
                   <Coin
                   key={coin.id} name={coin.name} image={coin.image} price={coin.current_price} symbol={coin.symbol} volume={coin.total_volume} priceChange={coin.price_change_percentage_24h} marketcap={coin.market_cap}
                   />
                )
            })}
        </div>
    );
}

export default App;