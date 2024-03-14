import { Context } from "hono";
import { isValidObjectId } from "mongoose";

const validateId =

    (context: Context) => {
        const id = context.req.param("id");

        if (!isValidObjectId(id)) {
            return context.text("Invalid ID", 400);
        }
    };


export default validateId;
