
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('User', {
        user_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        email: {type: DataTypes.STRING(32), allowNull: false},
        create_date: {type: DataTypes.DATE, defaultValue: DataTypes.NOW}
    }, {
        classMethods: {},
        tableName: 'local_user',
        freezeTableName: true,
        underscored: true,
        timestamps: false
    });
};


var userSchema = {

    local : {
        id : {
            type : 'increments',
            nullable : false,
            primary : true
        },
        email : {
            type : 'string',
            maxlength : 254,
            nullable : false,
            unique: true
        },
        password : {
            type : 'string',
            nullable : false
        }
    },

    google : {
        id : {
            type : 'string',
            nullable : false,
            primary : true,
            unique : true
        },
        token : {
            type : 'string',
            nuallable : false
        },
        email : {
            type : 'string',
            maxlength : 254,
            nullable : false,
            unique : true
        },
        name : {
            type : 'string',
            nullable : false
        }
    }

}

