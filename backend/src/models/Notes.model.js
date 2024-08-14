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
        type: Schema.Types.ObjectId,
        ref: "department",
    },
    semester: {
        type: Schema.Types.ObjectId,
        ref: "semester",
    },
    subject: {
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
    },
    semester: {
        type: Schema.Types.ObjectId,
        ref: "semester",
    },
}, {timestamps: true});

export const Notes = mongoose.model("notes", notesSchema);