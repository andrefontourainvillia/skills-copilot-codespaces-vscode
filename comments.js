// Create web server
// Run the server
// Create a route for GET /comments
// Create a route for POST /comments
// Create a route for GET /comments/:id
// Create a route for DELETE /comments/:id

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/comments', (req, res) => {
  fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.post('/comments', (req, res) => {
  fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      const comments = JSON.parse(data);
      comments.push(req.body);

      fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments, null, 2), (err) => {
        if (err) {
          res.status(500).send('Internal Server Error');
        } else {
          res.send('Comment added successfully');
        }
      });
    }
  });
});

app.get('/comments/:id', (req, res) => {
  fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      const comments = JSON.parse(data);
      const comment = comments.find((comment) => comment.id === parseInt(req.params.id));

      if (comment) {
        res.send(comment);
      } else {
        res.status(404).send('Comment not found');
      }
    }
  });
});

app.delete('/comments/:id', (req, res) => {
  fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      const comments = JSON.parse(data);
      const commentIndex = comments.findIndex((comment) => comment.id === parseInt(req.params.id));

      if (commentIndex !== -1) {
        comments.splice(commentIndex, 1);

        fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments, null, 2), (err) => {
          if (err) {
            res.status(500).send('Internal Server Error');
          } else {
            res.send('Comment deleted successfully');
          }
        });
      } else {
        res.status(404).send('Comment not found');
      }
    }
});
});