from pymongo import MongoClient
from pprint import pprint
from flask import *
from json import dumps
from bson.objectid import ObjectId

app = Flask(__name__)
client = MongoClient("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.0")
db = client.todos

@app.route("/")
def index():
    all_todos = db.todos.find() #get all the todos
    js_comprehensible_todos = []
    for todo in all_todos:
        js_comprehensible_todos.append({
            "id": todo["_id"].__str__(),
            "author": todo["author"],
            "todo": todo["todo"].replace('"', "'").replace('\\', "")
        })
    # js_comprehensible_todos = dumps(js_comprehensible_todos)
    # print(js_comprehensible_todos)
    return render_template("index.html", todos=js_comprehensible_todos)

@app.route("/compiled/<path:path>")
def compiled(path):
    return send_from_directory("compiled", path)

@app.route("/new", methods=["POST"])
def new():
    author = request.form.get("author")
    todo = request.form.get("todo")
    if not (author and todo):
        abort(400)
    new_todos = {
        "author": author,
        "todo": todo
    }
    result = db.todos.insert_one(new_todos)
    return redirect(url_for("index"))
@app.route("/delete", methods=["POST"])
def delete():
    objectid = request.form.get("objectid")
    if not len(objectid) == 24:
        abort(400)
    try:
        document_to_delete = db.todos.find_one(ObjectId(objectid))
        db.todos.delete_one(document_to_delete)
    except Exception as e:
        print(e)
        abort(404) #because it could not find the document, or the document has already been deleted
    return redirect(url_for("index"))

@app.route("/edit/<string:objectid>", methods=["GET", "POST"])
def edit(objectid):
    try:
        objectid = ObjectId(objectid)
        document = db.todos.find_one(objectid)
    except:
        abort(400)
    if request.method == "GET":
        return render_template("edit.html", document=document)
    elif request.method == "POST":
        newtext = request.form.get("text")
        try:
            db.todos.update_one(document, {"$set":{"todo":newtext}})
        except Exception as e:
            print(e)
            abort(500)
    return redirect(url_for("index"))

if __name__ == "__main__":
    app.run(debug=True, port=5500)
