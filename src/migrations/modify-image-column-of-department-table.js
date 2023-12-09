'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('Departments', 'image', {
            type: Sequelize.BLOB('long')
        });
    },

    down: async (queryInterface, Sequelize) => {
        // If needed, you can define the down migration
        await queryInterface.changeColumn('Departments', 'image', {
            type: Sequelize.STRING
        });
    }
};
