function App(){
    const [todos, setTodos] = React.useState(window.todos)
    newTodoRef = React.useRef()
    todosRef = React.useRef()
    function handleCreateTodo(e){
        // e.preventDefault();
        all_todos = [...todos]
        text = newTodoRef.current.value;
        id = Math.random()
        all_todos.push({"id":id, author: "lolz", "todo":text})
        setTodos(all_todos);
        // newTodoRef.current.value = "";
    }
    return (    
        <div>
            <table ref={newTodoRef}>
                <tbody>
                    <tr>
                        <th>Reminders</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    {todos.map(ele => {
                        return Todo(ele=ele)
                    })}
                </tbody>
            </table>
            <br/>
            <form method="post" action="/new">
                <input type="hidden" name="author" value="ajiteshkumar" />
                <input required autoFocus ref={newTodoRef} name="todo" type="text" />
                <button type="submit">Create Todo</button>
            </form>
        </div>
    )
}
const domContainer = document.getElementById('website');
const root = ReactDOM.createRoot(domContainer);
root.render(<App />);
