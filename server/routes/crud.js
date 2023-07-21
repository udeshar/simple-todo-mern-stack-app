const express = require('express');
const { body } = require('express-validator/check');
const crudController = require('../controllers/crud');

const router = express.Router();

router.get('/get', crudController.getAllTodos);

router.get('/get/:tid', crudController.getSingleTodo);

router.post('/post', [
    body('name',"Provide a valid name")
        .isLength({ min: 2})
        .trim(),
    body('status', "Provide a valid status")
        .isBoolean()
], crudController.postTodo);

router.put('/put/:tid', [
    body('status', "Provide a valid status")
        .isBoolean()
], crudController.putTodo);

router.put('/putname/:tid', [
    body('name', "Provide a valid name")
    .isLength({ min: 2})
    .trim(),
], crudController.putTodo);

router.delete('/delete/:tid', crudController.deleteTodo);

router.post('/givemarks', [
    body('marks', "Provide a valid marks")
    .isNumeric()
], crudController.postMarks);

module.exports = router;