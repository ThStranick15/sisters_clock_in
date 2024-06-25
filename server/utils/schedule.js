const schedule  = require('node-schedule')
const User = require('../models/User')

const job = schedule.scheduleJob('0 0 * * *', async function(){
    try{
        const notSignedOut = await User.find({timeIn:{$ne: null, $exists: true} ,timeOut: null})
        console.log(notSignedOut)
        notSignedOut.forEach(async (user) => {
            user.logs.push({
                date: user.timeIn.toDateString(),
                description: "Did not sign out",
                hours: 0.0167 //one minute
            })
            user.timeIn = null

            await user.save()
        })
        
    } catch (error){
        console.log(error)
    }
})

module.exports = job

