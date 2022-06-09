var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function App() {
    var _React$useState = React.useState(window.todos),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        todos = _React$useState2[0],
        setTodos = _React$useState2[1];

    newTodoRef = React.useRef();
    todosRef = React.useRef();
    function handleCreateTodo(e) {
        // e.preventDefault();
        all_todos = [].concat(_toConsumableArray(todos));
        text = newTodoRef.current.value;
        id = Math.random();
        all_todos.push({ "id": id, author: "lolz", "todo": text });
        setTodos(all_todos);
        // newTodoRef.current.value = "";
    }
    return React.createElement(
        "div",
        null,
        React.createElement(
            "table",
            { ref: newTodoRef },
            React.createElement(
                "tbody",
                null,
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "th",
                        null,
                        "Reminders"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "Edit"
                    ),
                    React.createElement(
                        "th",
                        null,
                        "Delete"
                    )
                ),
                todos.map(function (ele) {
                    return Todo(ele = ele);
                })
            )
        ),
        React.createElement("br", null),
        React.createElement(
            "form",
            { method: "post", action: "/new" },
            React.createElement("input", { type: "hidden", name: "author", value: "ajiteshkumar" }),
            React.createElement("textarea", { cols: "50", rows: "10", required: true, autoFocus: true, ref: newTodoRef, name: "todo", type: "text" }),
            React.createElement("br", null),
            React.createElement(
                "button",
                { type: "submit" },
                "Create Todo"
            )
        )
    );
}
var domContainer = document.getElementById('website');
var root = ReactDOM.createRoot(domContainer);
root.render(React.createElement(App, null));