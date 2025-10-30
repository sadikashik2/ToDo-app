import React, { useState } from "react";
import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import delete_icon from "../assets/delete.png";
import edit_icon from "../assets/edit.png";

const ToDoItems = ({ text, id, isComplete, deleteTodo, toggle, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(text);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (newText.trim() !== "") {
      editTodo(id, newText);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setNewText(text);
    setIsEditing(false);
  };

  return (
    <div
      className={`flex flex-col gap-3 my-4 bg-gray-50 rounded-2xl px-4 py-3 shadow-sm transition-all duration-300 hover:shadow-md`}
    >
     
      {!isEditing && (
        <div className="flex items-center justify-between">
          <div
            className="flex items-center flex-1 cursor-pointer"
            onClick={() => toggle(id)}
          >
            <img
              src={isComplete ? tick : not_tick}
              alt="tick"
              className="w-7 transition-transform duration-200 hover:scale-110"
            />
            <p
              className={`ml-4 text-[18px] font-medium ${
                isComplete
                  ? "line-through text-gray-400"
                  : "text-gray-800"
              }`}
            >
              {text}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <img
              src={edit_icon}
              alt="edit"
              title="Edit"
              onClick={handleEditClick}
              className="w-5 cursor-pointer hover:scale-110 transition-transform duration-200 hover:brightness-125"
            />
            <img
              src={delete_icon}
              alt="delete"
              title="Delete"
              onClick={() => deleteTodo(id)}
              className="w-4 cursor-pointer hover:scale-110 transition-transform duration-200 hover:brightness-125"
            />
          </div>
        </div>
      )}

    
      {isEditing && (
        <div className="flex flex-col items-start gap-3">
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="w-full h-14 text-lg px-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none bg-white text-gray-800 transition-all duration-200"
            placeholder="Edit your task..."
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
          />

          <div className="flex gap-3 self-end">
            <button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-medium transition-all duration-200"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-lg font-medium transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToDoItems;
