import express from "express"
const app = express();
import mongoose from "mongoose"


import Customer from './Models/Customer.js';
import transaction from "./Models/transaction.js";
app.use(express.static('public'));
app.set('view engine','ejs')


mongoose.connect(process.env.DATA_URL)

app.listen(3000, function() {
    console.log("Listening on 3000")
})
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get("/", (req,res) =>  {
    res.render("index")
})
app.get("/index", (req,res) =>  {
    res.render("index")
})
app.get("/customers", async (req,res) => {
    // const data = new Customer({
    //     Account_Number : 1738725,
    //     User_Name : "Aravindam",
    //     Balance : 100000
    // })
    // data.save()

   

    // var user =  Customer.findOne({})
    // console.log(user);
    // var user = [{
    //     Account_Number : article.Account_Number,
    //     User_Name : article.User_Name,
    //     Balance : article.Balance
    // }]
    
    
    //  const article = await Customer.findOne({});
    //   console.log(article.Account_Number);
      const all = await Customer.find()
    console.log(all)
    res.render("customers",{users:all})
    
})

app.get("/transaction",(req,res) => {
    res.render("transaction")
})


app.get("/about",(req,res) => {
    res.render("about")
})

// app.post("/transaction", async(req,res) => {
//     console.log(req.body.Account_Number_from)
// })

app.post("/transaction", async(req,res) => {
    const Account_Number_from = req.body.Account_Number_from
    console.log(Account_Number_from)
    const sender = await Customer.findOne({Account_Number:Account_Number_from})
    console.log(sender)
    const bal = req.body.atd
    sender.Balance = sender.Balance - bal
    console.log(sender.Balance)
    const b = sender.Balance
    console.log(sender)
    await Customer.updateOne({Account_Number:Account_Number_from},{$set:{Balance:sender.Balance}})
    console.log(await Customer.findOne({Account_Number:Account_Number_from}))
    console.log("_______________________________________________________________-")
    /*-----------------------*/
    const Account_Number_to = req.body.Account_Number_to
    console.log(Account_Number_to)
    const reciever = await Customer.findOne({Account_Number:Account_Number_to})
    console.log(reciever)
    reciever.Balance = reciever.Balance + parseInt(bal)
    console.log(reciever.Balance)
    console.log(reciever)
    await Customer.updateOne({Account_Number:Account_Number_to},{$set:{Balance:reciever.Balance}}
    )
    console.log(await Customer.findOne({Acoount_Number : Account_Number_to}))
    /*---------------------------*/
    const log = new transaction({
        From_Account : Account_Number_from,
        To_Account : Account_Number_to,
        Amount : bal
    })
   log.save()
    res.render("Successful",{Account_Number_from:Account_Number_from,Account_Number_to:Account_Number_to,Balance: sender.Balance })
    
})

app.get("/history",async (req,res) => {
    const all_c = await transaction.find()
    
    res.render("history",{users:all_c})
})

