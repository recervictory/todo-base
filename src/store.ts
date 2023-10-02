// Import the create function from the "zustand" library for creating a state store.

// Define the structure of a Todo item.
export interface Todo {
  id: number;   // Unique identifier for the todo item.
  text: string; // The text content of the todo item.
  done: boolean; // Indicates whether the todo item is marked as done or not.
}

// Define a function to update the text of a todo item.
const updateTodo = (todos: Todo[], id: number, text: string): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    text: todo.id === id ? text : todo.text,
  }));

// Define a function to toggle the "done" status of a todo item.
const toggleTodo = (todos: Todo[], id: number): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    done: todo.id === id ? !todo.done : todo.done,
  }));

// Define a function to remove a todo item from the list.
const removeTodo = (todos: Todo[], id: number): Todo[] =>
  todos.filter((todo) => todo.id !== id);

// Define a function to add a new todo item to the list.
const addTodo = (todos: Todo[], text: string): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1, // Generate a unique ID.
    text,
    done: false, // Initially, the new todo item is marked as not done.
  },
];

// Define the structure of the Zustand store.
type Store = {
  todos: Todo[]; // An array of todo items.
  newTodo: string; // The text of the new todo item being added.
  // Functions to manipulate the state.
  load: (todos: Todo[]) => void;
  addTodo: () => void;
  setNewTodo: (text: string) => void;
  update: (id: number, text: string) => void;
  toggle: (id: number) => void;
  remove: (id: number) => void;
}

// Create a Zustand store for managing todo items.
const useTodoStore = create<Store>((set) => ({
  todos: [],      // Initialize the todo list as empty.
  newTodo: "",    // Initialize the newTodo field as an empty string.

  // Function to load todo items into the store.
  load(todos: Todo[]) {
    set((state: any) => ({
      ...state,
      todos: todos,  // Set the todos array with the provided todo items.
      newTodo: ""    // Reset the newTodo field to an empty string.
    }))
  },

  // Function to add a new todo item to the store.
  addTodo() {
    set((state: any) => ({
      ...state,
      todos: addTodo(state.todos, state.newTodo), // Add a new todo item to the list.
      newTodo: ""  // Reset the newTodo field to an empty string after adding.
    }))
  },

  // Function to set the newTodo field with a given text.
  setNewTodo(text: string) {
    set((state: any) => ({
      ...state,
      newTodo: text,  // Update the newTodo field with the provided text.
    }))
  },

  // Function to update the text of a specific todo item.
  update(id: number, text: string) {
    set((state: any) => ({
      ...state,
      todos: updateTodo(state.todos, id, text),  // Update the todo item text.
    }))
  },

  // Function to toggle the "done" status of a specific todo item.
  toggle(id: number) {
    set((state: any) => ({
      ...state,
      todos: toggleTodo(state.todos, id),  // Toggle the "done" status.
    }))
  },

  // Function to remove a specific todo item from the list.
  remove(id: number) {
    set((state: any) => ({
      ...state,
      todos: removeTodo(state.todos, id),  // Remove the specified todo item.
    }))
  },

}));

export default useTodoStore; // Export the Zustand store for use in other parts of the application.
