import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import "./globals.css";

export default function Home() {
  return (
    <>
      <h1 className="title">Task List:</h1>
      <TaskList />
      <h1 className="title">Add a Task:</h1>
      <TaskForm />
    </>
  );
}
