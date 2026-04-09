import { User } from "../../models/users.model.js";
import { ApiError } from "../../utils/ApiError.js";
const generateAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);
   
    const accessToken = await user.generateAccessToken();
  
   
   await  user.save({validateBeforeSave:false})
    return { accessToken };
  } catch (error) {
    throw new ApiError(500, "something went wrong wihle genreting tokens", error);
  }
};

export {generateAccessToken}
