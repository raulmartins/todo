import './Content.css';
import React, { Component } from 'react'
import axios from 'axios';

const baseUrl = `http://localhost:3001/todo`
const initialState = {
  task: { id: '', description: '', solved: false },
  list: []
}

export default class Content extends Component {

  state = { ...initialState }

  load = () =>
    axios.get(baseUrl)
      .then(res => {
        const list = res.data;
        this.setState({ list })
      })

  updateField = (event) => {
    const task = { ...this.state.task }
    task[event.target.name] = event.target.value;
    this.setState({ task })
  }

  clearForm = () => {
    this.setState({ task: initialState.task })
  }

  removeTask = (task) => {
    axios.delete(`${baseUrl}/${task.id}`)
      .then(res => {
        this.refreshTodo();
      })
  }

  solveTask = (task) => {
    task.solved = !task.solved;
    axios.put(`${baseUrl}/${task.id}`, task)
      .then(res => {
        this.refreshTodo();
      })
  }

  refreshTodo = () => {
    axios.get(baseUrl).then(res => {
      this.setState({ list: res.data })
    })
  }

  addTask = () => {
    const task = { ...this.state.task }
    const method = task.id ? 'put' : 'post'
    const url = task.id ? `${baseUrl}/${task.id}` : `${baseUrl}`

    axios[method](url, task)
      .then(res => {
        const list = this.getUpdatedList(res.data)
        this.setState({ task: initialState.task, list })
      })
  }

  getUpdatedList = (task) => {
    const list = this.state.list.filter(currentTask => currentTask.id !== task.id)
    list.unshift(task)
    return list;
  }
  componentDidMount = () => {
    this.load();
  }

  searchInputAddRemove = () =>
    <form>
      <div className="form-group">
        <div className="inputForm">
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            placeholder="Type task..."
            value={this.state.task.description}
            onChange={this.updateField}>
          </input>
          <button type="button" onClick={this.addTask} className="btn btn-outline-primary ml-2"><i className="fa fa-plus"></i></button>
          <button type="button" className="btn btn-outline-info ml-1"><i className="fa fa-search"></i></button>
          <button type="button" onClick={this.clearForm} className="btn btn-outline-light ml-1"><i className="fa fa-times"></i></button>
        </div>
      </div>
    </form >

  renderTable = () =>
    <table className="table table-hover table-dark" >
      <thead>
        <tr>
          <th className="">#</th>
          <th className="w-75">Decription</th>
          <th className="text-right">Action</th>
        </tr>
      </thead>
      <tbody>
        {this.renderRows()}
      </tbody>
    </table>

  renderRows = () =>
    this.state.list
      .map(task => {
        return (
          <tr key={task.id}>
            <th scope="row">{task.id}</th>
            <td style={{ textDecoration: task.solved ? 'line-through' : '' }}>{task.description}</td>
            <td className="text-right">
              <button
                type="button" onClick={() => this.solveTask(task)}
                className="btn btn-outline-success ml-3">
                <i
                  className={`fa fa-${task.solved ? 'times' : 'check'}`}>
                </i>
              </button>
              <button type="button" onClick={() => this.removeTask(task)} className="btn btn-outline-danger ml-3"><i className="fa fa-trash"></i></button>
            </td>
          </tr>
        )
      })


  render() {
    return (
      <main className="content" >
        {this.searchInputAddRemove()}
        {this.renderTable()}
      </main >
    )
  }


}