import React from "react";

const Todo = ({ todo, onClick }) => {
  return (
    <>
      <div
        onClick={onClick}
        className={`max-w-[300px] p-6 border mr-4 border-gray-200 rounded-lg shadow ${
          !todo.completed ? "bg-[#E57373]" : "bg-[#81C784]"
        } dark:bg-gray-800 dark:border-gray-700`}
      >
        <div>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">
            Your Task: {todo?.text}
          </h5>
        </div>
        <p className="mb-3 font-normal text-white dark:text-gray-400">
          Task Status: {!todo.completed ? "Pending" : "Completed"}
        </p>
      </div>
    </>
  );
};

export default Todo;
