'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('Users', 'image', {
            type: Sequelize.STRING,
            allowNull: true,
        });
        await queryInterface.changeColumn('Users', 'public_id', {
            type: Sequelize.STRING,
            allowNull: true,
        });
    },

    down: async (queryInterface, Sequelize) => {
        // If needed, you can define the down migration
        await queryInterface.changeColumn('Users', 'image', {
            type: Sequelize.STRING,
            allowNull: false,
        });
        await queryInterface.changeColumn('Users', 'public_id', {
            type: Sequelize.STRING,
            allowNull: false,
        });
    }
};
