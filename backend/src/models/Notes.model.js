import mongoose, {Schema} from 'mongoose';

const notesSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    fileUrl: {
        type: String,
        required: true,
        trim: true,
    },
    department: {
        type: String,
        //ref: "department",
    },
    semester: {
        type: String,
        //ref: "semester",
    },
    subject: {
        type: String,
        required: true,
    },
    module: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
}, {timestamps: true});

export const Notes = mongoose.model("notes", notesSchema);