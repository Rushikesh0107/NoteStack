import mongoose, {Schema} from 'mongoose';

const departmentSchema = new Schema({
    departmentName: {
        type: String,
        required: true,
        unique: true,
    },
}, {timestamps: true});

export const Department = mongoose.model("department", departmentSchema);