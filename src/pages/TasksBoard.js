import React, { useState } from "react";
import TaskCard from "./components/TaskCard";
import "./TasksBoard.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TasksBoard = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      description: "task 1",
      status: "todo",
      dragId: "1",
    },
    {
      id: 2,
      description: "task 2",
      status: "inprogress",
      dragId: "2",
    },
    {
      id: 3,
      description: "task 3",
      status: "done",
      dragId: "3",
    },
  ]);

  const [taskStatus, setTaskStatus] = useState({
    todo: tasks.filter((task) => task.status === "todo"),
    inprogress: tasks.filter((task) => task.status === "inprogress"),
    done: tasks.filter((task) => task.status === "done"),
  });

  const AddNewCard = (e, status) => {
    e.preventDefault();
    const newTask = {
      id: taskStatus[status].length + 1,
      description: e.target.value,
      status: status,
      dragId: String(taskStatus[status].length + 1),
    };

    setTaskStatus((prevStatus) => ({
      ...prevStatus,
      [status]: [...prevStatus[status], newTask],
    }));
  };

  const handleDeleteTask = (status, taskId) => {
    const updatedTasks = taskStatus[status].filter((task) => task.id !== taskId);
    setTaskStatus((prevStatus) => ({
      ...prevStatus,
      [status]: updatedTasks,
    }));
  };

  const handleDeleteBoard = (boardName) => {
    const updatedTaskStatus = { ...taskStatus };
    delete updatedTaskStatus[boardName];
    setTaskStatus(updatedTaskStatus);
  };

  const handleAddBoard = () => {
    const newBoardName = prompt("Enter a new board name:");
    if (newBoardName) {
      setTaskStatus((prevStatus) => ({
        ...prevStatus,
        [newBoardName]: [],
      }));
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const sourceItems = Array.from(taskStatus[source.droppableId]);
    const destItems = Array.from(taskStatus[destination.droppableId]);
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    setTaskStatus((prevStatus) => ({
      ...prevStatus,
      [source.droppableId]: sourceItems,
      [destination.droppableId]: destItems,
    }));
  };

  return (
    <div className="tasks">
      {Object.keys(taskStatus).length === 0 && (
        <div className="add-board">
          <button onClick={handleAddBoard}>Add New Board</button>
        </div>
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.keys(taskStatus).map((boardName, index) => (
          <div className={`stages ${boardName.replace(" ", "-")}`} key={index}>
            <h3>{boardName}</h3>
            <Droppable droppableId={boardName} type="PERSON">
              {(provided, snapshot) => (
                <>
                  <div
                    className="tasks-list"
                    ref={provided.innerRef}
                    style={{
                      backgroundColor: snapshot.isDraggingOver
                        ? "white"
                        : "white",
                    }}
                    {...provided.droppableProps}
                  >
                    {taskStatus[boardName].map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard
                              title={task.title}
                              description={task.description}
                              onDelete={() => handleDeleteTask(boardName, task.id)}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                  <input
                    className="input"
                    type="text"
                    placeholder="Add a card"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        AddNewCard(e, boardName);
                      }
                    }}
                  />
                  {provided.placeholder}
                </>
              )}
            </Droppable>
            <div className="button-container">
              <button onClick={() => handleDeleteBoard(boardName)}>Delete Board</button>
            </div>
          </div>
        ))}
      </DragDropContext>
      {Object.keys(taskStatus).length > 0 && (
        <div className="add-board">
          <button onClick={handleAddBoard}>Add New Board</button>
        </div>
      )}
    </div>
  );
};

export default TasksBoard;
