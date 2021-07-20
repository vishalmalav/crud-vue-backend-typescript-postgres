"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAll = exports.findAllPublished = exports.deleteAll = exports.deleteTutorials = exports.updateTutorials = exports.createTutorials = exports.getTutorialById = exports.getTutorials = void 0;
const database_1 = require("../database");
const getTutorials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query("SELECT * FROM tutorials");
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ error: e.detail });
    }
});
exports.getTutorials = getTutorials;
const getTutorialById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const response = yield database_1.pool.query("SELECT * FRoM tutorials WHERE id=$1", [
        id,
    ]);
    return res.json(response.rows[0]);
});
exports.getTutorialById = getTutorialById;
const createTutorials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, published } = req.body;
    // console.log(name, email, phone);
    try {
        const response = yield database_1.pool.query("INSERT INTO tutorials (title,description,published) VALUES ($1,$2,$3)", [title, description, published]);
        return res.json({
            message: "user creates succefully",
            body: {
                tutorials: {
                    title,
                    description,
                    published,
                },
            },
        });
    }
    catch (e) {
        return res.status(400).json({ error: e.message });
    }
});
exports.createTutorials = createTutorials;
const updateTutorials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { title, description, published } = req.body;
    try {
        yield database_1.pool.query("UPDATE tutorials SET title=$1 ,description= $2,published=$3 WHERE id=$4", [title, description, published, id]);
        return res.json({
            message: "user creates succefully",
            body: {
                user: {
                    title,
                    description,
                    published,
                },
            },
        });
    }
    catch (e) {
        return res.status(400).json({ error: e.detail });
    }
});
exports.updateTutorials = updateTutorials;
const deleteTutorials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        yield database_1.pool.query("DELETE FROM tutorials WHERE id=$1", [id]);
        console.log("abc");
        return res.json({ message: `user ${id} deleted successfully` });
    }
    catch (e) {
        return res.status(500).json({ error: e.detail });
    }
});
exports.deleteTutorials = deleteTutorials;
const deleteAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const id = parseInt(req.params.id);
    console.log("abc");
    try {
        yield database_1.pool.query("DELETE FROM tutorials WHERE id=0");
        return res.json({ message: `all user deleted successfully` });
    }
    catch (e) {
        return res.status(500).json({ error: e.detail });
    }
});
exports.deleteAll = deleteAll;
const findAllPublished = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const id = parseInt(req.params.id);
        const response = yield database_1.pool.query("SELECT * FRoM tutorials WHERE published=true");
        return res.json(response.rows);
    }
    catch (e) {
        return res.status(400).json({ error: e.detail });
    }
});
exports.findAllPublished = findAllPublished;
const findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const title = req.query.title;
        // const id = parseInt(req.params.id);
        // var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
        const response = yield database_1.pool.query("SELECT * FROM tutorials WHERE title like '%' || $1 || '%'", [title]);
        return res.json(response.rows);
    }
    catch (e) {
        return res.status(500).json({ error: e.detail });
    }
});
exports.findAll = findAll;
