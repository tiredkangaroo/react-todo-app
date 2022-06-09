function Todo(ele){
    edit_link = "/edit/" + ele.id
    return (<tr key={ele.id}> 
        <td> {ele.todo} </td> 
        <td>
            <a href={edit_link}><button>Edit</button></a>
        </td>
        <td> <form encType="multipart/form-data" method="POST" action="/delete">
                <input type="hidden" name="objectid" value={ele.id}/>
                <button type="submit">Delete</button>
            </form>
        </td>
    </tr>)
}