const sequelize = require("../../../config/database");
const AppError = require("../../utilities/appError");
const { Tasks } = require("./models")

const createTaskService = async (data) => {
    const transaction = await sequelize.transaction();
    try {
        const task = await Tasks.create(data, {
            returning: true,
            transaction: transaction,
        });

        await transaction.commit();
        return task;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

const fetchTasksService = async () => {
    try {
        const fetchedTasks = await Tasks.findAll({
            order : [['createdAt','ASC']],
            raw : true
        });
        
        return fetchedTasks;
    } catch (error) {
        console.error('Error in fetching tasks : ', error);
        throw(error)
    }
}

const updateTaskService = async (id, data) => {
    const transaction = await sequelize.transaction();
    try {
        const task = await Tasks.findOne({
            where: { id }
        });

        if (!task) {
            throw AppError('Task Not Exists in the Database!', 422, 'UnprocessableEntity');
        }

        const updateProperties = {};
        if (data?.title) {
            updateProperties.title = data.title;
        }

        if (data?.description) {
            updateProperties.description = data.description;
        }

        if (data?.status) {
            updateProperties.status = data.status;
        }

        // If no properties to update, return early
        if (Object.keys(updateProperties).length === 0) {
            await transaction.commit();
            return task;
        }

        const [affectedCount, [updatedTask]] = await Tasks.update(
            updateProperties,  // Directly use the updateProperties object
            {
                where: { id },  // Should be an object
                returning: true,
                transaction: transaction
            }
        );

        await transaction.commit();
        return updatedTask;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

const deleteTaskService = async (id) => {
    const transaction = await sequelize.transaction();
    try {
        const task = await Tasks.findOne({
            where: { id }
        });

        if (!task) {
            throw AppError('Task Not Exists in the Database!', 422, 'UnprocessableEntity');
        }

        const deletedTask = await Tasks.destroy({
            where: { id },
            ...(transaction && { transaction: transaction })
        });

        await transaction.commit();
        return deletedTask;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

module.exports = {
    createTaskService,
    fetchTasksService,
    updateTaskService,
    deleteTaskService
}