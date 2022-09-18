// * `username`
//   * String 🍦
//   * Unique 🍦
//   * Required 🍦
//   * Trimmed 🍦 ---- this may give us issues. https://www.mongodb.com/docs/manual/reference/operator/aggregation/trim/

const { Schema, model } = require('mongoose');
const Thought = require('./Thought');


const validateEmail = function(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};



const userSchema = new Schema(
    {
        username: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
                

            validate: {
                validator: validateEmail,
                // function(v) {
                //   return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
                
                message: "incorrect email"
            
            
            }
    },
    
        thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: Thought,
            },
          ],
          friends: [this],

    },


    {
        toJSON: {
          virtuals: true,
        },
        id: false,
      }
    );

    userSchema
    .virtual("friendCount")
    //getter
    .get(function() {
        return this.friends.length;
    });
    
    const User = model('user', userSchema);

    // const user = new User({
    //    username: "  abc",
    //    email: "mark@mail.com",
    //    thoughts: [],
    //    friends: []
    // })
    // console.log(user);
    // user.save();
    
    module.exports = User;    



