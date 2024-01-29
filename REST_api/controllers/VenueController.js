const express = require('express')
const { Venue, Order, User } = require('../models/index')
const midtransClient = require('midtrans-client');


class VenueController {
    static async listVenue(req, res, next) {
        try {
            const data = await Venue.findAll()
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async detailVenue(req, res, next) {
        const { id } = req.params
        try {
            const data = await Venue.findByPk(id)
            if (!data) {
                throw { name: "ErrorNotFound" }
            }
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async createVenue(req, res, next) {
        try {
            const venue = req.body
            const data = await Venue.create(venue)
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async editVenue(req, res, next) {
        const { id } = req.params
        try {
            const data = await Venue.findByPk(id)
            await Venue.update(req.body, {
                where: {
                    id: id
                }
            })
            if (!data) {
                throw { name: "ErrorNotFound" }
            }
            res.status(200).json({ message: `Successfully Update Venue with Id ${id}`, data })
        } catch (error) {
            next(error)
        }
    }

    static async deleteVenue(req, res, next) {
        const { id } = req.params
        try {
            const data = await Venue.findByPk(id)
            await Venue.destroy({
                where: {
                    id: id
                }
            })
            if (!data) {
                throw { name: "ErrorNotFound" }
            }
            res.status(200).json({ message: `Successfully Deleted Venue with Id ${id}` })
        } catch (error) {
            next(error)
        }
    }

    static async getMidTransToken(req, res, next) {
        const { id } = req.params
        try {
            const data = await Venue.findByPk(id)
            if (!data) {
                throw { name: "ErrorNotFound" }
            }

            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY
            });
            const lastOrder = await Order.findOne({
                order: [['createdAt', 'desc']]
            })
            const lastId = lastOrder ? lastOrder.id + 1 : 1

            const duplicateBooking = await Order.findOne({
                where: {
                    bookingDate: req.body.bookingDate
                }
            })

            if (duplicateBooking) {
                throw { name: "Duplicate" }
            }
            const order = await Order.create({
                orderId: "ORD-" + Date.now() + lastId,
                UserId: req.user.id,
                statusPayment: 'pending',
                VenueId: id,
                bookingDate: req.body.bookingDate
            })
            console.log(duplicateBooking);
            let parameter = {
                "transaction_details": {
                    "order_id": order.orderId,
                    "gross_amount": data.price
                },
                "customer_details": {
                    "first_name": req.user.fullName,
                    "last_name": "-",
                    "email": req.user.email,
                    "phone": req.user.phoneNumber
                },
                "item_details": [
                    {
                        "id": data.id,
                        "price": data.price,
                        "quantity": 1,
                        "name": "Booking Venue" + data.name
                    },
                ]
            };
            const response = await snap.createTransaction(parameter)
            res.json(response)

        } catch (error) {
            next(error)
        }
    }

    static async getMidtransNotifications(req, res, next) {
        const statusResponse = req.body
        let orderId = statusResponse.order_id;
        let transactionStatus = statusResponse.transaction_status;
        let fraudStatus = statusResponse.fraud_status;

        console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);

        // Sample transactionStatus handling logic
        const order = await Order.findOne({
            where: {
                orderId: orderId
            }
        })
        console.log(order, '<<<<<<<<');
        const successProcess = async () => {
            await Order.update(
                { statusPayment: 'paid' },
                { where: { id: order.id } }
            );

            await Order.update({
                paidDate: new Date()
            }, { where: { id: order.id } }
            )
        }
        if (transactionStatus == 'capture') {
            if (fraudStatus == 'accept') {
                // TODO set transaction status on your database to 'success'
                // and response with 200 OK
                await successProcess()
            }
        } else if (transactionStatus == 'settlement') {
            // TODO set transaction status on your database to 'success'
            // and response with 200 OK
            await successProcess()
        } else if (transactionStatus == 'cancel' ||
            transactionStatus == 'deny' ||
            transactionStatus == 'expire') {
            // TODO set transaction status on your database to 'failure'
            // and response with 200 OK
            await Order.update({
                statusPayment: 'failure'
            })
        }
        res.status(200)
    }
}

module.exports = VenueController