import { ApiError } from "../../utils/ApiError.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { User } from "../../models/users.model.js";
import { generateAccessToken } from "./genrateAccessToken.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { loginSchema } from "../../validations/Schemas.js";
const userLogin = asyncHandler(async (req, res) => {
  const { error, value } = loginSchema.validate(req.body, {
    abortEarly: true,
  });

  if (error) {
    throw new ApiError(
      500,
      error.details.map((err) => err.message),
    );
  }
  req.body=value;
  const { email, password } = req.body;
  


  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, "Invaild username or password");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Password is incorrect");
  }
  console.log(user._id);

  const { accessToken } = await generateAccessToken(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password",
  );

  const options = {
    httpOnly: false, // Prevent client-side JavaScript access
    secure: false, // Set only for HTTPS connections (if applicable)
    // sameSite: "sameSit", // Allow sending with top-level navigations
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      httpOnly: true, // prevents JavaScript from accessing the cookie
      secure: false, // ensures the cookie is sent over HTTPS
      maxAge: 3600000, // sets the cookie expiry (in ms)
    })
    .json(
      new ApiResponse(
        200,
        { loggedInUser, accessToken },
        "user is logged in successfully",
      ),
    );
});

export { userLogin };
