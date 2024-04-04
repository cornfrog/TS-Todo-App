type Task = {
    taskId: number
    taskTitle: string,
    taskDetails: string,
}

export default function TaskTile(props: Task) {
    
    const deleteTask = async () => {
        const taskID = props.taskId;
        const response = await fetch(`/api/tasks/`, {
            method: "DELETE",
            headers: new Headers({ "Content-Type": "application/json" }),
            body: JSON.stringify({taskID})
        })
    }

    return (
        <p onClick={deleteTask} className="task">{props.taskTitle} - {props.taskDetails}</p>
    );
}