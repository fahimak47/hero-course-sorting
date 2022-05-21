const milestonesData = JSON.parse(data).data;

//load courses from Milestones data

const loadMilestones = () => {
  const milestones = document.querySelector('.milestones');

  milestones.innerHTML = `${milestonesData.map(milestone => {
    return `<div class="milestone border-b" id="${milestone._id}">
        <div class="flex d-flex align-content-center">
          <div class="checkbox"><input class="form-check-input" onclick="markMilestone(this, ${milestone._id})"  type="checkbox" /></div>
          <div onclick="openMilestone(this, ${milestone._id})">
            <p>
              ${milestone.name}
              <span> <i class="fas fa-chevron-down" id="a${milestone._id}"></i></span>
            </p>
          </div>
        </div>
        <div class="hidden_panel">
          ${milestone.modules.map(module => {
      return `<div class="module border-b">
              <p>${module.name}</p>
              </div>`;
    }).join("")}
          
        </div>
      </div>`
  }).join("")}`;
}

loadMilestones();

const openMilestone = (elem, id) => {
  const hidden_panel = elem.parentNode.nextElementSibling;
  const shown_panel = document.querySelector(".show");
  const activeText = document.querySelector(".active");
  const activeIcon = document.querySelectorAll(".fas");
  if (!hidden_panel.classList.contains("show") && shown_panel) {
    shown_panel.classList.remove("show");
    activeText.classList.remove("active");
    for (let i = 0; i < activeIcon.length; i++) {
      const element = activeIcon[ i ];
      if (element.classList.contains("fa-chevron-up")) {
        element.classList.remove("fa-chevron-up");
        element.classList.add("fa-chevron-down");
      }
    }
  }
  activeIcon[ id ].classList.toggle("fa-chevron-up");
  elem.classList.toggle("active");
  hidden_panel.classList.toggle('show');
  showMilestone(id);
}

const showMilestone = (id) => {
  const milestoneImg = document.getElementById("milestoneImage");
  const name = document.querySelector(".title");
  const details = document.querySelector(".details");
  milestoneImg.style.opacity = 0;
  name.innerText = milestonesData[ id ].name;
  details.innerText = milestonesData[ id ].description;
  milestoneImg.src = milestonesData[ id ].image;
}


const milestoneImg = document.getElementById("milestoneImage");
milestoneImg.onload = () => {
  milestoneImg.style.opacity = 1;
}


const markMilestone = (checkbox, id) => {
  const donelist = document.querySelector(".doneList");
  const milestoneList = document.querySelector(".milestones")
  const item = document.getElementById(id);

  if (checkbox.checked) {
    // mark as done
    milestoneList.removeChild(item);
    donelist.appendChild(item);
  } else {
    // mark as not done
    donelist.removeChild(item);
    // calling another function for sorting
    sortingMilestone(id, item);
  }
}

const sortingMilestone = (id, item) => {
  const milestoneList = document.querySelector(".milestones");


  if (id == 0) {
    milestoneList.insertBefore(item, milestoneList.firstElementChild);
  } else if (id == milestoneList.children.length) {
    milestoneList.appendChild(item)
  } else {
    for (let i = 0; i < milestoneList.children.length; i++) {

      if (milestoneList.children[ i ].id == id + 1) {
        milestoneList.insertBefore(item, milestoneList.children[ i ]);
      }
    }

  }
}
