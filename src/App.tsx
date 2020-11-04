import React, { Fragment, useState, useEffect } from 'react';
import './App.css';

interface ITodo {
  text: string
  complete: boolean | undefined;
}

// interface ITodo2 extends ITodo {
//   name: string
// }

type FormElem = React.FormEvent

const App: React.FC = (): JSX.Element => {
  const [value, setValue] = useState<string>('')
  const [ todos, setTodos] = useState<ITodo[]>([])
  // debugger

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault()
    addTodo(value)
    setValue('')
  }

  const addTodo = (text: string) => {
    const newTodos: ITodo[] = [...todos, {text, complete: false}]
    setTodos(newTodos)
  }

  const completeTodo = (index: number):void => {
    const newTodos: ITodo[] = [...todos]
    newTodos[index].complete = !newTodos[index].complete
    setTodos(newTodos)
  }

  const removeTodo = (index: number):void => {
    const newTodos: ITodo[] = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }
  return (
    <Fragment>
      <div className="container">
        <h2>Todo List</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" value={value} onChange={e => setValue(e.target.value)} required />
          <button type="submit" style={{color: "white", background: "black"}}>Add Todo</button>
        </form>
        <section>
          {todos.map((todo: ITodo, index: number) => (
            <Fragment key={index}>
              <div className="content" style={{color: "black" }}>{todo.text}</div>
              <button type="button" style={{textDecoration: todo.complete ? "line-through" : ''}} onClick={() => completeTodo(index)}>{ todo.complete ? 'Incomplete' : 'Complete' }</button>
              <button type="button" style={{ color: "white", background: "red"}} onClick={() => removeTodo(index)}>&times;</button>
            </Fragment>
          ))}
        </section>
      </div>
    </Fragment>
  );
}

export default App;
