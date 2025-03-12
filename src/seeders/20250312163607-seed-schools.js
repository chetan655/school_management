"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const schools = [
            {
                name: "Green Valley High School",
                address: "123 Elm Street, Springfield",
                latitude: 32.456,
                longitude: 63.567,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Sunrise Academy",
                address: "456 Oak Avenue, Riverside",
                latitude: 32.765,
                longitude: 63.234,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Hilltop International",
                address: "789 Pine Road, Hilltown",
                latitude: 32.123,
                longitude: 63.89,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Green Valley High School",
                address: "123 Elm Street, Springfield",
                latitude: 32.456,
                longitude: 63.567,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Sunrise Academy",
                address: "456 Oak Avenue, Riverside",
                latitude: 32.765,
                longitude: 63.234,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Hilltop International School",
                address: "789 Pine Road, Hilltown",
                latitude: 32.123,
                longitude: 63.89,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Blue Ridge Primary School",
                address: "901 Cedar Street, Lakeside",
                latitude: 32.876,
                longitude: 63.111,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Riverbend Academy",
                address: "654 Maple Lane, Rivertown",
                latitude: 32.345,
                longitude: 63.678,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Mountain View High School",
                address: "321 Birch Avenue, Mountain City",
                latitude: 32.543,
                longitude: 63.222,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Evergreen Public School",
                address: "567 Aspen Road, Greenfield",
                latitude: 32.987,
                longitude: 63.444,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Sunflower Elementary School",
                address: "112 Rose Street, Bloomtown",
                latitude: 32.678,
                longitude: 63.789,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Silver Oak High",
                address: "223 Oak Street, Silver City",
                latitude: 32.432,
                longitude: 63.567,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Springfield Grammar School",
                address: "334 Elm Avenue, Springfield",
                latitude: 32.789,
                longitude: 63.333,
                createdAt: new Date(),
                updatedAt: new Date(),
            },

            {
                name: "Mountain View High School",
                address: "77 Hillcrest Ave, Redwood City",
                latitude: 36.2345,
                longitude: 67.3241,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Riverdale Academy",
                address: "450 Maple Dr, Riverbend",
                latitude: 35.6789,
                longitude: 66.8765,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Bright Horizon School",
                address: "250 Ocean Blvd, Coastline",
                latitude: 36.1205,
                longitude: 67.1023,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Greenwood International",
                address: "600 Countryside Ln, Meadowbrook",
                latitude: 35.9023,
                longitude: 66.6547,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "Summit Academy",
                address: "99 Peak St, Highland",
                latitude: 36.3456,
                longitude: 67.4567,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        return queryInterface.bulkInsert("Schools", schools);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("Schools", null, {});
    },
};

// npx sequelize-cli db:seed --seed file_name.js
