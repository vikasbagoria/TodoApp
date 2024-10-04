import React , {useState} from 'react';


const isToday = (date) => {
  const today = new Date();
  const taskDate = new Date(date);
  return (
    taskDate.getDate() === today.getDate() &&
    taskDate.getMonth() === today.getMonth() &&
    taskDate.getFullYear() === today.getFullYear()
  );
};


const isWithinNext7Days = (date) => {
  const today = new Date();
  const taskDate = new Date(date);
  const differenceInTime = taskDate.getTime() - today.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  
  return differenceInDays > 0 && differenceInDays <= 7;
};


const Inbox = ({tasks, setTasks}) => {
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");

  const addTask = () => {
    const task = { description: newTask, dueDate: dueDate };
    setTasks([...tasks, task]);
    setNewTask("");
    setDueDate("");
    console.log(tasks)
  };

  return (
    <div>
      <h2>Inbox</h2>
      <form>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter task description"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button type="button" onClick={addTask}>Add Task</button>
        <button type="button">Cancel</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.description} - {task.dueDate}</li>
        ))}
      </ul>
    </div>
  );
};


const Today = ({ tasks }) => {
  const todayTasks = tasks.filter(task => isToday(task.dueDate));
  console.log(tasks);
  console.log(todayTasks);
  return (
    <div>
      <h2>Today's Tasks</h2>
      <ListRender list={todayTasks} />
    </div>
  );
};


const Next7Days = ({ tasks }) => {
  const next7DaysTasks = tasks.filter(task => isWithinNext7Days(task.dueDate));
  return (
    <div>
      <h2>Tasks for Next 7 Days</h2>
      <ListRender list={next7DaysTasks} />
    </div>
  );
};


const ListRender = ({ list }) => {
  return (
    <ul>
      {list.map((task, index) => (
        <li key={index}>{task.description} - {task.dueDate}</li>
      ))}
    </ul>
  );
};


const SideNav = () => {
  const [activeComponent, setActiveComponent] = useState("inbox");
  var [tasks, setTasks] = useState([]); 

  const handleNavClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div>
      <button onClick={() => handleNavClick("inbox")}>Inbox</button>
      <button onClick={() => handleNavClick("today")}>Today</button>
      <button onClick={() => handleNavClick("next7days")}>Next 7 Days</button>

      {activeComponent === "inbox" && <Inbox setTasks={setTasks} tasks={tasks} />}
      {activeComponent === "today" && <Today tasks={tasks} />}
      {activeComponent === "next7days" && <Next7Days tasks={tasks} />}
    </div>
  );
};


const App = () => {
  return (
    <div>
      <SideNav />
    </div>
  );
};

export default App;
