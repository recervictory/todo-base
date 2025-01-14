import * as React from "react";
import { Button, Input, Grid } from "@chakra-ui/react";
import useTodoStore from "../store";

function TodoAdd() {
  const store = useTodoStore();
  
  return (
    <Grid pt={2} templateColumns="5fr 1fr" columnGap="3">
      <Input placeholder="New todo"
        value={store.newTodo}
        onChange={(event) => store.setNewTodo(event.target.value)}
      />
      <Button
        onClick={
          () => store.addTodo()
        }
      >Add Todo</Button>
    </Grid>
  );
}

export default TodoAdd;
