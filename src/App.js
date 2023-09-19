import React from "react";
import TasksBoard from "./pages/TasksBoard";
import Navbar from "./Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <TasksBoard />
    </div>
  );
};

export default App;
