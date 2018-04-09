const router = require('koa-router')();
const taskControl = require('../app/controller/task');

const routers = router
    .get('/task/todo/:id', taskControl.getTodoListById)
    .get('/task/done/:id', taskControl.getDoneListById)
    .post('/task', taskControl.createTodoTask)
    .delete('/task/:userid/:id', taskControl.deleteTodoTask)
    .put('/task/:userid/:id', taskControl.updateTodoTask)
module.exports = routers;