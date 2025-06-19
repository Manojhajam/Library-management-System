import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
    enum: ['Admin', 'Staff', 'Member'],
    default: 'Member'
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

export const UserModel = mongoose.model("users", userSchema);
