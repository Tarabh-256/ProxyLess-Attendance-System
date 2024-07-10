// src/App.js
import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editTask, setEditTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, taskIndex) => taskIndex !== index));
  };

  const handleEditTask = () => {
    const updatedTasks = tasks.map((task, index) =>
      index === editIndex ? editTask : task
    );
    setTasks(updatedTasks);
    setEditIndex(-1);
    setEditTask('');
  };

  const openEditDialog = (index) => {
    setEditIndex(index);
    setEditTask(tasks[index]);
  };

  const closeEditDialog = () => {
    setEditIndex(-1);
    setEditTask('');
  };

  return (
    <Container style={{textAlign: "center", padding: "35px"}} maxWidth="sm">
      <h1 style={{fontWeight: "15px", fontSize: "30px", fontFamily: "cursive", fontStyle
      : "italic"}}>Todo App</h1>
      <TextField
        label="New Task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleAddTask}>
        Add Task
      </Button>
      <List style={{height: "300px", overflowX: "auto", overflowY: "auto"}}>
        {tasks.map((task, index) => (
          <ListItem key={index}>
            <ListItemText primary={task} />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => openEditDialog(index)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" onClick={() => handleDeleteTask(index)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog open={editIndex !== -1} onClose={closeEditDialog}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the task and click 'Save' to update it.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Task"
            fullWidth
            value={editTask}
            onChange={(e) => setEditTask(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditTask} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default App;
