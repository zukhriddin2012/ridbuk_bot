const TelegramBot = require('node-telegram-bot-api')
const config = require('./config')
const helper = require('./helper')
const kb = require('./keyboard_buttons')
const keyboard = require('./keyboard')
const emoji = require('node-emoji')
const mysql = require('mysql')
const fs = require('fs')

helper.logStart()

var dollar = 8330
////////////////////////////////////////////////
///////////////////////////////////////////////Database
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ridbuk_bot"
});

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////BOT
const bot = new TelegramBot(config.TOKEN,  {
    polling: true
})
////////////////////////////////////////////////////////////
////////////////////////////////////////// Handling message
bot.on('message', msg => {
    
    const chatid = msg.from.id
/////////////////////////////////////////////////////////// Products
    switch(msg.text) {
        case kb.home.products:
            bot.sendMessage(chatid, 'Mahsulot turlari:', {
                reply_markup: {
                    keyboard: keyboard.store
                }
            })
            break
////////////////////////// About
        case kb.home.about:
            const fs = require('fs')
            bot.sendMessage(chatid, "Bizning Kanal:", {
                reply_markup: {
                    keyboard: keyboard.back,
                    resize_keyboard: true
                }
            }).then(
            bot.sendPhoto(chatid, fs.readFileSync(__dirname+"/resources/logo.jpg"), {
                reply_markup: {
                    inline_keyboard: keyboard.about
                }
            }))
            break
////////////////////////// Phones
        case kb.store.phones:
            one = []
            con.query("SELECT DISTINCT company FROM phones", function (err, results, fields) {
                results.forEach(function(result) {
                    console.log(result.company)
                    one.push([{text:result.company, callback_data: result.company + ", phone"}])
                    console.log(one)
                })
                bot.sendMessage(chatid, "Brendlar:",{
                    reply_markup: {
                        keyboard: keyboard.back,
                        resize_keyboard: true
                    }
                }).catch(console.error).then(
                bot.sendMessage(chatid, 'Tanlang:', {
                    reply_markup: {
                        inline_keyboard: one,
                        resize_keyboard: true
                    }
                }).catch(console.error))
            })            
            break
//////////////////////////// Computers Page
        case kb.store.comps:
            one = []
            con.query("SELECT DISTINCT company FROM computers", function (err, results, fields) {
                results.forEach(function(result) {
                    console.log(result.company)
                    one.push([{text:result.company, callback_data: result.company + ", computer"}])
                    console.log(one)
                })
                bot.sendMessage(chatid, "Brendlar:",{
                    reply_markup: {
                        keyboard: keyboard.back,
                        resize_keyboard: true
                    }
                }).catch(console.error).then(
                bot.sendMessage(chatid, 'Tanlang:', {
                    reply_markup: {
                        inline_keyboard: one,
                        resize_keyboard: true
                    }
                }).catch(console.error))
            })            
            break
////////////////////////// Printers Page
        case kb.store.printers:
            one = []
            con.query("SELECT DISTINCT company FROM printers", function (err, results, fields) {
                results.forEach(function(result) {
                    console.log(result.company)
                    one.push([{text:result.company, callback_data: result.company + ", printer"}])
                    console.log(one)
                })
                bot.sendMessage(chatid, "Brendlar:",{
                    reply_markup: {
                        keyboard: keyboard.back,
                        resize_keyboard: true
                    }
                }).catch(console.error).then(
                bot.sendMessage(chatid, 'Tanlang:', {
                    reply_markup: {
                        inline_keyboard: one,
                        resize_keyboard: true
                    }
                }).catch(console.error))
            })                
            break
////////////////////////// Location
        case kb.home.location:
        one = []

        one.push([{text: "Orqaga", callback_data: "Main"}])
            bot.sendMessage(chatid, "Will come soon!", {
                reply_markup: {
                    inline_keyboard: one
                }
            })      
            break
/////////////////////////// News
        case kb.home.news:
            one = []

            one.push([{text: "Orqaga", callback_data: "Main"}])
            bot.sendMessage(chatid, "Will come soon!", {
                reply_markup: {
                    inline_keyboard: one
                }
            })
            break
////////////////////////// Back
        case kb.back:
            bot.sendMessage(msg.from.id, "Tanlang: ", {
                reply_markup: {
                    keyboard: keyboard.home
                }
            })
            break
    }
})
////////////////////////////////////////////// End of Messages
/////////////////////////////////////////////
bot.on('callback_query', function(msg){
    const chatid = msg.from.id    
/////////////////////////////////////////// Phone Models
    if(msg.data.includes("phone")){
        
        const info = msg.data.split(",")
        one = []
            con.query("SELECT * FROM phones WHERE company = '"+info[0]+"'", function (err, results, fields) {
                     results.forEach(function(result) {
                        console.log(result.company)
                         one.push([{text:result.model, callback_data:result.pid}])
                         console.log(one)
                     })

                bot.sendMessage(chatid, 'Modellardan birini tanlang:', {
                    
                                reply_markup: {
                                    inline_keyboard: one,
                                    resize_keyboard: true,
                                    hide_keyboard: true
                                }
                            }).catch(console.error)
            })
    } 
/////////////////////////////////////////////// Printer Models
    else if(msg.data.includes("printer")){
        const info = msg.data.split(",")
        one = []
            con.query("SELECT * FROM printers WHERE company = '"+info[0]+"'", function (err, results, fields) {
                     results.forEach(function(result) {
                        console.log(result.company)
                         one.push([{text:result.model, callback_data:result.pid}])
                         console.log(one)
                     })
                bot.sendMessage(chatid, 'Modellardan birini tanlang:', {
                    
                                reply_markup: {
                                    inline_keyboard: one,
                                    resize_keyboard: true,
                                    hide_keyboard: true
                                }
                            }).catch(console.error)


            })
    }
//////////////////////////////////////////////// Computer Models    
    else if(msg.data.includes("computer")){
        const info = msg.data.split(",")
        one = []
            con.query("SELECT * FROM computers WHERE company = '"+info[0]+"'", function (err, results, fields) {
                     results.forEach(function(result) {
                        console.log(result.company)
                         one.push([{text:result.model, callback_data:result.pid}])
                         console.log(one)
                     })

                bot.sendMessage(chatid, 'Modellardan birini tanlang:', {
                    
                                reply_markup: {
                                    inline_keyboard: one,
                                    resize_keyboard: true,
                                    hide_keyboard: true
                                }
                            }).catch(console.error)


            })
    }
////////////////////////////////////////////////// Individual Phone
    else if(msg.data < 1000){
        const fs = require('fs')
            con.query("SELECT * FROM phones WHERE pid = '"+msg.data+"'", function (err, results, fields) {
                     results.forEach(function(result) {
                        console.log(result.company)

                        const caption = emoji.emojify(":iphone:")+' <b>'+ result.company + ' ' + result.model + '</b>\n\nXususiyatlari:\n'+emoji.emojify(":trackball:")+' Kamera: '+result.camera+'MP\n'+emoji.emojify(":package:")+' Xotira: '+result.memory+'GB\n'+emoji.emojify(":battery:")+' Quvvat: '+result.battery+'mAh\n\n'+emoji.emojify(":dollar:")+' '+Intl.NumberFormat().format(result.price*dollar)+" so'm"

                        bot.sendPhoto(chatid, fs.readFileSync(__dirname + "/resources/"+result.model+".jpg"), {
                            caption: caption,
                            parse_mode: 'HTML',
                            reply_markup: {
                                inline_keyboard: keyboard.purchase,
                            }
                        }).catch(console.error)
                        })
            })
    }
/////////////////////////////////////////////////// Individual Computer    
    else if(msg.data > 10000){
        const fs = require('fs')
        con.query("SELECT * FROM computers WHERE pid = '"+msg.data+"'", function (err, results, fields) {
                 results.forEach(function(result) {
                    console.log(result.company)

                    const caption = emoji.emojify(":computer:")+' <b>'+ result.company + ' ' + result.model + '</b>\n\nXususiyatlari:\n'+emoji.emojify(":control_knobs:")+' Protsessor: '+result.cpu +'\n'+emoji.emojify(":gear:")+' RAM: '+result.ram+'GB\n'+emoji.emojify(":package:")+' Xotira: '+result.memory+'\n\n'+emoji.emojify(":dollar:")+' '+Intl.NumberFormat().format(result.price*dollar)+" so'm"

                    bot.sendPhoto(chatid, fs.readFileSync(__dirname + "/resources/"+result.model+".jpg"), {
                        caption: caption,
                        parse_mode: 'HTML',
                        reply_markup: {
                            inline_keyboard: keyboard.purchase,
                            resize_keyboard: true,
                            hide_keyboard: true
                        }
                    }).catch(console.error)
                    })
        })
    }
////////////////////////////////////////////////////////// Individual Printers    
    else if(msg.data > 2999 & msg.data < 5000){
        const fs = require('fs')
        one = []
        con.query("SELECT * FROM printers WHERE pid = '"+msg.data+"'", function (err, results, fields) {
                 results.forEach(function(result) {
                     one.push(keyboard.purchase)
                    console.log(result.company)
                    console.log(one)
                    const caption = emoji.emojify(":printer:")+' <b>'+ result.company + ' ' + result.model + '</b>\n\nXususiyatlari:\n'+emoji.emojify(":white_check_mark:")+' '+result.c1 +'\n'+emoji.emojify(":white_check_mark:")+' '+result.c2+'\n'+emoji.emojify(":white_check_mark:")+' '+result.c3+'\n\n'+emoji.emojify(":dollar:")+' '+Intl.NumberFormat().format(result.price*dollar)+" so'm\n"+result.comment

                    bot.sendPhoto(chatid, fs.readFileSync(__dirname + "/resources/"+result.model+".jpg"), {
                        caption: caption,
                        parse_mode: 'HTML',
                        reply_markup: {
                            inline_keyboard: keyboard.purchase,
                            resize_keyboard: true,
                            hide_keyboard: true
                        }
                    }).catch(console.error)
                    })
        })
    }
//////////////////////////////////////////// Purchase    
    else if(msg.data === "Purchase"){
        const contacts = "Sotib olish uchun:\n" + emoji.emojify(":telephone_receiver:") + " 914929909\n"+emoji.emojify(":telephone_receiver:") + " 906245757\n"+emoji.emojify(":envelope_with_arrow:")+" @RA_Yusupov"
        bot.sendMessage(chatid, contacts, {
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: keyboard.purchase_page
            }
        })
    }
///////////////////////////////////////// Main    
    else if(msg.data === "Main"){
        bot.sendMessage(chatid, 'Tanlang:', {
            reply_markup: {
                keyboard: keyboard.home
            }
        }).catch(console.error)
    }    
///////////////////////////////////////////// Payme
    else if(msg.data.includes("Payme")){
        const info = msg.data.split(",")
        pay(info[0], info[1], info[2], info[3])
    }

})
//////////////////////////////////////////////
///////////////////////////////////////////// Start
bot.onText(/\/start/, msg => {
    const text = 'Salom, ' + msg.from.first_name + '\nTanlang: '
    console.log(msg.message_id)
    bot.sendMessage(msg.chat.id, text, {
        reply_markup: {
            keyboard: keyboard.home
        }
    })
})
////////////////////////////////////////////////
/////////////////////////////////////////////// Payment Function
function pay(company, model, price, category){
        const chatid = msg.chat.id
    
        bot.sendInvoice(chatid, company + ' ' + model, category, config.PAY, 'Random', 'UZS', 
    [
        {
            label: model,
            amount: price
        }
    ],
    
        {
            need_name: false,
            need_shipping_address: false
        }
    )
}