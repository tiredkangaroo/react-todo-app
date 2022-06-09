function Todo(ele) {
    edit_link = "/edit/" + ele.id;
    return React.createElement(
        "tr",
        { key: ele.id },
        React.createElement(
            "td",
            null,
            " ",
            ele.todo,
            " "
        ),
        React.createElement(
            "td",
            null,
            React.createElement(
                "a",
                { href: edit_link },
                React.createElement(
                    "button",
                    null,
                    "Edit"
                )
            )
        ),
        React.createElement(
            "td",
            null,
            " ",
            React.createElement(
                "form",
                { encType: "multipart/form-data", method: "POST", action: "/delete" },
                React.createElement("input", { type: "hidden", name: "objectid", value: ele.id }),
                React.createElement(
                    "button",
                    { type: "submit" },
                    "Delete"
                )
            )
        )
    );
}