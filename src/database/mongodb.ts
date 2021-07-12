import dbConfig from "../config/mongo";
import mongoose from "mongoose";
import Logger from "../helpers/logger";
import {handler as errorHandler} from "../helpers/error";

const initiateMongodb = async () => {
    try {
        await mongoose.connect(dbConfig.mongoUri, dbConfig.config);
    } catch(error) {
        errorHandler.handleError(error);
    }

    mongoose.connection.on('connected', () => {
        Logger.info(`Mongoose connection to ${dbConfig.mongoUri} successful`);
    });

    mongoose.connection.on('error', (err) => {
        Logger.error(`Mongoose connection error ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
        Logger.info("Mongoose connection disconnected")
    })
}

export default initiateMongodb;