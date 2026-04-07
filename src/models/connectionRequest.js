const { default: mongoose } = require("mongoose");
const mangoose = require("mongoose");

const connectionRequestSchema = new mangoose.Schema(
{
    fromConnectionId : {
        type : mangoose.SchemaTypes.ObjectId
    },
    toConnectionId : {
        type : mangoose.SchemaTypes.ObjectId
    },
    status :{
        type : [String]
    }
},
{
    timestamps:true
}
)

connectionRequestSchema.index({ fromConnectionId: 1, toConnectionId: 1 });

module.exports = mongoose.model("Connection", connectionRequestSchema)
