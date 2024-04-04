"use client"
import { FormEvent, useState } from "react";

export default function TaskForm() {

    const [submittedTask, setTask] = useState({
        taskTitle: "",
        taskDetails: ""
    });

    const [errors, setErrors] = useState({
        taskTitle: "",
        taskDetails: ""
    });

    const createTask = async (event: FormEvent) => {
        event.preventDefault();
        const response = await fetch("/api/tasks/", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify(submittedTask)
        });
        const body = await response.json();
        if (body.errors) {
            setErrors(body.errors);
        } else {
            clearForm();
            clearErrors();
        }
    }

    const clearForm = () => {
        setTask({
            taskTitle: "",
            taskDetails: ""
        });
    }

    const clearErrors = () => {
        setErrors({
            taskTitle: "",
            taskDetails: ""
        });
    }

    const onInputChange = (event: any) => {
        setTask({ ...submittedTask, [event.currentTarget.name]: event.currentTarget.value });
    }

    return (
        <form onSubmit={createTask} className="task-form">
            <label htmlFor="taskTitle">
                Title: 
                <input
                    type="text"
                    name="taskTitle"
                    id="taskTitle"
                    value={submittedTask.taskTitle}
                    onChange={onInputChange}
                />
                {errors.taskTitle}
            </label>
            <label htmlFor="taskDetails">
                Details: 
                <input
                    type="text"
                    name="taskDetails"
                    id="taskDetails"
                    value={submittedTask.taskDetails}
                    onChange={onInputChange}
                />
                {errors.taskDetails}
            </label>
            <input type="submit" value="Create" />
        </form>
    );
}