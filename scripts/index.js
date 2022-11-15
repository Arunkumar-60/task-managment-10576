const state = {
  taskList: [],
};
//storage unit for storing task

// DOM - document object
const taskContents = document.querySelector(".task__contents");
// used to adding a new task to form fields
const taskModal = document.querySelector(".task__modal__body");
//used for pop up details/reference to body of madal (for a particular task)
//query selectors for selecting classes

const htmlTaskContent = ({ id, title, description, type, url }) => `
  <div class='col-md-6 col-lg-4 mt-3' id=${id} key=${id}>
    <div class='card shadow-sm task__card'>
      <div class='card-header d-flex gap-2 justify-content-end task__card__header'>
        <button type='button' class='btn btn-outline-info mr-2' name=${id} onclick="editTask.apply(this, arguments)">
          <i class='fas fa-pencil-alt' name=${id}></i>
        </button>
        <button type='button' class='btn btn-outline-danger mr-2' name=${id} onclick="deleteTask.apply(this, arguments)">
          <i class='fas fa-trash-alt' name=${id}></i>
        </button>
      </div>
      <div class='card-body'>
        ${url
    ? `<img width='100%' height='150px' style={{object-fit: cover; object-position: center}}  src=${url} alt='card image cap' class='card-image-top md-3 rounded-lg' />`
    : `
            <img width='100%' height='150px' style={{object-fit: cover; object-position: center}} src="https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png" alt='card image cap' class='img-fluid place__holder__image mb-3' />
          `
  }
        <h4 class='task__card__title'>${title}</h4>
        <p class='description trim-3-lines text-muted' data-gram_editor='false'>
          ${description}
        </p>
        <div class='tags text-white d-flex flex-wrap'>
          <span class='badge bg-primary m-1'>${type}</span>
        </div>
      </div>
      <div class='card-footer'>
        <button 
        type='button' 
        class='btn btn-outline-primary float-right' 
        data-bs-toggle='modal'
        data-bs-target='#showTask'
        id=${id}
        onclick='openTask.apply(this, arguments)'
        >
          Open Task
        </button>
      </div>
    </div>
  </div>
`;

const htmlModalContent = ({ id, title, description, url }) => {
  const date = new Date(parseInt(id));
  return `
    <div id=${id}>
    ${url
      ? `
        <img width='100%' height='150px' style={{object-fit: cover; object-position: center}} src=${url} alt='card image cap' class='img-fluid place__holder__image mb-3' />
      `
      : `
      <img width='100%' height='150px' style={{object-fit: cover; object-position: center}} src="https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png" alt='card image cap' class='img-fluid place__holder__image mb-3' />
      `
    }
    <strong class='text-sm text-muted'>Created on ${date.toDateString()}</strong>
    <h2 class='my-3'>${title}</h2>
    <p class='lead'>
      ${description}
    </p>
    </div>
  `;
};

const updateLocalStorage = () => {
  localStorage.setItem(
    "tasks",
    JSON.stringify({
      tasks: state.taskList,
    })
  );
};

const loadInitialData = () => {
  const localStorageCopy = JSON.parse(localStorage.tasks);

  if (localStorageCopy) state.taskList = localStorageCopy.tasks;

  state.taskList.map((cardDate) => {
    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));
  });
};
//local storage only stores strings
//array is stored in the form of string
//object is also is stored in the form of string

//on click of add task button this function handle submit is called
const handleSubmit = (event) => {
  const id = `${Date.now()}`;
  //getting current date and time
  const input = {
    url: document.getElementById("imageUrl").value,
    title: document.getElementById("taskTitle").value,
    description: document.getElementById("taskDescription").value,
    type: document.getElementById("tags").value,
  };
  //getting values from form values

  if (input.title === "" || input.description === "" || input.type === "") {
    return alert("Please fill all the fields");
  }
  //error if any feild is empty

  taskContents.insertAdjacentHTML(
    "beforeend",
    htmlTaskContent({
      ...input,
      id,
      //spread operator , rather then showing input and id as an object ,we speard the data
      //for more info check out image 1 in the images folder
    })
  );
  //beforeend specifies the position when to insert html

  state.taskList.push({ ...input, id });
  updateLocalStorage();
};

const openTask = (e) => {
  if (!e) e = window.event;

  const getTask = state.taskList.find(({ id }) => id === e.target.id);
  taskModal.innerHTML = htmlModalContent(getTask);
};

