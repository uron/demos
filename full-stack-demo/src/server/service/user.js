const db = require('../model/db.js');
const userModel = '../model/user.js';
const TodolistDb = db.Todolist; // 引入数据库

const User = TodolistDb.import(userModel);

/**
 * 通过ID查找用户
 * @param {string} ID -用户ID
 */
const getUserById = async function (id) {
    const userInfo = await User.findOne({
        where: {
            id,
        },
    });
    return userInfo;
};

/**
 * 通过名称查找用户
 * @param {string} name -用户名
 */
const getUserByName = async function (name) {
    const userInfo = await User.findOne({
        where: {
            user_name: name,
        },
    });
    return userInfo;
};
/**
 * 用户注册
 * @param {object} data - 用户名、密码
 */
const createNewUser = async function (data) {
    await User.create({
        user_name: data.account,
        password: data.password,
    });
    return true;
};

module.exports = {
    getUserById,
    getUserByName,
    createNewUser,
};

