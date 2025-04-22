const catchAsync = require('../../utilities/catchAsync');
const { success, failure } = require("../../utilities/responseHandler");
const { createTaskService, fetchTasksService, updateTaskService, deleteTaskService } = require('./services');

exports.createTask = catchAsync(async (req, res, next) => {
    try {
        const { data } = req.body;
        const createdTask = await createTaskService(data);
        res.json(success(createdTask, "Task Created Successfully!"))
    }  catch (error) {
        res.json(failure(error, error?.message))
    }
});

exports.fetchTasks = catchAsync(async (req, res, next) => {
    try {
        const { searchFor, filter } = req?.query;
        const fetchedTasks = await fetchTasksService(searchFor, filter);
        res.json(success(fetchedTasks, "Tasks Fetched Successfully!"))
    } catch (error) {
        res.json(failure(error, error?.message))
    }
});

exports.updateTask = catchAsync(async (req, res, next) => {
    try {
        const { id } = req?.params;
        const { data } = req.body;
        const updatedTask = await updateTaskService(id, data);
        res.json(success(updatedTask, 'Task Updated Successfully'))
    } catch (error) {
        res.json(failure(error, error?.message))
    }
});

exports.deleteTask = catchAsync(async (req, res, next) => {
    try {
        const { id } = req?.params;
        const deletedTask = await deleteTaskService(id);
        res.json(success(deletedTask, 'Task Deleted Successfully'))
    } catch (error) {
        res.json(failure(error, error?.message))
    }
});