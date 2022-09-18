const { Schema, model } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        // default: () => new Types.ObjectId(),
    }, 
    reactionBody: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true
       },
    
}, {
    timeStamps: true,
})


const thoughtSchema = new Schema(
    {
       thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
        timeStamps: true
       },
       createdAt: {
        type: Date,
        default: Date.now
                   
       },
       username: {
        type: String,
        required: true
       },
       reactions: [reactionSchema],
     
    
    },


    );
   
    
    const Thought = model('thought', thoughtSchema);
    
// const thought = new Thought({
//     thoughtText: "yeah babes",
//     username: "mark",
//     reactions: [
//         {
//             reactionBody: "im your reaction body",
//             username: "probably your mother"
//         }
//     ]
    
// })
// console.log(thought);
// thought.save();

    module.exports = Thought;    



