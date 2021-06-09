import {useEffect, useState} from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import axios from 'axios'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  //   {
  //     id: 1,
  //     text: 'Take Strummer to Dog Park ',
  //     day: 'Feb 22nd at 9am',
  //     reminder: true,
  //   },
  //   {
  //     id: 2,
  //     text: 'Grocery Shopping',
  //     day: 'Feb 22nd at 11am',
  //   reminder: true,
  // },
  // {
  //   id: 3,
  // text: 'Code MULTI app',
  // day: 'Feb 22nd at 2pm',
  // reminder: true,
  //}

  const url = 'https://sheet.best/api/sheets/c1846bb7-484c-4302-94e2-6667774f246f'

useEffect(() => {
    getAllTasks();
}, []);


const getAllTasks = () =>
axios.get(`${url}`)
.then((response) =>{
  const allTasks = response.data.tasks.allTasks;
  setTasks(allTasks);
})
.catch(error => console.error(`Error:${error}`));

const addTask = (task) => {
  const id = Math.floor(Math.random() * 1000) + 1
  const newTask = { id, ...task }
  setTasks([...tasks, newTask])
}

const deleteTask = (id) => {
setTasks(tasks.filter((task) => task.id !== id))
}

const toggleReminder = (id) => {
setTasks (
  tasks.map((task) => task.id === id ? { ...task,
  reminder:!task.reminder } :task)
)
}





  return (
    <div className="container">
      <Header
      onAdd={() => setShowAddTask
        (!showAddTask) }
        showAdd={showAddTask}
        />
      {showAddTask && <AddTask onAdd={addTask}
      />}
      <Tasks tasks={tasks}
      onDelete={deleteTask}
      onToggle ={toggleReminder} />

    </div>
  );
}

export default App;
