import React, { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [task, setTask] = useState({ label: "", done: false });
  const [list, setList] = useState([]);

  const createUser = async () => {
    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([]),
    };
    const url = "https://assets.breatheco.de/apis/fake/todos/user/aparral2";
    const request = await fetch(url, settings);
    const json = await request.json();
    const user = json;
    console.log(user, "<-create a new user");
  };

  const createTask = async (e) => {
    e.preventDefault();
    getTask()
    console.log(list, task);
    setList([...list, task]);
    console.log(list);
    const url = "https://assets.breatheco.de/apis/fake/todos/user/aparral2";
    const request = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(list),
    });
    const json = await request.json();
    console.log(json);
    // const createTask = json
    // console.log(createTask, "<-update to do list")
    getTask();
  };
  const getTask = async () => {
    const settings = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = "https://assets.breatheco.de/apis/fake/todos/user/aparral2";
    const request = await fetch(url);
    const json = await request.json();
    // const getTask = json;
    console.log(json);
    setList(json);
    
  };

  const deleteUser = async () => {
    const settings = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = "https://assets.breatheco.de/apis/fake/todos/user/aparral2";
    const request = await fetch(url, settings);
    const json = await request.json();
    const deleteUser = json;
    console.log(deleteUser, "<-delete user and todos");
  };

 

  function deleteItem(index) {
    const filterTask = list.filter((item) => {
      return item !== list[index];
    });
    setList(filterTask);
    console.log("filterTask", filterTask);
  }

  // funcion que guarda el dato en el arreglo

  // function handlerSubmit(e) {
  //   e.preventDefault();
  //   setTask([...list, {label:e.target.value, done:false}]);
  //   createTask()
  // }
  //console.log(task);
  console.log(list);

  useEffect(() => {
    // createUser();
    // createTask()
    getTask();
    // deleteUser()
  }, []);

  return (
    <div className="container center">
      <h1>TO DO LIST</h1>
      <h2>{JSON.stringify(list)}</h2>

      <form onSubmit={(e) => createTask(e)}>
        <input
          placeholder="Nueva tarea"
          type="text"
          value={task.label}
          onChange={(e) => setTask({ label: e.target.value, done: false })}
        />
      </form>

      <ul>
        {Array.isArray(list) ? (
          list.map((item, index) => {
            return (
              <li key={index}>
                {item.label}
                <a onClick={() => deleteItem(index)}>X</a>
              </li>
            );
          })
        ) : (
          <h2>"No tasks"</h2>
        )}
      </ul>
    </div>
  );
}
export default App;
