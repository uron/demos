/**
 * User Model
 * 用户模型
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER(11), // 字段类型
            allowNull: false, // 是否允许为NULL
            primaryKey: true, // 主键
            autoIncrement: true, // 是否自增
        },
        user_name: {
            type: DataTypes.CHAR(50),
            allowNull: false,
        },
        password: {
            type: DataTypes.CHAR(128),
            allowNull: false,
        },
    }, {
        tableName: 'user',
    });
};