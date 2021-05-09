//filter color selection
let filterColor = document.querySelectorAll(".filter");

let mainContainer = document.querySelector(".main-container");

let modalColors = document.querySelector(".modal_color");

let modalContainer = document.querySelector(".modal_container");

let taskBox = document.querySelector(".task_box");

let plusBtn = document.querySelector(".plus");

//intial color
let iColor = "black";

let colors = ["pink","blue","green","black"];

for(let i = 0; i < filterColor.length; i++ )
{
    filterColor[i].addEventListener("click", function()
    {
        let classes = filterColor[i].getAttribute("class");

        let strArr = classes.split(" ");

        let color = strArr[1];

        let mainClasses = mainContainer.getAttribute("class");

        let mainCArr = mainClasses.split(" ");

        mainCArr[1] = color;

        mainClasses = mainCArr.join(" ");

        mainContainer.setAttribute("class",mainClasses);

    })
}

//adding the modals js part

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
                                        <div class="ticket_id">${id}</div>
                                        <div class="ticket_desc">${task}</div>
                                   </div>`;
        mainContainer.appendChild(taskContainer);

        modalContainer.style.display = "none";

        taskBox.value = "";

        iColor = "black";
        addFunctionality(taskContainer);

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

function addFunctionality(taskContainer)
{
    let ticketColor = taskContainer.querySelector(".ticket_color");

    ticketColor.addEventListener("click", function()
    {
        //cColor --> current color
        let cColor = ticketColor.classList[i];

        let idx = colors.indexOf(cColor);

        let newIdx = (idx + 1) % 4;

        let newColor = colors[newIdx];

        ticketColor.classList.remove(cColor);

        ticketColor.classList.add(newColor);
    })
}


