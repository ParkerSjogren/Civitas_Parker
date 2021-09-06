const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')
const userLevel = require('../models/userLevel');  
const member = require('../models/member');
const community = require('../models/community');


async function test(_id){
    User.findById(_id, async function(err, user) {

        let newNavbarAccess=false
        // let newCommunityDetail=[]

        if(user.username){
            console.log("user.username: ",user.username)

            let memberRecord = await member.findOne({username: _id}).populate("communityDetail.community", {name:1}).populate("communityDetail.userLevel", {name:1, level:1}).populate("username", {username:1});
            
            // console.log("data, _id : ",data,_id)

            if(memberRecord){
                // newCommunityDetail=[...memberRecord.communityDetail]

                for(j=0;j<memberRecord.communityDetail.length;j++){                    
                    // console.log("communityDetail: ",data.communityDetail[j])
                    if (memberRecord.communityDetail[j].userLevel.level=1) newNavbarAccess=true
                }
                // done(err, {
                //     _id: _id,
                //     username: user.username,
                //     navbarAccess : newNavbarAccess,                 
                //     member: memberRecord                  
                // })   
                
                let stupid = {
                    _id: _id,
                    username: user.username,
                    navbarAccess : newNavbarAccess,                 
                    member: memberRecord
                } 
                console.log("stupid: ", stupid)  
                console.log("stupid.navbarAccess: ", stupid.navbarAccess)  
                console.log("stupid.member.emailAddress: ", stupid.member.emailAddress)      
                console.log("stupid.member.communityDetail[0].community.name: ", stupid.member.communityDetail[0].community.name)  
                console.log("stupid.member.communityDetail[0].userLevel.name: ", stupid.member.communityDetail[0].userLevel.name)  
                console.log("stupid.member.communityDetail[0].userLevel.level: ", stupid.member.communityDetail[0].userLevel.level)  
                console.log("stupid.member.communityDetail[0].active: ", stupid.member.communityDetail[0].active)  
                console.log("stupid.member.emailAddress: ", stupid.member.emailAddress)      
            }
        }
      }
    )
}

// async function test(_id){
//     User.findById(_id, async function(err, user) {

//         let newNavbarAccess=false
//         let newCommunityDetail=[]

//         if(user.username){
//             console.log("user.username: ",user.username)

//             let data = await member.find({username: {"$eq": _id}}).populate("communityDetail.community", {name:1}).populate("communityDetail.userLevel", {name:1, level:1}).populate("username", {username:1});
            
//             console.log("data, _id : ",data,_id)

//             // should only ever be 1 member record due unique index on username in member collectiom and the member.js model
//             if(data.length>1){
//                 console.log("deserializeUser in configurePassport, user: ",user.username," retrieved more than 1 member record.")
//             }
//             else{
//                 // I know there can be only 1. Parker July 25, 2021
//                 for(i=0;i<data.length;i++) {

//                     newCommunityDetail=[...data[i].communityDetail]
    
//                     for(j=0;j<data[i].communityDetail.length;j++){
                        
//                         console.log("communityDetail: ",data[i].communityDetail[j])
//                         if (data[i].communityDetail[j].userLevel.level=1) newNavbarAccess=true
//                     }
//                 }
//                 // done(err, {
//                 //     _id: _id,
//                 //     username: user.username,
//                 //     communityDetail: newCommunityDetail,
//                 //     navbarAccess : newNavbarAccess
                  
//                 // })   
                
//                 let stupid = {
//                     _id: _id,
//                     username: user.username,
//                     communityDetail:  newCommunityDetail,
//                     navbarAccess : newNavbarAccess                  
//                 } 
//                 console.log("stupid: ", stupid)  
//                 console.log("stupid.communityDetail[0].community.name: ", stupid.communityDetail[0].community.name)  
//                 console.log("stupid.communityDetail[0].userLevel.name: ", stupid.communityDetail[0].userLevel.name)  
//                 console.log("stupid.communityDetail[0].userLevel.level: ", stupid.communityDetail[0].userLevel.level)  
//                 console.log("stupid.communityDetail[0].active: ", stupid.communityDetail[0].active)  
    
    
//             }
//         }
//       }
//     )
// }

test('60e73016186f7d4530029dfc')




