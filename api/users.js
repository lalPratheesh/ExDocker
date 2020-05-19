const express = require('express');
const router = express.Router();
const db = require('../db');

router
    .get("/all", async (req, res) => {
        try {
            const users = await db.user.findAll();
            return res.status(200)
                .send(users);
        } catch (e) {
            return res.status(500)
                .send(e);
        }
    })
    .get("/:id", async (req, res) => {
        try {
            const user = await db.user.findByPk(req.params.id);
            return res.status(200)
                .send(user);
        } catch (e) {
            return res.status(500)
                .send(e);
        }
    })
    .post("/", async (req, res) => {
        try {
            const user = await db.user.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            });
            return res.status(200)
                .send(user);
        } catch (e) {
            return res.status(500)
                .send(e);
        }
    })
    .put("/", async (req, res) => {
        try {
            await db.user.update({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            }, {
                where: {
                    id: req.body.id
                }
            });
            return res.status(200)
                .send(true);
        } catch (e) {
            return res.status(500)
                .send(e);
        }
    })
    .delete("/:id", async (req, res) => {
        try {
            await db.user.destroy({
                where: {
                    id: req.params.id
                }
            });
            return res.status(200)
                .send(true);
        } catch (e) {
            return res.status(500)
                .send(e);
        }
    });

module.exports = router;
