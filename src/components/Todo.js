import React from 'react';
import { ListItem } from 'material-ui';
import FlatButton from 'material-ui/FlatButton';

export default (props) => (
    <div style={{display: 'flex', justifyContent: "center"}}>
      <ListItem style={{
            textDecoration: props.todo.complete ? "line-through": "",
            'fontStyle': 'italic'
        }}
        onClick={props.toggleComplete}>{props.todo.text}
       </ListItem>
      <FlatButton variant="outline" color="primary" label='X' onClick={props.onDelete}/>
    </div>
);