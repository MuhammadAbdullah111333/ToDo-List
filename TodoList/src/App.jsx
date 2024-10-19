import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [ShowFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let TodoString = localStorage.getItem("todos")
    if (TodoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])

  const SaveToLocalStorage = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinish = (e) => {
    setShowFinished(!ShowFinished)
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    settodos(newTodos)
    SaveToLocalStorage()

  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    settodos(newTodos)
    SaveToLocalStorage()
  }

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    SaveToLocalStorage()
  }

  const handleChange = (e) => {
    settodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos)
    SaveToLocalStorage()
  }

  return (
    <>
      <Navbar />


      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl bg-violet-200 p-5 min-h-[80vh] md:w-1/2 ">
        <h1 className='font-bold text-center text-xl'>iTasks - Manage Your Todos</h1>
        <div className="addTodo my-5 flex flex-col gap-3">
          <h2 className='text-lg font-bold'>Add a ToDo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-lg py-1 px-5' />
          <button onClick={handleAdd} disabled={todo.length <= 4} className='bg-violet-500 hover:bg-violet-800 disabled:bg-violet-500 p-5 py-1 font-bold text-white rounded-md text-sm'>Save</button>
        </div>
        <input className='my-4' onChange={toggleFinish} type="checkbox" checked={ShowFinished} />
        <label className='mx-2' htmlFor="show">ShowFinished</label>
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-1'></div>

        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to Display</div>}
          {todos.map(item => {


            return (ShowFinished || !item.isCompleted) && <div key={item.id} className="todo flex md:w-1/2 my-3 justify-between">
              <div className='flex gap-5'>

                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>

              </div>

              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-500 hover:bg-violet-800 p-2 py-1 font-bold text-white rounded-md mx-1 text-sm'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-500 hover:bg-violet-800 p-2 py-1 font-bold text-white rounded-md mx-1 text-sm'><MdDelete /></button>

              </div>

            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App

