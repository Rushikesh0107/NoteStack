import mongoose, {Schema} from 'mongoose';

const semesterSchema = new Schema({
    semesterNumber: {
        type: Number,
        required: true,
        unique: true,
    },
}, {timestamps: true});

export const Semester = mongoose.model("semester", semesterSchema);