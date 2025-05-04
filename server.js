const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Handle POST request (AJAX)
app.post('/register', (req, res) => {
  const user = req.body;

  // Load existing users or start fresh
  let users = [];
  if (fs.existsSync('users.json')) {
    users = JSON.parse(fs.readFileSync('users.json'));
  }

  users.push(user);

  // Save back to file
  fs.writeFileSync('users.json', JSON.stringify(users));

  res.json({ message: 'User registered successfully' });
});

// Serve users for list.html
app.get('/users', (req, res) => {
  let users = [];
  if (fs.existsSync('users.json')) {
    users = JSON.parse(fs.readFileSync('users.json'));
  }
  res.json(users);
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/register.html`));
