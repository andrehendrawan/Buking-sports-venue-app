const axios = require('axios');
const express = require('express')

class NewsController {
    static async news(req, res, next) {
        try {
            const api_key = process.env.API_NEWS_KEY
            const api_url = `https://newsapi.org/v2/top-headlines?country=id&category=sports&pageSize=8`
            const { data } = await axios.get(
                api_url, {
                headers: {
                    Authorization:
                        "Bearer " + api_key
                }
            }
            )
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = NewsController