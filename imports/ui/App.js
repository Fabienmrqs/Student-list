import React, { Component } from 'react';

import Task from './Task.js';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tasks } from '../api/tasks.js';

import AccountsUIWrapper from './AccountsUIWrapper.js';




 class App extends Component {

     constructor(props) {
         super(props);

         this.state = {
             hideCompleted: false,
         };
     }

     handleSubmit(event) {
         event.preventDefault();

         const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

         Tasks.insert({
             text,
             createdAt: new Date(),
             owner: Meteor.userId(),
             username: Meteor.user().username,
         });




         ReactDOM.findDOMNode(this.refs.textInput).value = '';
     }

     toggleHideCompleted() {
         this.setState({
             hideCompleted: !this.state.hideCompleted,
         });
     }


    renderTasks() {
        let filteredTasks = this.props.tasks;
        if (this.state.hideCompleted) {
            filteredTasks = filteredTasks.filter(task => !task.checked);
        }
        return filteredTasks.map((task) => (
            <Task key={task._id} task={task} />
        ));
    }
    render() {
        return (
            <div className="container">
                <header>
                    <div className="header">
                        <h1>Liste des élèves ({this.props.incompleteCount})</h1>
                        <AccountsUIWrapper />
                    </div>
                    <div className="forms">
                        { this.props.currentUser ?
                            <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                                <input
                                    type="text"
                                    ref="textInput"
                                    placeholder="Ajouter le nom de l'élève"
                                />
                            </form> :''

                        }


                        <form className="new-task" onSubmit={this.handleSubmit.bind(this)} ></form>
                    </div>
  
                </header>

                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
}
export default withTracker(() => {
    return {
        tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
        incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
        currentUser: Meteor.user(),
    };
})(App);
