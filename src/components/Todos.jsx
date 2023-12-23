import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import { IoIosSearch } from "react-icons/io";

const Todos = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([]);

  //getting search input
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  //getting todo input
  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  //fetching data from localstorage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos && Array.isArray(storedTodos) && storedTodos.length > 0) {
      setTodos(storedTodos);
      setFilteredTodos(storedTodos);
    }
  }, []);

  // Runs whentodos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //adding new Todos
  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTodo.trim() !== "") {
      const todo = { text: newTodo, completed: false, id: Date.now() };
      setTodos([todo, ...todos]);
      setFilteredTodos([todo, ...todos]);
      setNewTodo("");
    }
  };

  //mark as complete
  const handleToggleComplete = (todoId) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId && !todo.completed
          ? { ...todo, completed: true }
          : todo
      )
    );
  };

  //adding search functionality
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    if (searchQuery.trim() === "") {
      setFilteredTodos(todos);
    } else {
      const newFilteredTodos = todos.filter((todo) =>
        todo.text.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredTodos(newFilteredTodos);
    }
  }, [searchQuery, todos]);

  return (
    <>
      <div className="mt-[100px] ">
      

        <form className="mb-8 mx-4 md:mx-auto md:w-1/2 lg:w-[50%]" onSubmit={handleSubmit}>
  <label
    htmlFor="default-search"
    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
  >
    Add Todo
  </label>
  <div className="relative">
    <input
      type="search"
      id="default-search"
      className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Add Todo"
      value={newTodo}
      onChange={handleInputChange}
      required
    />
    <button
      type="submit"
      className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      ADD
    </button>
  </div>
</form>

<div className="mb-8 mx-4 md:mx-auto md:w-1/2 lg:w-[20%]">
          <form className="flex items-center">
            <input
              type="search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Todo Here"
              value={searchQuery}
              onChange={handleSearch}
              required
            />
            <IoIosSearch size={22} className="-ml-[30px]"/>
          </form>
        </div>


        <div className="flex flex-wrap ml-[15%] mr-[15%] max-w-[70%]">
          {filteredTodos
            .sort((a, b) =>
              a.completed === b.completed ? 0 : a.completed ? 1 : -1
            )
            .map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                onClick={() => handleToggleComplete(todo.id)}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Todos;
