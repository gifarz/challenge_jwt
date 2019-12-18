'use strict'

module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define('books', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        title: Sequelize.STRING,
        author: Sequelize.STRING,
        pages: Sequelize.INTEGER,
        language: Sequelize.STRING
    }, {});

    return Book;
}