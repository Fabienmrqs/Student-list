import React, { Component } from 'react';

import { Tasks } from '../api/tasks.js';

export default class Task extends Component {

    state = {
        modify : false,
    }

    toggleChecked() {
        // Set the checked property to the opposite of its current value
        Tasks.update(this.props.task._id, {
            $set: { checked: !this.props.task.checked },
        });
    }

    deleteThisTask() {
        Tasks.remove(this.props.task._id);
    }

    ModifyThisTask() {
        console.log(this.props)
        if(!this.state.modify){
            this.setState({
                modify : true
            })
        } else {
            this.setState({
                modify : false
            })
        }
    }

    ReAdd = (e) =>{
        e.preventDefault();
        const name = this.refs.username.value;
        console.log(name);
        Tasks.update({_id: this.props.task._id}, {$set: {"text": name}});
        this.setState({
            modify : false
        })
    }

    render() {
        // Give tasks a different className when they are checked off,
        const taskClassName = this.props.task.checked ? 'checked' : '';

        
            return (
                <li className={taskClassName}>
                    <button className="delete" onClick={this.deleteThisTask.bind(this)}>
                        &times;
                    </button>
                    <button className="modify" onClick={this.ModifyThisTask.bind(this)}>
                        modifier
                    </button>

    
                    {/*<input*/}
                        {/*type="checkbox"*/}
                        {/*readOnly*/}
                        {/*checked={!!this.props.task.checked}*/}
                        {/*onClick={this.toggleChecked.bind(this)}*/}
                    {/*/>*/}
                    <span  className="text">{this.props.task.text}</span>
                        {this.state.modify == true &&  <form onSubmit={this.ReAdd}>
                    <input name="name" type="text" ref="username" />
                    <button type="submit">Modifier</button>
                </form>
    }
                </li>
            );
        }




    }


