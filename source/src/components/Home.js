
import CarouselHome from "./Carousel";
import Images from "./Fourboxhome";
import { Link } from "react-router-dom";
import BrandLogos from "./BrandLogo";

import Item from "./Item";
import '../css/Home.css'
function Home({avatarLaptopsAsus,avatarLaptopsGigabyte,avatarLaptopsHP,avatarLaptopsLenovo,avatarLaptopsMSI,addCart,getDetails}){
    return(
        <>
     <CarouselHome/>
      <Images/>
      <Link to="/product"><div className="showproduct">Show all Products</div></Link>
      <BrandLogos/>

      <div className="Brandhome">Some Special Laptop</div>
      
           
            <div className="containerlaptophome">
               {
                    avatarLaptopsAsus.slice(1,2).map(a => (
                        <div className="boxlaptophome"><Item key={a.id} addCart={addCart} laptop={a} getDetails={getDetails}/></div>
                    )) 
                }
                 {
                    avatarLaptopsLenovo.slice(1,2).map(a => (
                        <div className="boxlaptophome"><Item key={a.id} addCart={addCart} laptop={a} getDetails={getDetails}/></div>
                    )) 
                }
                 {
                    avatarLaptopsGigabyte.slice(1,2).map(a => (
                        <div className="boxlaptophome"><Item key={a.id} addCart={addCart} laptop={a} getDetails={getDetails}/></div>
                    )) 
                }
                 {
                    avatarLaptopsMSI.slice(1,2).map(a => (
                        <div className="boxlaptophome"><Item key={a.id} addCart={addCart} laptop={a} getDetails={getDetails}/></div>
                    )) 
                }
                 {
                    avatarLaptopsHP.slice(2,3).map(a => (
                        <div className="boxlaptophome"><Item key={a.id} addCart={addCart} laptop={a} getDetails={getDetails}/></div>
                    )) 
                }
                 {
                    avatarLaptopsHP.slice(3,4).map(a => (
                        <div className="boxlaptophome"><Item key={a.id} addCart={addCart} laptop={a} getDetails={getDetails}/></div>
                    )) 
                }
                </div>
            
                
                    
    </>
    )
}export default Home;