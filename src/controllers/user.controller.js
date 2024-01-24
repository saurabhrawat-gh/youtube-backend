import { asyncHandler } from '../utils/async-handler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { User } from '../models/user.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'

const registerUser = asyncHandler(async (req, res, next) => {
  /*
1: take all the necessary data from body and destructure them

2:check if the user is already exist in the db,
  by matching the email id or username( if unique )

3: if yes -> promt a message
   else -> save the user to the db
*/

  const { fullname, email, username, password } = req.body

  console.log({ fullname, email, username, password })
  if (Object.values(req.body).some((field) => field.trim() === ''))
    throw new ApiError(400, 'All fields are required!!')

  const userExist = User.findOne({
    $or: [{ username, email }],
  })

  if (userExist)
    throw new ApiError(409, 'User with this email or username, already exist')

  console.log({ filesData: req.files })
  const avatarLoacalPath = req.files?.avatar[0]?.path
  const coverImageLoacalPath = req.files?.coverImage[0]?.path

  if (!avatarLoacalPath) throw new ApiError(400, 'Avatar file is required!!')

  const avatar = await uploadOnCloudinary(avatarLoacalPath)
  const coverImage = await uploadOnCloudinary(coverImageLoacalPath)

  if (!avatar) throw new ApiError(400, 'Avatar file is required!!')

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || '',
    email,
    password,
    username: username.toLowerCase(),
  })

  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken'
  )
  if (!createdUser)
    throw new ApiError(500, 'Something went wrong while registering the user!!')

  return res
    .status(201)
    .json(ApiResponse(200, createdUser, 'User registered successfully!!'))
})

export { registerUser }
