
import { useState } from "react";

const TaskForm = ({ existingTask = {}, updateCallback }) => {
    const [taskName, setTaskName] = useState(existingTask.taskName || "");

    const updating = Object.entries(existingTask).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            taskName
        }
        const url = "http://127.0.0.1:5000/" + (updating ? `update_task/${existingTask.id}` : "create_task")
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            updateCallback()
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="taskName">Task Name:</label>
                <input
                    type="text"
                    id="taskName"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                />
            </div>
            <button type="submit">{updating ? "Update" : "Create"}</button>
        </form>
    );
};

export default TaskForm
