import mongoose, {Schema} from "mongoose";
import { title } from "process";
import { MdDescription } from "react-icons/md";


const docSchema = new Schema({
    title: String,
    description: String,
    },
    {
        timestamps: true,
    }

);

const Document = mongoose.models.Document || mongoose.model("Document", docSchema);

export default Document;