// async function test(_id){
//     console.log("one")
//     member.find({username: {"$eq": _id}}).populate("communityDetail.community", {name:1}).populate("communityDetail.userLevel", {name:1, level:1}).populate("username", {username:1}, 
//                 function(err, member) {
//         console.log("two")
//         if(member.username){
//             console.log("member.username: ",member.username)
            
//             console.log("member : ",member)

//             for(i=0;i<member.length;i++) {
//                 communityName=[]

//                 for(j=0;j<member[i].communityDetail.length;j++){
                    
//                     console.log("communityDetail: ",member[i].communityDetail[j])
//                 }
//             }     
//         }
//       }
//     )
// }

// test('60e73016186f7d4530029dfc')


// passport.deserializeUser(function(_id, done) {
//     User.findById(_id, function(err, user) {
//         // console.log('31 deserialer user: ', user)
//         if (user.username){
//         done(err, {
//             _id: _id,
//             username: user.username,
//             userLevel: user.userLevel
          
//         });}
        
//     });

// const cron = require('node-cron');
// const nodemailer = require("nodemailer");
// const member = require('../models/member');
// const community = require('../models/community');
// const user = require('../models/user');
// const userLevel = require('../models/userLevel');

// async function email(p1, p2, p3){
//     let to = p1;
//     let subject = p2;
//     let body = p3;

//     let newemail = { to, subject, body  };

//     let transporter = nodemailer.createTransport({
//         service:'gmail',
//         auth:{
//             user:'civitas.c6@gmail.com',
//             pass:'C6password'
//             // user:'cheapos123tpf@gmail.com',
//             // pass:'123tpf123'
//         }
//     })

//     let mailOptions = {
//         from: 'cheapos123tpf@gmail.com',
//         to: to,
//         subject: subject,
//         text: body
//     }

//     transporter.sendMail(mailOptions, (err, data)=>{
//         if(err){
//             console.log("Error:", err)
//         }else{
//             console.log("Email sent successfully")
//             return res.json({ status: "Email sent", email: newemail });
//         }
//     })
// }

// async function main(){

//     let today = new Date();
//     let todayPlus30 = new Date()
//     let todayMinus30 = new Date()
//     let communityName = []
//     let subject=""

//     todayPlus30.setDate(today.getDate()+30).toString()
//     todayMinus30.setDate(today.getDate()-30).toString()

//     let data = await member.find({communityDetail:{$elemMatch:{renewalDate: {"$gt": todayMinus30}, renewalDate:{"$lt": todayPlus30}}}}).populate("communityDetail.community", {name:1}).populate("communityDetail.userLevel", {name:1}).populate("username", {username:1});

//     for(i=0;i<data.length;i++) {
//         communityName=[]
//         subject-""

//         for(j=0;j<data[i].communityDetail.length;j++){
            
//             if (data[i].communityDetail[j].renewalDate > todayMinus30 && data[i].communityDetail[j].renewalDate <  todayPlus30 ){
//                 communityName.push(data[i].communityDetail[j].community.name)
//             }
//         }

//         subject='Your membership is expiring for: '+ communityName.pop()

//         while(communityName.length) {
//             if (communityName.length > 1){
//                 subject = subject + ', '+ communityName.pop()}
//             else{
//                 subject = subject + ' and ' + communityName.pop()
//             }
//         }

//         subject = subject + '.'
          
//         if (i===0) email(data[i].emailAddress,'Membership Expiry Notice',subject) 
//     }
//     return null
// }

// // https://www.npmjs.com/package/node-cron

// //  # ┌────────────── second (optional)
// //  # │ ┌──────────── minute
// //  # │ │ ┌────────── hour
// //  # │ │ │ ┌──────── day of month
// //  # │ │ │ │ ┌────── month
// //  # │ │ │ │ │ ┌──── day of week
// //  # │ │ │ │ │ │
// //  # │ │ │ │ │ │
// //  # * * * * * *

// // Allowed values
// // field	value
// // second	0-59
// // minute	0-59
// // hour	0-23
// // day of month	1-31
// // month	1-12 (or names)
// // day of week	0-7 (or names, 0 or 7 are sunday)

// cron.schedule('0 14 1 * *',  () => {main().catch(console.error)})
// // cron.schedule('* * * * *', () => {main().catch(console.error)})