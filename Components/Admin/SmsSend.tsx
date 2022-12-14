import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { KillerUser } from "../../Interfaces/Interfaces";
import { sendSms } from "../../pages/api/twilio/sms";

interface Props {
  users: KillerUser[];
}

function SmsSend({ users }: Props) {
  const [text, setText] = useState("");

  const send = async () => {
    await fetch("/api/twilio/sms", {
      method: "POST",
      body: JSON.stringify({
        text: text,
        users: users,
      }),
    });
  };

  return (
    <div>
      <div>
        <Form.Label htmlFor="inputPassword5">SMS</Form.Label>
        <Form.Control
          style={{ height: "10rem" }}
          type="text"
          id="inputPassword5"
          as="textarea"
          aria-describedby="passwordHelpBlock"
          onChange={(e) => setText(e.target.value)}
        />
        <Form.Text id="passwordHelpBlock" muted>
          {
            "SMS får max vara 150 karaktärer. Använd <namn> för att lägga in personens namn. <klass> för klassen och <target> för personens offer. SMS kommer skickas till alla som lever"
          }
        </Form.Text>
      </div>
      <Button onClick={() => send()}>
        Skicka ett sms till {users.length} st
      </Button>
    </div>
  );
}

export default SmsSend;
