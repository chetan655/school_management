const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const { StatusCodes } = require("http-status-codes");
const { School } = require("../models");
const { where } = require("sequelize");
const { Sequelize, Op } = require("sequelize");

// ----------------------------- addSchool -----------------------------

const addSchool = asyncHandler(async (req, res, next) => {
    // get data
    // check for empty or null fields
    // check for valid longitude and latitude
    // check if school already exists
    // create school
    const { name, address, longitude, latitude } = req.body;

    // console.log("first", req.body);

    if (
        [name, address, longitude, latitude].some(
            (i) =>
                i?.trim() === undefined ||
                null ||
                (typeof i === "string" && i?.trim() === ""),
        )
    ) {
        return next(
            new ApiError(StatusCodes.BAD_REQUEST, "All fields are required."),
        );
    }

    const parsedLongitude = parseFloat(longitude);
    const parsedLatitude = parseFloat(latitude);

    if (isNaN(parsedLongitude) || isNaN(parsedLatitude)) {
        return next(
            new ApiError(
                StatusCodes.BAD_REQUEST,
                "Longitude and latitude must be valid numbers.",
            ),
        );
    }

    if (parsedLongitude < -180 || parsedLongitude > 180) {
        return next(
            new ApiError(
                StatusCodes.BAD_REQUEST,
                "Longitude must be between -180 and 180.",
            ),
        );
    }
    if (parsedLatitude < -90 || parsedLatitude > 90) {
        return next(
            new ApiError(
                StatusCodes.BAD_REQUEST,
                "Latitude must be between -90 and 90.",
            ),
        );
    }

    const existingSchool = await School.findOne({
        where: { name, address },
    });

    if (existingSchool) {
        return next(
            new ApiError(StatusCodes.BAD_REQUEST, "School already exists."),
        );
    }

    const newSchool = await School.create({
        name,
        address,
        longitude: parsedLongitude,
        latitude: parsedLatitude,
    });

    // if newSchool returns as null
    if (!newSchool) {
        return next(
            new ApiError(StatusCodes.BAD_REQUEST, "unable to create school."),
        );
    }

    res.status(StatusCodes.CREATED).json({
        success: true,
        message: "School created successfully.",
        data: newSchool,
    });
});

// ------------------------------listSchools ------------------------------

const listSchools = asyncHandler(async (req, res, next) => {
    // take data
    // convert to correct d-types
    // validate long and lat
    // updating userRadius dynamically
    const {
        latitude,
        longitude,
        radius = 100,
        limit = 10,
        page = 1,
    } = req.query;

    const userLongitude = parseFloat(longitude);
    const userLatitude = parseFloat(latitude);
    const userRadius = parseFloat(radius);
    const pageLimit = parseInt(limit);
    const userPage = parseInt(page);
    const pageOffset = (userPage - 1) * pageLimit;

    if (isNaN(userLongitude) || isNaN(userLatitude)) {
        return next(
            new ApiError(
                StatusCodes.BAD_REQUEST,
                "Provide valid longitude and latitude.",
            ),
        );
    }

    if (userLongitude < -180 || userLongitude > 180) {
        return next(
            new ApiError(
                StatusCodes.BAD_REQUEST,
                "Longitude must be between -180 and 180.",
            ),
        );
    }
    if (userLatitude < -90 || userLatitude > 90) {
        return next(
            new ApiError(
                StatusCodes.BAD_REQUEST,
                "Latitude must be between -90 and 90.",
            ),
        );
    }

    let schools = [];

    for (let i = userRadius; i < 1000; i += 100) {
        const distanceQuery = Sequelize.literal(`
            (6371 * acos(
                cos(radians(${userLatitude})) * cos(radians(latitude)) *
                cos(radians(longitude) - radians(${userLongitude})) +
                sin(radians(${userLatitude})) * sin(radians(latitude))
            ))
        `);

        schools = await School.findAll({
            attributes: [
                "id",
                "name",
                "address",
                "longitude",
                "latitude",
                [distanceQuery, "distance"], // Calculated distance
            ],
            where: Sequelize.where(distanceQuery, { [Op.lte]: i }),
            order: [[distanceQuery, "ASC"]],
            limit: pageLimit,
            offset: pageOffset,
        });

        // console.log("interation", i, schools.length);

        if (schools.length > 0) {
            return res.status(StatusCodes.OK).json({
                success: true,
                message: "Schools found.",
                data: schools,
            });
        }
    }

    if (schools === null || schools.length === 0) {
        return next(new ApiError(StatusCodes.NOT_FOUND, "No schools found."));
    }
});

module.exports = {
    addSchool,
    listSchools,
};
