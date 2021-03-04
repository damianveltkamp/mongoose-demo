import mongoose from 'mongoose'

const schema = mongoose.Schema
mongoose.set('useCreateIndex', true)


const cluster_schema = new schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email field is required'],
  },
  gender: {
    type: String,
    required: [true, 'Is required']
  }
})

export default mongoose.model('users', cluster_schema)
