const kb = require('./keyboard_buttons')
module.exports = {
    home: [
        [kb.home.products],
        [kb.home.about],
        [kb.home.news],
        [kb.home.location]
    ],

    store: [
        [kb.store.phones],
        [kb.store.comps],
        [kb.store.printers],
        [kb.back]
    ],

    back: [
        [kb.back]
    ],
    
    purchase: [
        [{
            text: kb.purchase.buy,
            callback_data: "Purchase"
        }],
        [{
            text: kb.purchase.back,
            callback_data: "Store"
        }]
    ],

    location: [
        [{
            text: kb.back,
            callback_data: "Main"
        }]
    ],

    about: [
        [{
            text: kb.about.channel,
            url: 'https://t.me/joinchat/AAAAAFCy8wEN7j69vlki4Q'
        }]
    ],

    purchase_page: [
        [{
            text: kb.back,
            callback_data: "Store"
        }]
    ]


}