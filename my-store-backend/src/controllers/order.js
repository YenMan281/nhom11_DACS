const Order = require('../models/order');
const Cart = require('../models/cart');
const CartItem = require("../models/cart-item");
require("dotenv").config();
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Product = require('../models/products');
const { Sequelize } = require('sequelize');
const moment = require('moment');
const { env } = require('process');

exports.addOrder = async(req, res, next) => {
    const { userId, total, products, address, note, phoneNumber } = req.body;
    let cart = await Cart.findOne({ where: { userId: userId } })
    console.log(cart);
    if (!cart) {
        cart = await Cart.create({ userId });
    }
    try {
        const order = await Order.create({
            userId,
            cartId: cart.id,
            total,
            address,
            status: "order",
            note,
            phoneNumber
        });
        console.log(order);
        const promises = products.map(async(product) => {
            const cartItem = await CartItem.findOne({ where: { cartId: cart.id, productId: product.id } });
            if (cartItem) {
                // Nếu cartItem đã tồn tại, ta sẽ update lại quantity của nó
                await cartItem.update({ quantity: cartItem.quantity + product.quantity });
            } else {
                // Nếu cartItem chưa tồn tại, ta sẽ tạo mới
                await CartItem.create({
                    // cartId: cart.id,
                    productId: product.id,
                    quantity: product.quantity,
                    orderId: order.id,
                });
            }

        });
        await Promise.all(promises);




        res.status(200).send({
            message: vnpay(order)
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Lỗi khi thêm dữ liệu", error });
    }
};


function vnpay(order) {
    process.env.TZ = 'Asia/Ho_Chi_Minh';

    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');
    console.log(createDate);

    let ipAddr = '13.160.92.202'
    let tmnCode = process.env.vnp_TmnCode;
    let secretKey = process.env.vnp_HashSecret;
    let vnpUrl = process.env.vnp_Url;
    let returnUrl = process.env.vnp_ReturnUrl;
    let orderId = moment(date).format('DDHHmmss');
    let amount = order.total;
    let bankCode = 'NCB';

    let locale = 'vn';

    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    vnp_Params['vnp_BankCode'] = bankCode;


    vnp_Params = sortObject(vnp_Params);

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    return vnpUrl

}


exports.getOrder = async(req, res) => {
    const token = req.headers.token;
    const accessToken = token.split(" ")[1];
    const user = jwt.verify(accessToken, process.env.SECRET_KEY)
    console.log(user.id);
    Cart.findOne({ where: { userId: user.id } })
        .then((cart) => {
            Order.findAll({ where: { cartId: cart.id } })
                .then(async(orders) => {
                    console.log(orders.length);
                    const data = [];
                    const promises = orders.map(async(order) => {
                        const orderCartItem = await CartItem.findAll({ where: { orderId: order.id } });
                        if (orderCartItem) {
                            data.push(orderCartItem)
                        }
                    });
                    await Promise.all(promises);
                    res.status(200).send({ message: "Thêm dữ liệu thành công!", data: data });
                })
                .catch((error) => { console.log(error) })
        })
        .catch((error) => { console.log(error) })
}

exports.getAllOrder = async(req, res) => {
    Order.findAll({
            include: [{
                    model: User
                },
                {
                    model: Cart,
                },

            ]
        })
        .then((orders) => {

            return res.status(200).json({ message: "success", data: orders });
        })
        .catch((error) => {
            console.log(error);
        });

}


function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}