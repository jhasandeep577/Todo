import { Delete, Edit, Save, Done } from '@mui/icons-material';
import { Grid, TextField, Button, List, ListItem, ListItemText, IconButton, Tooltip, Paper, Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState<{ name: string; done: boolean; deleting: boolean }[]>([]);
  const [task, setTask] = useState<string>('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedTask, setEditedTask] = useState<string>('');

  useEffect(() => {}, [tasks]);

  const handleDeleteTask = (index: number) => {
    setTasks(tasks.map((t, i) => (i === index ? { ...t, deleting: true } : t)));
  };

  const confirmDeleteTask = (index: number) => {
    setTasks(tasks.filter((_, indexNo) => indexNo !== index));
  };

  const cancelDeleteTask = (index: number) => {
    setTasks(tasks.map((t, i) => (i === index ? { ...t, deleting: false } : t)));
  };

  const handleEditTask = (index: number) => {
    setEditIndex(index);
    setEditedTask(tasks[index].name);
  };

  const handleSaveEdit = () => {
    if (editedTask.trim()) {
      const updatedTasks = tasks.map((t, index) =>
        index === editIndex ? { ...t, name: editedTask, deleting: false } : t
      );
      setTasks(updatedTasks);
      setEditIndex(null);
      setEditedTask('');
    }
  };

  const handleOnClick = () => {
    if (task.trim()) {
      setTasks([...tasks, { name: task, done: false, deleting: false }]);
      setTask('');
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleDoneTask = (index: number) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, done: true } : t
    );
    setTasks(updatedTasks);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Todo List
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={8}>
          <TextField
            label="Add Task"
            size="small"
            value={task}
            onChange={handleOnChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Button variant="contained" size="small" onClick={handleOnClick} fullWidth>
            Add Task
          </Button>
        </Grid>

        <Grid item xs={12}>
          <List>
            {tasks.map((task, index) => (
              <Paper key={index} elevation={2} sx={{ marginBottom: '8px', position: 'relative', overflow: 'hidden' }}>
                <ListItem
                  sx={{
                    backgroundColor: task.deleting ? '#ffcccb' : task.done ? 'lightgreen' : 'white',
                    '&:hover': {
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                      transition: '0.3s',
                    },
                  }}
                >
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item xs={8} md={6}>
                      {editIndex === index && !task.done ? (
                        <TextField
                          value={editedTask}
                          size="small"
                          fullWidth
                          onChange={(e) => setEditedTask(e.target.value)}
                        />
                      ) : (
                        <ListItemText primary={task.name} />
                      )}
                    </Grid>

                    <Grid item xs={4} md={6}>
                      <Grid container spacing={1} justifyContent="flex-end">
                        {!task.done && !task.deleting && (
                          <>
                            {editIndex === index ? (
                              <Tooltip title="Save">
                                <IconButton
                                  color="primary"
                                  onClick={handleSaveEdit}
                                  size="small"
                                  sx={{
                                    borderRadius: '50%',
                                    transition: 'background-color 0.3s',
                                    '&:hover': { backgroundColor: '#e0e0e0' },
                                  }}
                                >
                                  <Save />
                                </IconButton>
                              </Tooltip>
                            ) : (
                              <>
                                <Tooltip title="Done">
                                  <IconButton
                                    color="success"
                                    onClick={() => handleDoneTask(index)}
                                    size="small"
                                    sx={{
                                      borderRadius: '50%',
                                      transition: 'background-color 0.3s',
                                      '&:hover': { backgroundColor: '#c8e6c9' },
                                    }}
                                  >
                                    <Done />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Edit">
                                  <IconButton
                                    color="primary"
                                    onClick={() => handleEditTask(index)}
                                    size="small"
                                    sx={{
                                      borderRadius: '50%',
                                      transition: 'background-color 0.3s',
                                      '&:hover': { backgroundColor: '#e3f2fd' },
                                    }}
                                  >
                                    <Edit />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                  <IconButton
                                    color="error"
                                    onClick={() => handleDeleteTask(index)}
                                    size="small"
                                    sx={{
                                      borderRadius: '50%',
                                      transition: 'background-color 0.3s',
                                      '&:hover': { backgroundColor: '#ffcccb' },
                                    }}
                                  >
                                    <Delete />
                                  </IconButton>
                                </Tooltip>
                              </>
                            )}
                          </>
                        )}
                        {task.deleting && (
                          <>
                            <Tooltip title="Confirm Delete">
                              <IconButton
                                color="error"
                                onClick={() => confirmDeleteTask(index)}
                                size="small"
                                sx={{
                                  borderRadius: '50%',
                                }}
                              >
                                <Done />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Cancel">
                              <IconButton
                                color="default"
                                onClick={() => cancelDeleteTask(index)}
                                size="small"
                                sx={{
                                  borderRadius: '50%',
                                }}
                              >
                                <Delete />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </ListItem>
              </Paper>
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
