const { Schema, model } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        // default: () => new Types.ObjectId()
    }, 
    reactionBody: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
        timeStamps: true
    },
    username: {
        type: String,
        required: true
       },
    
    
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
    


    module.exports = Thought;    



