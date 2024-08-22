import { sendMessage } from '@microsoft/signalr/dist/esm/Utils';
import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap';

const SendMessageForm = ({sentMessage}) => {
  
  const [msg, setMessage] = useState('');

    return (
    <Form onSubmit={e => {
        e.preventDefault();
        sentMessage(msg);
        setMessage('');
    }}>
        <InputGroup className="mb-3">
            <InputGroup.Text>Chat</InputGroup.Text>
            <Form.Control onChange={ e => setMessage(e.target.value)} value={msg} placeholder='type a message'></Form.Control>
            <Button variant="primary" type="submit" disabled={!msg}>Send</Button>
        </InputGroup>
    </Form>
  )
}

export default SendMessageForm