import mongoose, {Schema} from 'mongoose';

const pyqSchema = new Schema({
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
    subject: {
        type: String,
        required: true,
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: "department",
    },
    semester: {
        type: Schema.Types.ObjectId,
        ref: "semester",
    },
    verified: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});

export const Pyq = mongoose.model("pyq", pyqSchema);