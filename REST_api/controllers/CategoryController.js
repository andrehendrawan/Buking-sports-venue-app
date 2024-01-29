const express = require('express')
const { Category } = require('../models/index')

class CategoryController {
    static async listCategory(req, res, next) {
        try {
            const data = await Category.findAll()
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async createCategory(req, res, next) {
        try {
            const category = req.body
            const data = await Category.create(category)
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CategoryController