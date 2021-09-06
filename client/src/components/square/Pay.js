import './Pay.css';
//import Navbar from './navbar/Navbar';
import Square from './Square';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import AuthenticationContext from "../../AuthenticationContext";
import { useContext } from "react";



const Pay = () => {
  const authContext = useContext(AuthenticationContext)
    let [communityList, setCommunityList] = useState([]);
    let [community, setCommunity] = useState("");
    let [fee,setFee]=useState();
  const [isLoad, setLoad] = useState(false);


  // const getCommunityList = async () => {
  //   let response= await fetch('/community');
  //   let data = await response.json();
    
  //   setCommunityList(data); 
  // }

  useEffect(() =>{
  const setCommunityFee = async() => {
      
      let response= await fetch(`/api/community/${community}`);
      let data = await response.json();
      setFee(data.membershipFee)
  }
  setCommunityFee()
},[community])

  useEffect(() => {
    let sqPaymentScript = document.createElement("script");
    // sandbox: https://js.squareupsandbox.com/v2/paymentform
    // production: https://js.squareup.com/v2/paymentform
    sqPaymentScript.src = "https://js.squareupsandbox.com/v2/paymentform";
    sqPaymentScript.type = "text/javascript";
    sqPaymentScript.async = false;
    sqPaymentScript.onload = () => {
      setLoad(true);
    };
    document.getElementsByTagName("head")[0].appendChild(sqPaymentScript);
    // getCommunityList();
    getCommunityListForUser();
  },[]);

   const getCommunityListForUser = async () => {
    const communityListResponse = await fetch(`/api/member/communityDetail/${authContext.id}`)
    if (communityListResponse.status===200){
      const communityListForUser = await communityListResponse.json()
      console.log("line55 I'm here ",communityListForUser)
      setCommunityList(communityListForUser) 
    } 

  }

  const squarePayment = isLoad ? (
        <Square paymentForm={ window.SqPaymentForm }
        community={community}
        fee={fee}
         />
    ) : (
       null
    )
  
  return (
    <>
    
      <div >
      <select  name="community" value={community} onChange={(e) => setCommunity(e.target.value)}>
         <option>--Select--</option>
            {communityList?.map(item=> <option key={item.name} value={item._id}>{item.name}</option>)} 
       </select> 
        </div>
      <div className="Pay">
        <p className="text-center">
          Pay For A Membership 
          </p>
       {squarePayment}
        </div>
        
    </>
  );
};

export default Pay;
