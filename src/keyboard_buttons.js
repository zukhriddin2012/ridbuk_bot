const emoji = require('node-emoji')

module.exports = {
    home: {
        products: emoji.emojify(":convenience_store:") + " Do'kon",
        about: emoji.emojify(":page_with_curl:") + " Bizning Kanal",
        location: emoji.emojify(":pushpin:") + " Manzil",
        news: emoji.emojify(":mailbox_with_mail:") + " Yangiliklar"
    },

    store: {
        phones: emoji.emojify(":iphone:") + " Telefonlar",
        comps: emoji.emojify(":computer:") + " Noutbuklar",
        printers: emoji.emojify(":printer:") + " Printerlar"
    },

    about: {
        channel: emoji.emojify(":point_right:")+" Kanalga o'tish",
        back: emoji.emojify(":back:") + " Orqaga"
    },

    purchase: {
        back: emoji.emojify(":back:") + " Orqaga",
        buy: "Sotib olmoq"
    },

    back: emoji.emojify(":back:") + " Orqaga",
}