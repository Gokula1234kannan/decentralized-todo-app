import React from "react";
import "../App.css"; // Keep for any global styles or animations

const TaskItem = ({ task, index, toggleTask, deleteTask }) => {
  return (
    <div className="task-item flex items-center justify-between gap-4 p-4 mb-4 bg-white/10 backdrop-blur-md rounded-xl shadow-md border border-white/20 transition hover:shadow-xl">
      {/* Task Content */}
      <span
        className={`flex-grow text-black text-lg ${
          task.completed ? "line-through opacity-60" : ""
        }`}
      >
        {task.content}
      </span>

      {/* Toggle Done/Undo Button */}
      <button
        onClick={() => toggleTask(index)}
        className={`px-4 py-2 rounded-lg font-semibold text-sm hover:cursor-pointer active:scale-95 shadow-md transition-colors duration-300  ${
          task.completed
            ? "bg-yellow-500 hover:bg-yellow-600"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {task.completed ? "Undo" : "Done"}
      </button>

      {/* Delete Button */}
      <button
        onClick={() => deleteTask(index)}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition-all duration-300 hover:cursor-pointer active:scale-95 shadow-md"
      >
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
