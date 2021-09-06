import React from 'react';
import config from './paymentForm';
import { useContext } from "react";
import AuthenticationContext from "../../AuthenticationContext";
import 'bootstrap/dist/css/bootstrap.css'


const Square = ({ paymentForm,fee,community }) => {
    const authContext = useContext(AuthenticationContext)

    let memberData=undefined
    let communityDetailIdx=undefined
    let isMemberOfCommunity=false
    let paymentSuccessfull=false
    

    
    console.log("10 authContext.username: ", authContext.username)
    console.log("11 authContext.id: ", authContext.id)
    console.log("12 community: ",community)
    console.log("13 mamber",authContext.memberData)
    config.callbacks={
        /*
        * callback function: cardNonceResponseReceived
        * Triggered when: SqPaymentForm completes a card nonce request
        */
  
        cardNonceResponseReceived: function (errors, nonce, cardData)
         {console.log("line30 check")
        if (errors) {
            // Log errors from nonce generation to the browser developer console.
            console.error('Encountered errors');
            errors.forEach(function (error) {
            console.error('  ' + error.message);
            
            }
            );
            
          return;
        }
        
        // alert('Invalid Selection Wrong Community');


        const getMember = async (id) => {
          
          try{
              let response= await fetch(`/api/member/username/${authContext.id}`); 
              

              if(response.ok){
                  let data = await response.json();
                  memberData=data
                  
                  console.log("40 data: ", data)
                  console.log("41 data: ", data.communityDetail[0])
                  console.log("42 data: ", data.communityDetail[0]._id)
                  console.log("43 data: ", data.communityDetail[0].community)
                  console.log("44 data: ", data.communityDetail[0].membershipPaidDate)
              }           
          }
          
          catch(error) {
            console.log('this happened');
            
              // console.log("45 error ",error.message)
          } 
          
          console.log("60 data ",memberData)
          if (memberData){
            for (let i=0; i< memberData.communityDetail.length; i++) {
              console.log(" 62 " ,i,memberData.communityDetail[i].community._id, community)
              if (memberData.communityDetail[i].community._id === community) {
                communityDetailIdx=i
                isMemberOfCommunity=true
                break;
              }        
            }
          }
        if (isMemberOfCommunity){

          try{
            // let response = await fetch('http://localhost:3000/process-payment', {
            let response = await fetch('/api/square/process-payment', {              
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                nonce: nonce,
                fee:fee
              })
            })
            

            if(response.ok){
              let data2 = await response.json();
              paymentSuccessfull=true
              console.log("68 data: ", data2)
            }           

          }
          catch{
            console.log("73 square error")
          }
          console.log("86 paymentSuccessfull",paymentSuccessfull)
          
          if (paymentSuccessfull){

          try{  console.log("76 our data: ",memberData)

            let currentDate = new Date();
            let firstName = memberData.firstName
            let lastName = memberData.lastName
            let address1 =  memberData.address1
            let address2 =memberData.address2
            let city = memberData.city
            let province = memberData.province
            let postalCode = memberData.postalCode
            let contactNumber = memberData.contactNumber
            let emailAddress =  memberData.emailAddress
            let communityDetail = memberData.communityDetail
            let username = memberData.username
            let active = memberData.active
            let dateAdded = memberData.dateAdded
            

            memberData.communityDetail[communityDetailIdx].membershipPaidDate = currentDate;
            
            

            console.log ("107 base communityDetail",communityDetail) 
            //membershipPaidDate

            let memberToUpdate = {
              firstName, 
              lastName, 
              address1,
              address2,
              city,
              province,
              postalCode,
              contactNumber,
              emailAddress,
              communityDetail,
              username,
              active,
              dateAdded,
              lastUpdateDate : currentDate
            }
    
            console.log("98 memberToUpdate: ",memberToUpdate)
            let updateResponse = await fetch(`/api/member/${memberData._id}`, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(memberToUpdate)
            })
            if(updateResponse.ok){
              let data = await updateResponse.json();
              paymentSuccessfull=true
              console.log("86 update data: ",data);

              alert('Payment Successful');
            }           
          }
          
          catch(error){
            console.log("82 our update failed, error: ",error)
          }
        }
      }
    

        }
        getMember();
        }
      }
console.log(config.applicationId)
    paymentForm = new paymentForm(config);
    paymentForm.build();
    const requestCardNonce = () =>{
        paymentForm.requestCardNonce();
    }

    return (
      <div id="form-container">
          <div id="sq-card-number"></div>
          <div className="third" id="sq-expiration-date"></div>
          <div className="third" id="sq-cvv"></div>
          <div className="third" id="sq-postal-code"></div>
          <button id="sq-creditcard" className="button-credit-card" onClick={requestCardNonce}> Pay ${fee} </button>
      </div>
    )
}

export default Square;