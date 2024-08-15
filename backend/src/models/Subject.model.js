import mongoose, {Schema} from "mongoose";

const subjectSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: "department",
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
}, {timestamps: true});

export const Subject = mongoose.model("subject", subjectSchema);