// delete functionality
//on click of button in the htmltaskcontent function deletetask function is executed
const deleteTask = (e) => {
  if (!e) e = window.event;
  // window.event is latest event that happend

  const targetID = e.target.getAttribute("name");

  //gets a perticular attribute from the dom on click
  //as the arugumets will be passed when clicked on delete button

  const type = e.target.tagName;
  //it can give button or i tag based on click position

  const removeTask = state.taskList.filter(({ id }) => id !== targetID);
  //this will fetch filtered list of items

  state.taskList = removeTask;

  updateLocalStorage();

  if (type === "BUTTON") {
    return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
      e.target.parentNode.parentNode.parentNode
    )

    //move one step back to the from button to its parent section
    //calling it 4 times moves it 4 steps back to delete the 3rd parent div
    //removechild is predefined

  }

  return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
    e.target.parentNode.parentNode.parentNode.parentNode
  )

  //move one step back to the from button to its parent section
  //calling it 5 times moves it 5 steps back to delete the 4 parent div

};

const editTask = (e) => {
  if (!e) e = window.event;


  const targetID = e.target.id;
  const type = e.target.tagName;

  let parentNode;
  let taskTitle;
  let taskDescription;
  let taskType;
  let submitButton;
  // creation of variables

  if (type === "BUTTON") {
    parentNode = e.target.parentNode.parentNode;
  }
  else {
    parentNode = e.target.parentNode.parentNode.parentNode;
  }

  taskTitle = parentNode.childNodes[3].childNodes[3];
  taskDescription = parentNode.childNodes[3].childNodes[5];
  taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];

  submitButton = parentNode.childNodes[5].childNodes[1];


  taskTitle.setAttribute("contenteditable", "true");
  taskDescription.setAttribute("contenteditable", "true");
  taskType.setAttribute("contenteditable", "true");
  //made it editable on UI

  submitButton.setAttribute('onclick', "saveEdit.apply(this, arguments)");
  submitButton.removeAttribute("data-bs-toggle");
  submitButton.removeAttribute("data-bs-target");
  //selecting oon click and removing attributes , which makes the button popup


  submitButton.innerText = "Save Changes";
  //change the button name to save changes 
  //calles saveEdit function
};

const saveEdit = (e) => {
  if (!e) e = window.event;

  const targetID = e.target.id;
  const parentNode = e.target.parentNode.parentNode;
  //to target the header,body,footer of the divs

  const taskTitle = parentNode.childNodes[3].childNodes[3];
  const taskDescription = parentNode.childNodes[3].childNodes[5];
  const taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
  const submitButton = parentNode.childNodes[5].childNodes[1];
  //gets the updated data

  const updateData = {
    taskTitle: taskTitle.innerHTML,
    taskDescription: taskDescription.innerHTML,
    taskType: taskType.innerHTML,
  }
  //after getting data , we update state

  let stateCopy = state.taskList;

  // creating copy of the state
  // i.e copy of tasks in state copy variable

  stateCopy = stateCopy.map((task) =>
    task.id === targetID ?
      {
        id: task.id,
        title: updateData.taskTitle,
        description: updateData.taskDescription,
        type: updateData.taskType,
        url: task.url,
      }
      //map function to target a perticular element if found
      //updates the task

      //if that isn't the case send the rest of the task 
      :
      task
  );

  state.taskList = stateCopy;
  updateLocalStorage();

  taskTitle.setAttribute("contenteditable", "false");
  taskDescription.setAttribute("contenteditable", "false");
  taskType.setAttribute("contenteditable", "false");
  //previously we made the input feilds on UI editable and submit button innerhtml
  //now once we are done with our changes we should turn them back to non-editable and innerhtml of submit button and its attributes

  submitButton.setAttribute("onclick", "openTask.apply(this, argument)");

  submitButton.setAttribute('data-bs-toggle', "modal");
  submitButton.setAttribute('data-bs-target', "#showTask");

  submitButton.innerHTML = "Open Task";
};

const searchTask = (e) => {
  if (!e) e = window.event;

  while (taskContents.firstChild) {
    taskContents.removeChild(taskContents.firstChild);
  }

  const resultData = state.taskList.filter(({ title }) => {
    return title.includes(e.target.value);
    //if title includes substring in the searchbar then add it ti resultdata
  });

  //go into the tasklist and filters throught title

  resultData.map((cardData) => {
    taskContents.insertAdjacentHTML('beforeend', htmlTaskContent(cardData));
  });
  // after getting result data 
  //mapping them to tasks context
};