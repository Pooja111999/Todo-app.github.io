const addUserBtn = document.getElementById('addUser');
const btnText = addUserBtn.innerText;
const usernameTextField = document.getElementById('username');
 const recordsDisplay = document.getElementById('records');
let userArray = [];
let edit_id = null;

 let objStr = localStorage.getItem('users');

  if(objStr != null){
  userArray =  JSON.parse(objStr);
  }

 DisplayInfo();
  addUserBtn.onclick=()=>{
    const name = usernameTextField.value;
    if(edit_id!=null){
        //edit
        userArray.splice(edit_id,1,{'name' : name})
        edit_id = null;
    }else{
        //insert
        userArray.push({'name' : name});
    }
 
 SaveInfo(userArray);
 usernameTextField.value = '';
 addUserBtn.innerText = btnText;
}

function SaveInfo(userArray){
 let str =  JSON.stringify(userArray);//change to string, this is builty methode of js
  localStorage.setItem('users', str);
  DisplayInfo();
}

function DisplayInfo(){
 let statement = '';
 userArray.forEach((user,i) => {
    statement += `<tr>
    <th scope="row">${i+1}</th>
    <td>${user.name}</td>
   <td> <i class="btn text-white fas btn-info mx-2" onclick='EditInfo(${i})'>&#xf044;</i> <i class=" btn btn-danger text-white material-icons" onclick='DeleteInfo(${i})'>delete</i></td>
  </tr>`;
 });
  recordsDisplay.innerHTML = statement;
}

function EditInfo(id){
  edit_id = id;//own id store
  usernameTextField.value = userArray[id].name;
  addUserBtn.innerText = 'Save Changes';
}

function DeleteInfo(id){
    userArray.splice(id,1);//delt
    SaveInfo(userArray);//then save 
   // DisplayInfo();// then show in display
}