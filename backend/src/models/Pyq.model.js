import mongoose, {Schema} from 'mongoose';

const pyqSchema = new Schema({
    year: {
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
        type: Schema.Types.ObjectId,
        ref: "subject",
        required: true,
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: "department",
        required: true,
    },
    semester: {
        type: String,
        required: true,
    }
}, {timestamps: true});

export const Pyq = mongoose.model("pyq", pyqSchema);