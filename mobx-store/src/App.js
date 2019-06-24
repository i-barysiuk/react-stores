import React from 'react';
import logo from './logo.svg';
import './App.css';
import { observable, computed, observer, mobx } from "mobx"

import shortid from 'shortid';

class ObservableTodoStore {
    @observable todos = [];
    @observable pendingRequests = 0;

    constructor() {
        mobx.autorun(() => console.log(this.report));
    }

    @computed get completedTodosCount() {
        return this.todos.filter(
            todo => todo.completed === true
        ).length;
    }

    @computed get report() {
        if (this.todos.length === 0)
            return "<none>";

        return `Next todo: "${this.todos[0].task}". ` + 
            `Progress: ${this.completedTodosCount}/${this.todos.length}`; 
    }

    addTodo(task) {
        this.todos.push({ 
            id: shortid.generate(),
            task: task,
            completed: false,
            assignee: null
        });
    }
}

const observableTodoStore = new ObservableTodoStore();

@observer
class TodoList extends React.Component {
  render() {
    const store = this.props.store; 
    return (
      <div>
        { store.report }
        <ul>
        { store.todos.map(
          (todo, idx) => <TodoView todo={ todo } key={ todo.id } />
        ) }
        </ul>
        { store.pendingRequests > 0 ? <marquee>Loading...</marquee> : null }
        <button onClick={ this.onNewTodo }>New Todo</button>
        <small> (double-click a todo to edit)</small>
        {/* <RenderCounter /> */}
      </div>
    );
  }

  onNewTodo = () => { 
    this.props.store.addTodo(prompt('Enter a new todo:','coffee plz')); 
  } 
}


class TodoView extends React.Component {
  render() {
    const todo = this.props.todo;
    return (
      <li onDoubleClick={ this.onRename }>
        <input 
          type='checkbox'
          checked={ todo.completed }
          onChange={ this.onToggleCompleted } 
        />
        { todo.task }
        { todo.assignee 
          ? <small>{ todo.assignee.name }</small> 
          : null
        }
        {/* <RenderCounter /> */}
      </li>
    ); 
  }

  onToggleCompleted = () => {
    const todo = this.props.todo;
    todo.completed = !todo.completed;
  }

  onRename = () => {
    const todo = this.props.todo;
    todo.task = prompt('Task name', todo.task) || ""; 
  } 
}


function App() {
  return (
    <TodoList store={ observableTodoStore } />
  );
}

export default App;
