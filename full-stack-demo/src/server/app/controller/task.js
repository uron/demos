const task = require('../../service/task.js');

const getTodoListById = async function (ctx) {
    const id = ctx.params.id;
    const result = await task.getTodoListById(id); // 通过await “同步”地返回查询结果
    ctx.body = {
        success: true,
        result, // 将请求的结果放到response的body里返回
    };
};

const getDoneListById = async function (ctx) {
    const id = ctx.params.id;
    const result = await task.getDoneListById(id);
    ctx.body = {
        success: true,
        result,
    };
};

const createTodoTask = async function (ctx) {
    const data = ctx.request.body.fields;
    const success = await task.createTodoTask(data);
    ctx.body = {
        success,
    };
};

const deleteTodoTask = async function (ctx) {
    const userid = ctx.params.userid;
    const id = ctx.params.id;
    const success = await task.deleteTodoTask(userid, id);
    ctx.body = {
        success,
    };
};

const updateTodoTask = async function (ctx) {
    const userid = ctx.params.userid;
    const id = ctx.params.id;
    const content = ctx.request.body.fields.content;
    let status = ctx.request.body.fields.status;
    parseInt(status) === 0 ? status = true : status = false;
    const success = await task.updateTodoTask(userid, id, status, content);
    ctx.body = {
        success,
    };
};

module.exports = {
    getTodoListById,
    getDoneListById,
    createTodoTask,
    deleteTodoTask,
    updateTodoTask,
};
