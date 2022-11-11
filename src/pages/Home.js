import React, {useEffect, useState} from "react"
import Carousel from "../componants/Carousel"
import styled from "styled-components";
import {data} from '../FoodData';
import "../css/home.css"
import { Button } from "react-bootstrap";
import {
    signOut,onAuthStateChanged
  } from "firebase/auth";
import {auth} from "../componants/firebase"
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();
    const [filteredData, setFilterdData] = useState(data);
    const [user, setUser] = useState(null);
    const searchFood = (e) => {
        const value = e.target.value.toLowerCase();
        if(value){
            const filter = filteredData.filter(obj => obj.dishName.toLowerCase().includes(value));
            setFilterdData(filter);
        }else{
            setFilterdData(data)
        }
    }
    const onLogout=async()=>{
        console.log("dfd",auth)
        try {
            await signOut(auth);
            navigate("/");
          } catch (error) {
            console.log(error.message);
          }
       
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
          console.log("Auth", currentuser);
          setUser(currentuser)
          if(!currentuser){
            navigate("/")
        }
        });
        return () => {
          unsubscribe();
        };
      }, []);
    return(
        <>
        {user&&
        (<div className="main-layout">
           <div className="navbar">
                  <h1 className="logo">BISTRO FOOD</h1>
                  <div  className=" btn-wrap">
                  <Button variant="danger"  onClick={onLogout}>Logout</Button>
                  </div>
            </div>

           

            <div className="container-fluid">
               <div className="row">
                    <div className="col-md-2 col-1 text-center" >
                        <ul className="nav-responsive">
                            <li><a href="#">About</a></li>
                            <li><a href="#">Services</a></li>
                            <li><a href="#">Courses</a></li>
                            <li><a href="#">Gallary</a></li>
                            <li><a href="#">Contact</a></li>
                            <li><a href="#">Book</a></li>
                            <li className="active"><a href="#">Cart</a></li>
                        </ul>
                    </div>




                    <div className="col-10">
                        <div className="row">
                            <div className="col-md-8 col-sm-12 text-center">
                                <h2 className="main-content">What Are You Having <br/> for Lunch ?</h2>
                            </div>
                            <div className="col-md-4 col-sm-12">
                                <p className="sub-content"> What is Lorem Ipsum?
                                     Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                  </p>
                            </div>
                        </div>

                              {/* food cards                */}
    
                <div> <input type="text" onInput={searchFood} className="search-box" placeholder="search Foods"/></div>
                      
                        <div className="row">
                            <div className="col-12 text-center">

                                <div className="food-cards">
                                    <h3>Food Cards</h3>
                                </div>

                              

                               


     <div>
     <Carousel show={4}>
            {filteredData.map((item, index) => (
              <Wrapper key={index}>
                <div className="food_cardContainer">
                  <div key={item.id}>                
                  </div>
                  <img
                    className="food__img"
                    src={item.imageUrl}
                    alt={index}
                    width="200px"
                    height="200px"
                  />
                 
                    <h4>
                      <span>
                      <p>{item.dishName}</p>
                      </span>                  
                    </h4>                  
            
                </div>
              </Wrapper>
            ))}
          </Carousel>
      </div>

                                  
                                </div>
                            </div>

                         </div>
                    </div> 
                   
                </div>        

          </div>
          )}
        </>

    )

}

export default Home;

const Wrapper = styled.div`
  height: 50vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px;
`;