"use client"
import { useEffect, useState } from "react";
import TaskTile from "./TaskTile";

export default function TaskList() {
    const [tasks, setTasks] = useState<any[]>([]);

    async function getTasks() {
        const response = await fetch("/api/tasks/");
        const body = await response.json();
        const taskList = body.tasks;
        setTasks(taskList);
    }

    useEffect(() => {
        getTasks();
    }, [tasks]);

    const listOfTasks = tasks.map((task) => {
        return <TaskTile key={task.id} taskId={task.id} taskTitle={task.title} taskDetails={task.details} />
    });

    return (
        <div className="task-list">
            {listOfTasks}
        </div>
    );
}