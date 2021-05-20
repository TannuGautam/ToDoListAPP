//filter color selection
let filterColor = document.querySelectorAll(".filter");

let mainContainer = document.querySelector(".main-container");

let modalColors = document.querySelectorAll(".modal_color");

let modalContainer = document.querySelector(".modal_container");


let taskBox = document.querySelector(".task_box");

let filterContainers = document.querySelectorAll(".filter-color-container");

let plusBtn = document.querySelector(".plus");

let removeBtn = document.querySelector(".remove");

let deleteState = false;

//intial color
let iColor = "black";

let colors = ["pink","blue","green","black"];

let allTasks = [];

//init

//local storage part ***************
        

        
if(localStorage.getItem("allTasks"))
{
    let strArr = localStorage.getItem("allTasks");

    allTasks = JSON.parse(strArr);

    for(let i = 0; i < allTasks.length; i++)
    {
        createTicketFromLocalStorage(allTasks[i]);
    }
}


function createTicketFromLocalStorage(taskObj)
{
    let { id, color,task } = taskObj;

    let taskContainer = document.createElement("div");

    taskContainer.setAttribute("class", "ticket_container");

    taskContainer.innerHTML = `<div class = "ticket_color ${color}"></div>
                                    <div class="ticket_desc_container">
                                    <div class="ticket_id">#${id}</div>
                                    <div class="ticket_desc">${task}</div>
                                </div>`;
    mainContainer.appendChild(taskContainer);

    addFunctionality(taskContainer);

    handleDeleteContainer(taskContainer);

}



//******************* */

for(let i = 0; i < filterColor.length; i++ )
{
    filterColor[i].addEventListener("click", function()
    {
        let classes = filterColor[i].getAttribute("class");

        //let strArr = classes.split(" ");

        let color = strArr[1];

        let mainClasses = mainContainer.getAttribute("class");

        let mainCArr = mainClasses.split(" ");

        mainCArr[1] = color;

        mainClasses = mainCArr.join(" ");

        mainContainer.setAttribute("class",mainClasses);

    })
}

//adding the modals js part

//adding new tickets
plusBtn.addEventListener("click", function()
{
    modalContainer.style.display = "flex";
})

taskBox.addEventListener("keydown", function(e)
{
    if(e.key == "Enter" && taskBox.value != "")
    {
        let taskContainer = document.createElement("div");

        let task = taskBox.value;

        let id = Math.random().toString(32).slice(2);

        taskContainer.setAttribute("class", "ticket_container");

        taskContainer.innerHTML = `<div class = "ticket_color ${iColor}"></div>
                                        <div class="ticket_desc_container">
                                        <div class="ticket_id">#${id}</div>
                                        <div class="ticket_desc">${task}</div>
                                   </div>`;
        mainContainer.appendChild(taskContainer);

        //local storage part ***************

        let ticketObj = {};

        ticketObj.task = task;

        ticketObj.color = iColor;

        ticketObj.id = id;

        allTasks.push(ticketObj);

        let strArr = JSON.stringify(allTasks);

        localStorage.setItem('allTasks',strArr);
        
        //******************* */

        modalContainer.style.display = "none";

        taskBox.value = "";

        iColor = "black";

        addFunctionality(taskContainer);

        handleDeleteContainer(taskContainer);
    }
})

for(let i = 0; i < modalColors.length; i++)
{
    modalColors[i].addEventListener("click", function()
    {
        let color = modalColors[i].classList[1];

        iColor = color;

        //remove everyone
        for(let j = 0; j < modalColors.length; j++)
        {
            modalColors[j].classList.remove("border");
        }

        //add
        modalColors[i].classList.add("border");
    })
}

//handle color change in tickets
function addFunctionality(taskContainer)
{
    let ticketColor = taskContainer.querySelector(".ticket_color");

    ticketColor.addEventListener("click", function()
    {
        //cColor --> current color
        let cColor = ticketColor.classList[1];

        let idx = colors.indexOf(cColor);

        let newIdx = (idx + 1) % 4;

        let newColor = colors[newIdx];

        ticketColor.classList.remove(cColor);

        ticketColor.classList.add(newColor);

    //local storage part ***************
        let ticketIdElement = taskContainer.querySelector(".ticket_id");

        let id = ticketIdElement.innerText;

        id = id.slice(1);

        for(let i = 0; i < allTasks.length; i++)
        {
            if(allTasks[i].id == id)
            {
                allTasks[i].color = newColor;

                let strArr = JSON.stringify(allTasks);

                localStorage.setItem('allTasks',strArr);
            }
        }

    //******************* */
    })
}


// filtering logic , to filter out tasks based on priority ie colors
let prevColor = null;

for(let i = 0; i < filterContainers.length; i++)
{
    filterContainers[i].addEventListener("click", function()
    {
        let child = filterContainers[i].children[0];

        let color = child.classList[1];

        if(prevColor == color)
        {
            let ticketContainers = document.querySelectorAll(".ticket_container")

            for(let j = 0; j < ticketContainers.length; j++)
            {
                ticketContainers[j].style.display = "block";
            }
            prevColor = null;
        }

        else
        {
            let ticketContainers = document.querySelectorAll(".ticket_container");

            for(let j = 0; j < ticketContainers.length; j++)
            {
                let ticketColor = ticketContainers[j].children[0];

                let myColor = ticketColor.classList[1];

                if(myColor == color)
                {
                    ticketContainers[j].style.display = "block";
                }
                else
                {
                    ticketContainers[j].style.display = "none";
                }
            }

            prevColor = color;
        }
    })
}


//to remove any ticket which is created
removeBtn.addEventListener("click", function () {
    if (deleteState == false) {
        removeBtn.style.backgroundColor = "green"//"rgb(100, 71, 26)";
    } else {
        removeBtn.style.backgroundColor = "gray"//"rgb(146, 102, 35)";
    }
    deleteState = !deleteState;
});

function handleDeleteContainer(taskContainer) {
    taskContainer.addEventListener("click", function () {
        if (deleteState == true) {

            let idx = taskContainer.children[1].children[0].textContent.slice(1);

            for(let i = 0; i < allTasks.length; i++)
            {
                if(allTasks[i].id == idx)
                {
                    allTasks.splice(i,1);
                    console.log(allTasks);
                    break;
                }
            }

            //local storage

            let strArr = JSON.stringify(allTasks);

            localStorage.setItem("allTasks",strArr );
            
        //    UI remove
            taskContainer.remove();
        }
    });

}



