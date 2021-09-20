import React,{useEffect,useState} from 'react'
import axios from 'axios'

export default function Dashboard() {
    var [data,setData] = useState([]);
    var [filteredData,setFilteredData] = useState([]);
    var [nameSort,setnameSort] = useState('asc');
    var [priceSort,setpriceSort] = useState('asc');
    var [marketcapSort,setmarketcapSort] = useState('asc');

    useEffect(()=>{
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=100&page=1&sparkline=false',{headers: {"Access-Control-Allow-Origin": "*"}})
        .then(result=>setData(result.data))
    },[data])
     
    useEffect(()=>{
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=100&page=1&sparkline=false',{headers: {"Access-Control-Allow-Origin": "*"}})
        .then(result=>setFilteredData(result.data))
    },[])

    //Method to handle filter by search
    const handleChange = (event) => {
        let text = event.target.value;
        let filteredResults = data;
        filteredResults = data.filter((data) => {
            return data.name.toLowerCase().indexOf(text.toLowerCase()) !== -1;
        });
        setFilteredData(filteredResults);
      };


    //Method to sort by name
    const sortbyName = ()=>{  
        let result=[];
        if(nameSort==='desc'){
        setnameSort('asc')
        result= filteredData.sort((a,b)=>(a.name<b.name? 1:-1));
        }else{
            setnameSort('desc');
            result= filteredData.sort((a,b)=>(a.name>b.name? 1:-1));
        }
        setFilteredData(result);
    }

    //Method to sort by price 
    const sortbyPrice = ()=>{
        let result=[]
        if(priceSort==='desc')
        {
            setpriceSort('asc');
            result= filteredData.sort((a,b)=>(a.current_price<b.current_price? 1:-1));
        }else{
            setpriceSort('desc');
            result= filteredData.sort((a,b)=>(a.current_price>b.current_price? 1:-1));
        }
        setFilteredData(result);
    }

    //Method to sort by market cap
    const sortbyMarketCap=()=>{
        let result=[];
        if(marketcapSort==='desc')
        {
            setmarketcapSort('asc');
            result= filteredData.sort((a,b)=>(a.market_cap<b.market_cap? 1:-1));
        }else{
            setmarketcapSort('desc');
            result= filteredData.sort((a,b)=>(a.market_cap>b.market_cap? 1:-1));
        }
        setFilteredData(result);

    }

    return (
        <div>
            <div>
            <label >Search by Name : </label>
            <input placeholder="Search" onChange={(event)=>handleChange(event)}></input>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name<button className="btn btn-default btn-sm"onClick={()=>sortbyName()}>Sort</button></th>
                        <th>Price <button className="btn btn-default btn-sm" onClick={()=>sortbyPrice()}>Sort</button></th>
                        <th>Market Cap <button className="btn btn-default btn-sm" onClick={()=>sortbyMarketCap()}>Sort</button></th>
                    </tr>
                </thead>
                <tbody>
                    {
                   filteredData.map((item,id)=>(
                    <tr key={id}>
                       <td>{id+1}</td>
                       <td>{item.name}</td>   
                       <td>{`$`+item.current_price}</td>    
                       <td>{item.market_cap}</td>     
                    </tr>
                   ))
                }
                </tbody>
            </table>
        </div>
    )
}
