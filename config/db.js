const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    logging: false,

    pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/user.js')(sequelize, Sequelize);
db.role = require('../models/role.js')(sequelize, Sequelize);
db.book = require('../models/book.js')(sequelize, Sequelize);
db.order = require('../models/order.js')(sequelize, Sequelize);

db.role.belongsToMany(db.user, { through: 'user_roles', foreignKey: 'roleId', otherKey: 'userId' });
db.user.belongsToMany(db.role, { through: 'user_roles', foreignKey: 'userId', otherKey: 'roleId' });

db.book.belongsToMany(db.user, { through: {model: 'orders',unique: false}, foreignKey: 'bookId', otherKey: 'userId' });
db.user.belongsToMany(db.book, { through: {model: 'orders',unique: false}, foreignKey: 'userId', otherKey: 'bookId' });
// db.order.belongsToMany(db.book, { through: 'orders', foreignKey: 'userId', otherKey: 'bookId' });
// db.order.belongsToMany(db.user, { through: 'orders', foreignKey: 'bookId', otherKey: 'userId' });
// db.book.belongsToMany(db.role, { through: 'user_roles', foreignKey: 'bookId', otherKey: 'roleId' });
// db.role.belongsToMany(db.book, { through: 'user_roles', foreignKey: 'roleId', otherKey: 'bookId' });

module.exports = db;