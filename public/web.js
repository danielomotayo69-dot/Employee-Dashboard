const form = document.querySelector(".form");
const URL= "https://employee-dashboard-aaqu.onrender.com"
const formModal = document.querySelector(".formModal");
const FirstError = document.querySelector(".FirstError");
const LastError = document.querySelector(".LastError");
const EmailError = document.querySelector(".EmailError");
const AgeError = document.querySelector(".AgeError");
const PasswordError = document.querySelector(".PasswordError");




const addBtn= document.querySelector(".addBtn");
const cancel= document.querySelector(".cancel");
const overlay= document.querySelector(".overlay");

addBtn.addEventListener("click", ()=>{
  overlay.classList.add("show")
})

cancel.addEventListener("click", ()=>{
  overlay.classList.remove("show")
})




function clearErrors() {
  FirstError.textContent = "";
  LastError.textContent = "";
  EmailError.textContent = "";
  AgeError.textContent = "";
  PasswordError.textContent = "";
}

function getErrors(errors = {}) {
  if (errors.fullname) FirstError.textContent = errors.fullname;
if (errors.email) EmailError.textContent = errors.email;
if (errors.age) AgeError.textContent = errors.age;
if (errors.department) LastError.textContent = errors.department;
if (errors.position) PasswordError.textContent = errors.position;
}

let state = {
  mode: "create",
  editId: null,
};

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const search = document.querySelector(".search").value;

    try {
        const res = await fetch(`${URL}/employee/filter?search=${search}`)
        const datas = await res.json()
         const post= document.querySelector(".post");
  post.innerHTML= "";
    const employees= datas.employee;
    if(!employees || employees.length === 0){
    post.innerHTML= `<h1>No Employees Found</h1>`
    return;
    }
  employees.forEach(data =>{
      const initials= data.fullname.split(" ").map(word => word[0]).join("").toUpperCase();
      
      const div= document.createElement("div")
        div.className= "two"
        div.innerHTML += `
                <p>${data.employeeid}</p>
            <div class="name">
            <div>${initials}</div>
                <p>${data.fullname}</p>
            </div>
              <p>${data.email}</p>
              <p>${data.age}</p>
             <p>Engineering</p>
             <p>${data.department}</p>
            

             <div class="action">
               <i class="fa-solid fa-pen-to-square editBtn"></i>
                <i class="fa-solid fa-trash deleteBtn"></i>
             </div>
 `;
    const deleteBtn = div.querySelector(".deleteBtn");
      deleteBtn.addEventListener("click", () => {
        deleteUser(data._id);
      });

      const editBtn = div.querySelector(".editBtn");
      editBtn.addEventListener("click", () => {
        clearErrors()
        editUser(data);
        overlay.classList.add("show")
      });
      
     post.appendChild(div)
    })
      
        document.querySelector(".search").value = "";

    }
    catch (error) {
        console.log(error.message)
    }

  })


formModal.addEventListener("submit", async (e) => {
  e.preventDefault();

  clearErrors();

  const formdata = new FormData(formModal);

  const data = {
    fullname: formdata.get("fullname"),
    email: formdata.get("email"),
    age: Number(formdata.get("age")),
    department: formdata.get("department"),
    position: formdata.get("position"),
    employeeid: formdata.get("employeeid"),
  };
  
  try {
    let res;

    if (state.mode === "edit") {
      res = await fetch(`${URL}/employee/update/${state.editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });

    } 
    else {
      res = await fetch(`${URL}/employee/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
    }
    const result = await res.json();
    
    if (!res.ok) {
      getErrors(result.errors);
      return;
    }

    overlay.classList.remove("show")
    formModal.reset();
    state.mode= "create";
    state.editId= null;
    fetchEmployee();
  }
   catch (error) {
    console.log(error.message);
  }
})

const fetchEmployee = async () => {
    const res = await fetch(`${URL}/employee`);
    const datas = await res.json();
    console.log(datas)

 const post= document.querySelector(".post");
  post.innerHTML= "";
    datas.employee.forEach(data => {
    const initials= data.fullname.split(" ").map(word => word[0]).join("").toUpperCase();

    const div= document.createElement("div")
        div.className= "two"
        div.innerHTML += `
                <p>${data.employeeid}</p>
            <div class="name">
            <div>${initials}</div>
                <p>${data.fullname}</p>
            </div>
              <p>${data.email}</p>
              <p>${data.age}</p>
             <p>${data.department}</p>
             <p>${data.position}</p>
            

             <div class="action">
               <i class="fa-solid fa-pen-to-square editBtn"></i>
                <i class="fa-solid fa-trash deleteBtn"></i>
             </div>
 `;
    const deleteBtn = div.querySelector(".deleteBtn");
      deleteBtn.addEventListener("click", () => {
        deleteUser(data._id);
      });

      const editBtn = div.querySelector(".editBtn");
      editBtn.addEventListener("click", () => {
        clearErrors()
        editUser(data);
        overlay.classList.add("show")
      });
      
     post.appendChild(div)
    })

}


async function deleteUser(id) {
  try {
    await fetch(`${URL}/employee/delete/${id}`, {
      method: "DELETE",
    });

    fetchEmployee();
  } catch (error) {
    console.log(error.message);
  }
}

function editUser(user) {
  state.mode = "edit";
  state.editId = user._id;

  formModal.fullname.value = user.fullname;
formModal.email.value = user.email;
formModal.age.value = user.age;
formModal.department.value = user.department;
formModal.position.value = user.position;
formModal.employeeid.value = user.employeeid;
  
  
   formModal.scrollIntoView({
    behavior: "smooth",
  })
}
fetchEmployee()




