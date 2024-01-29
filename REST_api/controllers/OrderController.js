const express = require('express')
const { Order, Venue, User } = require('../models/index')


class OrderController {
    static async orderHistory(req, res, next) {
        const { id } = req.params
        try {
            const data = await Order.findAll({
                where: {
                    UserId: id
                },
                include: [
                    {
                        model: Venue
                    },
                    {
                        model: User
                    }
                ],
                order: [['updatedAt', 'DESC']]
            });
            if (!data) {
                throw { name: "ErrorNotFound" }
            }
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = OrderController