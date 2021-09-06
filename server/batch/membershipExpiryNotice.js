const cron = require('node-cron');
const nodemailer = require("nodemailer");
const member = require('../models/member');
const community = require('../models/community');
const user = require('../models/user');
const userLevel = require('../models/userLevel');

async function email(p1, p2, p3){
    let to = p1;
    let subject = p2;
    let body = p3;

    let newemail = { to, subject, body  };

    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'civitas.c6@gmail.com',
            pass:'C6password'
            // user:'cheapos123tpf@gmail.com',
            // pass:'123tpf123'
        }
    })

    let mailOptions = {
        from: 'cheapos123tpf@gmail.com',
        to: to,
        subject: subject,
        text: body
    }

    transporter.sendMail(mailOptions, (err, data)=>{
        if(err){
            console.log("Error:", err)
        }else{
            console.log("Email sent successfully")
            return res.json({ status: "Email sent", email: newemail });
        }
    })
}

async function main(){

    let today = new Date();
    let todayPlus30 = new Date()
    let todayMinus30 = new Date()
    let communityName = []
    let subject=""

    todayPlus30.setDate(today.getDate()+30).toString()
    todayMinus30.setDate(today.getDate()-30).toString()

    let data = await member.find({communityDetail:{$elemMatch:{renewalDate: {"$gt": todayMinus30}, renewalDate:{"$lt": todayPlus30}}}}).populate("communityDetail.community", {name:1}).populate("communityDetail.userLevel", {name:1}).populate("username", {username:1});

    for(i=0;i<data.length;i++) {
        communityName=[]
        subject=""

        for(j=0;j<data[i].communityDetail.length;j++){
            
            if (data[i].communityDetail[j].renewalDate > todayMinus30 && data[i].communityDetail[j].renewalDate <  todayPlus30 ){
                communityName.push(data[i].communityDetail[j].community.name)
            }
        }

        subject='Your membership is expiring for: '+ communityName.pop()

        while(communityName.length) {
            if (communityName.length > 1){
                subject = subject + ', '+ communityName.pop()}
            else{
                subject = subject + ' and ' + communityName.pop()
            }
        }

        subject = subject + '.'
          
        if (i===0) email(data[i].emailAddress,'Membership Expiry Notice',subject) 
    }
    return null
}

// https://www.npmjs.com/package/node-cron

//  # ┌────────────── second (optional)
//  # │ ┌──────────── minute
//  # │ │ ┌────────── hour
//  # │ │ │ ┌──────── day of month
//  # │ │ │ │ ┌────── month
//  # │ │ │ │ │ ┌──── day of week
//  # │ │ │ │ │ │
//  # │ │ │ │ │ │
//  # * * * * * *

// Allowed values
// field	value
// second	0-59
// minute	0-59
// hour	0-23
// day of month	1-31
// month	1-12 (or names)
// day of week	0-7 (or names, 0 or 7 are sunday)

// cron.schedule('0 14 1 * *',  () => {main().catch(console.error)})
// cron.schedule('* * * * *', () => {main().catch(console.error)})