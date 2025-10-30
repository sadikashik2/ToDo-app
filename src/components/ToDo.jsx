import React, { useEffect, useRef, useState } from "react";
import todo_icon from "../assets/todo_icon.png";
import ToDoItems from "./ToDoItems";

const ToDo = () => {


  const [todolist, setTodolist] = useState(localStorage.getItem("todos")? JSON.parse(localStorage.getItem("todos")):[]);
  const inputRef = useRef();
  const add = () => {
    const inputText = inputRef.current.value.trim();

    if(inputText===""){
      return null;
    }
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    setTodolist((prev)=>[...prev,newTodo]); //spread operatior using to create array list
    inputRef.current.value="";
  };

  const deleteTodo=(id)=>{
    setTodolist(
      (prevTodos)=>{
       return prevTodos.filter(
          (todo)=>todo.id!==id
        )
      }
    )
  }

 const editTodo = (id, newText) => {
  setTodolist((prevTodos) =>
    prevTodos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: newText };
      }
      return todo;
    })
  );
};



   const toggle=(id)=>{
    setTodolist(
        (prevTodos)=>{
            return prevTodos.map((todo)=>{
                if(todo.id===id){
                    return {...todo, isComplete: !todo.isComplete}
                }
                return todo;
            })
        }
    )
   }

   useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todolist))
   },[todolist])

  return (
    <div className="bg-stone-300 place-self-center w-md max-w-11/12 min-h-[550px] p-7 rounded-2xl flex flex-col">
      {/* ----------title-------- */}

      <div className="flex items-center mt-7 gap-2" onClick={()=>{toggle(id)}}>
        <img className="w-8" src={todo_icon} alt="" />
        <h1 className="text-3xl font-semibold">To-Do List</h1>
      </div>

      {/* ----------input Box-------- */}

      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          type="text"
          placeholder="Add your task"
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          ref={inputRef}
          onKeyDown={(e) => {
      if (e.key === "Enter") add(); // Add on Enter
    }}
        />
        <button
          onClick={add}
          className="bg-gray-400 h-14 w-32 rounded-full text-white cursor-pointer border-none text-lg font-medium hover:bg-gray-500 hover: border-2 hover:border-solid"
        >
          Add +
        </button>
      </div>

      {/* ----------todo list-------- */}

      <div className="flex-1 overflow-y-auto max-h-[350px] scrollbar-thin">
        {todolist.map((item,index)=>{
            return <ToDoItems
                key={index}
                text={item.text}
                id={item.id}
                isComplete={item.isComplete}
                deleteTodo={deleteTodo}
                toggle={toggle}
                editTodo={editTodo}
            
            ></ToDoItems>
        })}
      </div>
    </div>
  );
};

export default ToDo;
