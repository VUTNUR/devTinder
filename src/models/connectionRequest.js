const { default: mongoose } = require("mongoose");
const mangoose = require("mongoose");

const connectionRequestSchema = new mangoose.Schema(
{
    fromConnectionId : {
        type : mangoose.SchemaTypes.ObjectId,
        required: true,
        ref:"User"
    },
    toConnectionId : {
        type : mangoose.SchemaTypes.ObjectId,
        required: true,
        ref :"User"
    },
    status :{
        type : String,
        required: true,
        enum: ["interested", "notInterested", "accepted", "rejected"],
    }
},
{
    timestamps:true
}
)

connectionRequestSchema.index({ fromConnectionId: 1, toConnectionId: 1 });

module.exports = mongoose.model("Connection", connectionRequestSchema)
