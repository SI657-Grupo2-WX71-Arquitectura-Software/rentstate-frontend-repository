import React, { useState } from 'react';
import { Avatar, Typography, TextField, Button, Box } from '@mui/material';
import '../styles/Comments.css'

const Comments = () => {
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState([]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment.trim() !== '') {
      const newComment = {
        text: comment,
        isOwner: false, 
      };
      setCommentsList([...commentsList, newComment]);
      setComment(''); 
    }
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom className="coment_container">
        Comentarios
      </Typography>  
      <TextField
        label="Escribe un comentario"
        variant="outlined"
        fullWidth
        value={comment}
        onChange={handleCommentChange}
        multiline
        rows={3}
        style={{ marginTop: '12px' }}
      />
      <Button variant="contained" color="primary" onClick={handleCommentSubmit} style={{ marginTop: '12px' }}>
        Enviar
      </Button>

      <Box mt={4} p={2}>
        <div>
          {commentsList.map((comment, index) => (
            <div key={index} className="commentContainer">
              <Avatar alt="Avatar" src="/path-to-avatar.jpg" />
              <div className="commentText">
                <Typography variant="body1" style={{ textAlign: 'left' }}>
                  {comment.text}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </Box>
    </div>
  );
};

export default Comments;
