import { RequestHandler, Request } from 'express';
import { Todo } from '../models/todo';

let TODOS: Todo[] = [];

export const deleteTodo: RequestHandler = (req, res, next) => {
    const { id } = req.params;
    const todoIndex = TODOS.findIndex((t) => t.id == id);
    const deletedTodo = TODOS[todoIndex];

    TODOS = [
        ...TODOS.slice(0, todoIndex),
        ...TODOS.slice(todoIndex + 1)
    ];

    res.json({ message: "Todo deleted", data: deletedTodo });
};

export const updateTodo: RequestHandler = (req, res, next) => {
    const { id } = req.params;
    const todo = TODOS.find((t) => t.id == id);
    if (todo) {
        todo.text = (req.body as { text: string }).text;
    }
    res.json({ message: "Todo Updated", data: todo });
};

export const getTodos: RequestHandler = (req, res, next) => {
    res.json({ data: TODOS });
};

export const createTodo: RequestHandler = (req, res, next) => {
    const text = (req.body as { text: string }).text;
    const newTodo = new Todo(Math.random().toString(), text);

    TODOS.push(newTodo);

    res.json({ message: "Todo Created", data: newTodo });
};