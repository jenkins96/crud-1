import { useState } from "react";
import UserTable from "./Component/UserTable"
import { v4 as uuidv4 } from "uuid";
import AddUserForm from "./Component/AddUserForm.js";
import EditUserForm from "./Component/EditUserForm.js";
function App() {

    const usersData = [
      {id: uuidv4(), name: "Carlos", username: "carlosvim"},
      {id: uuidv4(), name: "Fabian", username: "flamyfabian"},
      {id: uuidv4(), name: "Monik", username: "nikom"}
    ]
    // State
    const [users, setUsers] = useState(usersData)

    // Agregar Usuario
    const addUser = user => {
      user.id = uuidv4();
      setUsers([...users, user])
  }
  // Eliminar Usuario
  const deleteUser = id => {
    //console.log(id)
    setUsers(users.filter(user => user.id !== id));
  }
  // Editar Usuarios
  const [editing, setEditing] = useState(false);

  // Current User
  const [currentUser, setCurrentUser] = useState({
    id: null,
    name: "",
    username: ""
  });
  // Edit Row
  const editRow = user => {
    setEditing(true);
    setCurrentUser({
      id: user.id,
      name: user.name,
      username: user.username
    })
  }
  // Actualizar
  const updateUser = (id, updatedUser) => {
    setEditing(false);
    setUsers(users.map(user => (user.id ===id? updatedUser : user)))
  }

  return (
   <div className = "container">
      <h1>CRUD App with Hooks</h1>
      <div className = "flex-row">
        <div className = "flex-large">
          {
            editing? (
              <div>
                <h2>Edit User</h2>
                <EditUserForm 
                currentUser = {currentUser}
                updateUser = {updateUser}
                />
              </div>
            ) : (
              <div>
                <h2>Add User</h2>
                <AddUserForm addUser = {addUser} />
              </div>

            )
          }
        </div>
        <div className = "flex-large">
          <h2>View Users</h2>
          <UserTable 
          users = {users} 
          deleteUser = {deleteUser} 
          editRow = {editRow}/>
        </div>
      </div>
   </div>
  );
}

export default App;
