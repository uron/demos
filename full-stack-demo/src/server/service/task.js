
const db = require('../model/db.js');
const taskModel = '../model/task.js';
const TodolistDb = db.Todolist;

const Task = TodolistDb.import(taskModel);

/**
 * 通过用户ID查找待完成任务
 * @param {string} ID -用户ID
 */
const getTodoListById = async function (id) {
    const todolist = await Task.findAll({
        where: {
            user_id: id,
            status: 0,
        },
        attributes: ['id', 'content', 'status'],
    });
    return todolist;
};

/**
 * 通过用户ID查找已完成任务
 * @param {string} ID -用户ID
 */
const getDoneListById = async function (id) {
    const todolist = await Task.findAll({
        where: {
            user_id: id,
            status: 1,
        },
        attributes: ['id', 'content', 'status'],
    });
    return todolist;
};

/**
 * 创建用户任务
 * @param {object}
 */
const createTodoTask = async function (data) {
    await Task.create({
        user_id: data.id,
        content: data.content,
        status: data.status,
    });
    return true;
};

/**
 * 删除用户待完成任务
 * @param {string} userid 
 * @param {sting} id 
 */
const deleteTodoTask = async function (userid, id) {
    const result = await Task.destroy({
        where: {
            user_id: userid,
            id,
        },
    });
    return result === 1;
};

/**
 * 修改任务
 * @param {string} userid
 * @param {string} id
 * @param {string} status
 * @param {string} content
 */
const updateTodoTask = async function (userid, id, status, content) {
    const result = await Task.update(
        {
            status,
            content,
        },
        {
            where: {
                user_id: userid,
                id,
            },
        }
    );
    return result[0] === 1;
};

module.exports = {
    getTodoListById,
    getDoneListById,
    createTodoTask,
    deleteTodoTask,
    updateTodoTask,
};