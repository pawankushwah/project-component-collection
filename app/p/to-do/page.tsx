"use client";
import {
  faEllipsisV,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, ChangeEvent, FormEvent, MouseEvent } from "react";

type tasksType = {
  id: number;
  title: string;
};

type toDoDataType = {
  categories: {
    [key: string]: tasksType[];
  };

  getCategories: string[];
  totalTasks: number;

  addTask: (
    category: string,
    dataObject: {
      id: number;
      title: string;
    }
  ) => void;

  deleteTask: (
    category: string,
    dataObject: {
      id: number;
    }
  ) => void;

  updateTask: (
    category: string,
    dataObject: {
      id: number;
      title: string;
    }
  ) => void;
};

const toDoData: toDoDataType = {
  categories: {
    default: [],
    finished: [],
    personal: [],
    shopping: [],
    wishlist: [],
    work: [],
  },

  get totalTasks() {
    let totalTasks = 0;
    for (const key in this.categories) {
      totalTasks += this.categories[key as keyof typeof this.categories].length;
    }
    return totalTasks;
  },

  get getCategories() {
    return Object.keys(this.categories);
  },

  addTask: function (
    category: string,
    dataObject: { id: number; title: string }
  ) {
    if (this.getCategories.includes(category.toLowerCase())) {
      this.categories[category as keyof typeof this.categories].unshift(
        dataObject
      );
    }
  },

  updateTask: (
    category: string,
    dataObject: { id: number; title: string }
  ) => {
    console.log("updated Task....");
  },

  deleteTask: function (category: string, dataObject: { id: number }) {
    if (this.getCategories.includes(category.toLowerCase())) {
      const newDataArray = this.categories[
        category as keyof typeof this.categories
      ].filter((e) => e.id !== dataObject.id);
      this.categories[category as keyof typeof this.categories] = newDataArray;
    }
    console.log(this.categories[category as keyof typeof this.categories]);
  },
};

export default function ToDo() {
  const [dataToShowFrom, setDataToShowFrom] = useState<tasksType[]>(
    toDoData.categories.default
  );
  const [addTaskField, setAddTaskField] = useState<string>("");
  const [currentTaskCategory, setCurrentTaskCategory] = useState("default");

  function addTask(
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) {
    // console.log(e);
    e.preventDefault();

    // returning if addTaskField.current.value is ""
    if (addTaskField.trim() === "") return;

    // UI updation
    // getting the id for next task
    let id = 1;
    if (dataToShowFrom.length > 0) id = dataToShowFrom[0].id + 1;
    let newData = {
      id: id,
      title: addTaskField,
    };
    setDataToShowFrom([newData, ...dataToShowFrom]);
    setAddTaskField("");
    // changing main Data (can be database)
    toDoData.addTask(currentTaskCategory, newData);
  }

  function deleteTask(id: number) {
    const newDataToShowFrom = [...dataToShowFrom].filter((e) => e.id !== id);
    setDataToShowFrom(newDataToShowFrom);
    toDoData.deleteTask(currentTaskCategory, { id });
  }

  function handleTaskCategoryChange(e: ChangeEvent<HTMLSelectElement>) {
    setCurrentTaskCategory(e.target.value);
    setDataToShowFrom(toDoData.categories[e.target.value]);
  }

  return (
    <div className="flex justify-center min-h-screen p-2">
      <div className="flex flex-col max-h-[97vh] rounded-lg w-full overflow-auto">
        {/* Navbar */}
        <div className="flex justify-between items-center px-2">
          <span className="text-xl">ToDo</span>
          <span>
            <select
              className="rounded-lg p-1 bg-gray-900 hover:bg-gray-800 outline-none cursor-pointer"
              value={currentTaskCategory}
              onChange={handleTaskCategoryChange}
            >
              {/* <option>All Tasks ({toDoData.totalTasks})</option> */}
              <option value="finished">
                Finished ({toDoData.categories.finished.length})
              </option>
              <option value="default">
                Dafault ({toDoData.categories.default.length})
              </option>
              <option value="personal">
                Personal ({toDoData.categories.personal.length})
              </option>
              <option value="shopping">
                Shopping ({toDoData.categories.shopping.length})
              </option>
              <option value="wishlist">
                Wishlist ({toDoData.categories.wishlist.length})
              </option>
              <option value="work">
                Work ({toDoData.categories.work.length})
              </option>
              {/* <option>New List</option> */}
            </select>
          </span>
          {/* <span>
            <FontAwesomeIcon
              icon={faSearch}
              className="w-5 p-2 hover:bg-gray-800 rounded-lg cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faEllipsisV}
              className="w-5 p-2 hover:bg-gray-800 rounded-lg cursor-pointer"
            />
          </span> */}
        </div>

        {/* Add To Do Module */}
        <form className="flex gap-x-2 p-2" onSubmit={addTask}>
          <input
            type="text"
            placeholder="Add you new Task here"
            className="w-full p-2 rounded-lg outline-none"
            value={addTaskField}
            onChange={(e) => setAddTaskField(e.target.value)}
            autoFocus
          />
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-600 disabled:bg-purple-900 disabled:hover:bg-purple-900 p-2 rounded-lg w-8 h-full aspect-square cursor-pointer"
            onClick={addTask}
            disabled={addTaskField.length === 0 ? true : false}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </form>

        {dataToShowFrom.length === 0 && (
          <div className="text-center py-2">Create your first To Do</div>
        )}

        <div className="py-2 space-y-2 overflow-y-auto z-0">
          {dataToShowFrom.map((e) => {
            return (
              <div
                className="relative bg-gray-600 p-2 rounded-lg hover:bg-gray-500 overflow-hidden w-full flex"
                key={e.id}
                // onClick={update}
              >
                <input
                  type="checkbox"
                  className="mx-2 cursor-pointer scale-150"
                  onChange={() => deleteTask(e.id)}
                />
                <label>
                  <span>{e.title}</span>
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
