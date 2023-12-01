import './App.css';
import { useState, useEffect } from 'react';
import style from './css/Home.css'
import { Link, Route, Routes } from 'react-router-dom';

import Product from './components/ProductList';
// import Edit from './components/Edit';
// import Create from './components/Create';
// import Details from './components/Details';
import Search1 from './components/Search1';
import Home from './components/Home';
import Home1 from './components/Home1';
import Search from './components/Search';
import Ad from './components/Ad';
import Asus from './components/Asus';
import LaptopDetails from './components/LaptopDetails';
import DELL from './components/Dell';
import CartList from './components/CartList';
import './css/Menu.css'

function App() {
  const [avatars, setAvatars] = useState([]);
  const [laptops, setLaptops] = useState([]);
  const [filterLaptops, setFilerLaptops] = useState([])
  const [filterAvatars, setFilerAvatars] = useState([])
  const [value, setValue] = useState('');
  const [asusProduct, setAsusProduct] = useState([]);
  const [dellProduct, setDellProduct] = useState([]);
  const [laptopDetails, setLaptopDetails] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [carts, setCarts] = useState([]);
  
  useEffect(()=>{
    fetch('item.json')
    .then(response=>response.json())
    .then(data=>{
      const productdata1 = data;
      const productdata2 = data;
      setLaptops(data);
      setFilerLaptops(data);  
      setAsusProduct(productdata1.filter(p => p.brand == "Asus").slice(0,25));
      setDellProduct(productdata2.filter(p => p.brand == "DELL").slice(0,25));
    })
    .catch(error=>console.log('error reading json',error));
  },[]);
  useEffect(() => {
    const fetchData = async () => {
      try{
        const dataJson = await fetch('products.json');
        const laptopData = await dataJson.json();
        setLaptops(laptopData);
        setFilerLaptops(laptopData);
      }catch (error){
        console.log('error reading json');
      }
    };
    fetchData();
 
  const fetcData = async () => {
    try{
      const dataJson = await fetch('avatar.json');
      const avatarData = await dataJson.json();
      setAvatars(avatarData);
      setFilerAvatars(avatarData);
    }catch (error){
      console.log('error reading json');
    }
  };
  fetcData();
}, []);
  const handleSearch = (value) => {
    setValue(value);
    const filterLaptops = laptops.filter(d => d.name.toLowerCase().includes(value.toLowerCase()));
    setFilerLaptops(filterLaptops);
  }
  const handleSearch1 = (value) => {
    setValue(value);
    const filterAvatars = avatars.filter(p => p.name.toLowerCase().includes(value.toLowerCase()));
    setFilerAvatars(filterAvatars);
  }

  const handleAdd = (newLaptop) => {
    setLaptops([...laptops,newLaptop]);
    setFilerLaptops([...laptops,newLaptop]);
  }

  const handleDelete = (id) => {
    const deleted = filterLaptops.filter(laptop => laptop.id != id);
    
    setFilerLaptops(deleted);
  }

  // const handleEdit = (newLaptop) => {
  //   console.log(newLaptop);
  //   const index = laptops.findIndex((d) => d.id == newLaptop.id);
  //   if(!newLaptop.name){
  //     alert("Name is required");
  //   }else{
  //     laptops[index] = newLaptop;
  //   }
  // }

  // const handleSearch = (value) => {
  //   setValue(value);
  //   const filterLaptops = laptops.filter(d => d.name.includes(value))
  //   setFilerLaptops(filterLaptops);
  // }

  const getDetails = (pro) => {
    setLaptopDetails(pro);
  }
  const handleSort = () => {
    const sortedProduct =[...filterLaptops].sort((a,b) => a.name.localeCompare(b.name));
    setFilerLaptops(sortedProduct);
  }
  const handleSortByPrice = () => {
    const sortedProduct = [...filterLaptops].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setFilerLaptops(sortedProduct);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  }
  const addCart = (pro) => {
    setCarts([...carts, pro]);
  }

  const handleDeleteCart = (id) => {
    const DeleteCart = carts.filter(c => c.id !== id);
    setCarts(DeleteCart);
  }
 
  
  
  
  return (
    
    <div className="App">
      <nav>
        <Link  to="/"></Link>
        <Link className="header" to="/home">Home</Link>
        <Link className="header" to="/product">Product</Link>
        <Link className="header" to="/product">About us</Link>
        <Link className="header" to="/product">Contact us</Link>
        <Link className="header" to="/product">Blog</Link>
        <Link to="/cart">Cart</Link>
        <Link to='/test'>test</Link>
        <div className='menu'>
          <button className='menubtn'>Menu</button>
          <div className='menu-content'>
        <Link to="/asus">Asus</Link>
        <Link to='dell'>DELL</Link>
        </div>
        </div>
        {/* <Link to="/create">Add new Laptop</Link> */}
      </nav>
      <Routes>
        <Route path="/home" element={
          <div>
          <Search1 onSearch1={handleSearch1}/>
          <Home avatars={filterAvatars}/>
        </div>
      }/>
      <Route path="/home1" element={
          <div>
          <Search1 onSearch1={handleSearch1}/>
          <Home1 avatars={filterAvatars}/>
        </div>
      }/>
        <Route path="/" element={<Ad/>} />
        <Route path='/details' element={<LaptopDetails laptop={laptopDetails} addCart={addCart}/>}/>
        <Route path="/product" element={
          <div>
          <Search onSearch={handleSearch}/>
          <button onClick={handleSortByPrice}>
        Sort by Price {sortOrder === 'asc' ? '↑' : '↓'}
      </button>
          <button onClick={handleSort}>Sort By Name</button>
        <Product laptops={filterLaptops} addCart={addCart} getDetails={getDetails}/>
        </div>
      }/>
{/*         
        <Route path="/create" element={<Create onAdd={handleAdd}/>}/>
        <Route path="/details/:id" element={<Details/>}/> */}
        {/* <Route path="/edit/:id" element={<Edit onEdit={handleEdit}/>}/> */}
      <Route path='/asus' element={<Asus asusProduct={asusProduct}/>}/>
        <Route path='/dell' element={<DELL dellProduct={dellProduct}/>}/>
        <Route path='/cart' element={<CartList carts={carts} deleteCart={handleDeleteCart}/>}/>
      </Routes>
    </div>
  );
}


export default App;

