//  const jso=require('./data.json');

(async function () {
  const data = await fetch("./JSON/data.json");
  const res = await data.json();
  let employes = res;
  let selectedemployesId = employes[0].id;
  let selectedemployes = employes[0];
  const employeslist = document.querySelector(".employename__list");
  const employesInfo = document.querySelector(".employeinfo__info");
  const addEmployee=document.querySelector(".button-18");
  const addEmployeeModal = document.querySelector(".addEmployee");
  const addEmployeeForm = document.querySelector(".addEmployee_create");

  addEmployee.addEventListener("click",()=>{
    addEmployeeModal.style.display="flex";
  })

  addEmployeeModal.addEventListener("click",(e)=>{
    if(e.target.className === "addEmployee" ){
        addEmployeeModal.style.display="none"
    }
  })

  const DOB=document.querySelector(".addEmployee_create--dob");
  DOB.max=`${new Date().getFullYear() - 18}-${new Date().toISOString().slice(5, 10)}` 

  addEmployeeForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const formData=new FormData(addEmployeeForm);
    const values=[...formData.entries()]
    let empData = {};
    values.forEach((val) => {
      empData[val[0]] = val[1];
    });
    empData.id = employees[employees.length - 1].id + 1;
    empData.age =
      new Date().getFullYear() - parseInt(empData.dob.slice(0, 4), 10);
    empData.imageUrl =
      empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";
    employes.push(empData);
    renderEmployees();
    addEmployeeForm.reset();
    addEmployeeModal.style.display = "none";
});
  

  const renderEmployees = () => {
    employeslist.innerHtml = "";
    employes.forEach((emp) => {
      const employee = document.createElement("span");
      employee.classList.add("employename__item");

      if (parseInt(selectedemployesId, 10) === emp.id) {
        employee.classList.add("selected");
        selectedemployes = emp;
      }
      employee.setAttribute("id", emp.id);
      employee.innerHTML = `${emp.firstName} ${emp.lastName} <span>X</span>`;
      employeslist.append(employee);
    });
  };

  const rendersingleEmployees = () => {
    employesInfo.innerHTML =
     `
    <img src="${selectedemployes.imageUrl}"/>
    <span class="employeinfo__info--heading">
    ${selectedemployes.firstName} ${selectedemployes.lastName} (${selectedemployes.age})
    </span>
    <span>${selectedemployes.address}</span>
    <span> phone no-${selectedemployes.contactNumber}</span>
    <span>${selectedemployes.email}</span>
    <span>${selectedemployes.dob}</span>
    `;
  };
 
   
        if (selectedemployes) rendersingleEmployees();
   
     renderEmployees();
  
  
  
})();

// fetch('./data.json')
// .then(response => {
//    return response.json();
// })
// .then(data => console.log(data));

// import users from './JSON/data.json' assert {type:'json'}
// console.log(users);
