import { Task } from "../../models/task.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { taskSchema, updateSchema } from "../../validations/Schemas.js";

export const createTask = asyncHandler(async (req, res) => {
  // console.log(req.user)
  const { error, value } = taskSchema.validate(req.body, {
    abortEarly: true,
  });

  if (error) {
    throw new ApiError(
      500,
      error.details.map((err) => err.message),
    );
  }

  console.log(req.user._id);

  console.log(req.body);
  req.body = value;
  const { title, description, status, dueDate, category } = req.body;

  console.log({ title, description, status, dueDate, category });

  const newTask = await Task.create({
    title,
    description,
    category,
    dueDate,
    status,
    user_id: req.user._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(201, newTask, "task added sucusfully!"));
});

//  get Task

export const getAllTask = asyncHandler(
  asyncHandler(async (req, res) => {
    // console.log(req.user._id)

    const allTasks = await Task.find({ user_id: req.user._id });

    // console.log(allTasks)

    return res
      .status(200)
      .json(new ApiResponse(200, allTasks, "tasks send successfully"));
  }),
);

export const deleteTask = asyncHandler(async (req, res) => {
  const { task_id } = req.body;

  if (!task_id) {
    throw new ApiError(500, "task_id is required");
  }

  const deletedTask = await Task.findByIdAndDelete(task_id);

  if (!deleteTask) {
    throw new ApiError(500, "something went wrong try again");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deletedTask, "task deleted succussfully"));
});

export const deleteMultipleTasks = asyncHandler(async (req, res) => {
  const { taskIds } = req.body;

  if (!taskIds || taskIds.length === 0) {
    throw new ApiError(400, "No task IDs provided");
  }

  await Task.deleteMany({
    _id: { $in: taskIds },
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    message: "Tasks deleted successfully",
  });
});

export const updateTask = asyncHandler(async (req, res) => {
  const { error, value } = updateSchema.validate(req.body, {
    abortEarly: true,
  });

  if (error) {
    throw new ApiError(
      500,
      error.details.map((err) => err.message),
    );
  }

  // console.log(req.user._id);

  // console.log(req.body);
  req.body = value;
  const { title, description, status, task_id } = req.body;

  const task = await Task.findById(task_id);

  console.log(task);
  if (task.user_id.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized to update this task");
  }

  // update only provided fields
  if (title) task.title = title;
  if (description) task.description = description;
  if (status) task.status = status;

  const updatedTask = await task.save();

  res.status(200).json(new ApiResponse(200,
    updatedTask,"Task updated successfully"))
});

export const getTasksByCategory = asyncHandler(async (req, res) => {
  const { category } = req.query; // e.g. ?category=work

  const filter = {
    user: req.user._id, 
  };

  
  if (category) {
    const categories = category.split(",");
    filter.category = { $in: categories };
  }

  const tasks = await Task.find(filter);

  res.status(200).json(new ApiResponse(200,tasks,"task updated"));
});
