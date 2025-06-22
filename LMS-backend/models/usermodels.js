import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Joi from "joi";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: String,
  role: {
    type: String,
    enum: ["Admin", "Staff", "Member"],
    default: "Member"
  }
});

//compare password with hashpassword for decryption
userSchema.method("isPasswordValid", async function(password) {
  const hashedPassword = this.password;
  const result = await bcrypt.compare(password, hashedPassword);
  return result;
});

userSchema.pre("save", async function() {
  const password = this.password;

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  const hashedPassword = await bcrypt.hash(password, salt);

  this.password = hashedPassword;
});

export const validateUserSchema = Joi.object({
         name: Joi.string().min(3).max(100).required().messages({
           "string.empty": "Please enter a valid Name",
           "string.min": "Name must be larger",
           "any.max": "Please enter a valid Name"
         }),
         email: Joi.string().email().required().messages({
           "string.email": "Please enter a valid Email",
           "string.empty": "Email cannot be empty",
           "any.required": "Email is required"
         }),
         password: Joi.string()
           .pattern(
             /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]{8,30}$/
           )
           .required()
           .messages({
             "string.pattern.base":
               "Password must be 8-30 characters and contain valid characters",
             "string.empty": "Password cannot be empty",
             "any.required": "Password is required"
           }),
         phoneNumber: Joi.string()
           .pattern(
             /^\+?\d{1,3}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}$/
           )
           .required()
           .messages({
             "string.pattern.base": "Please enter a valid Phone Number",
             "string.empty": "Phone Number cannot be empty",
             "any.required": "Phone Number is required"
           }),
         address: Joi.string().optional()
       });

export const UserModel = mongoose.model("users", userSchema);
