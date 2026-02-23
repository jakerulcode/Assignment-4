let interviewList = [];
let rejectedList = [];
let currentStatus="all";

let jobResultCount = document.getElementById('job-result-count');

let total = document.getElementById("total-count");
let interviewCount = document.getElementById("interview-count");
let rejectCount = document.getElementById("rejected-count");

const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");

const allCardsSection = document.getElementById("all-cards");
const mainContainer = document.querySelector("main");
const filteredSection = document.getElementById("filtered-section");
const emptyBox =document.getElementById('empty-box'); 

function calculateCount() {
  total.innerText = allCardsSection.children.length;
  interviewCount.innerText = interviewList.length;
  rejectCount.innerText = rejectedList.length;
  // jobResultCount.innerText = interviewList.length + "of" +allCardsSection.children.length;

}
calculateCount();

function togglingStyle(id) {
  allFilterBtn.classList.remove("bg-[#3B82F6]", "text-white");
  interviewFilterBtn.classList.remove("bg-[#3B82F6]", "text-white");
  rejectedFilterBtn.classList.remove("bg-[#3B82F6]", "text-white");

  allFilterBtn.classList.add("bg-[#FFFFFF]", "text-[#64748B]");
  interviewFilterBtn.classList.add("bg-[#FFFFFF]", "text-[#64748B]");
  rejectedFilterBtn.classList.add("bg-[#FFFFFF]", "text-[#64748B]");

  const selected = document.getElementById(id);

  currentStatus = id

  selected.classList.remove("bg-[#FFFFFF]", "text-[#64748B]");
  selected.classList.add("bg-[#3B82F6]", "text-white");

  // for toggling empty document

  emptyBox.classList.add("hidden");
  filteredSection.classList.add("hidden");
  allCardsSection.classList.add("hidden");

  if (id == "interview-filter-btn") {

    if (interviewList.length === 0) {
      emptyBox.classList.remove("hidden");
    } else {
      filteredSection.classList.remove("hidden");
      renderInterview();
    }

  } 
  else if (id == "rejected-filter-btn") {

    if (rejectedList.length === 0) {
      emptyBox.classList.remove("hidden");
    } else {
      filteredSection.classList.remove("hidden");
      renderRejected();
    }

  } 
  else if (id == "all-filter-btn") {
    allCardsSection.classList.remove("hidden");
  }
  
}

mainContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("interview-btn")) {
    const parenNode = event.target.parentNode.parentNode;
    const companyName = parenNode.querySelector(".company-name").innerText;
    const position = parenNode.querySelector(".position").innerText;
    const jobType = parenNode.querySelector(".job-type").innerText;
    const statusBtn = parenNode.querySelector(".status-btn").innerText;
    const descriptionP = parenNode.querySelector(".description").innerText;

    parenNode.querySelector(".status-btn").innerText = "Interview";

    const cardInfo = {
      companyName,
      position,
      jobType,
      statusBtn: "Interview",
      descriptionP,
    };
    const companyExist = interviewList.find(item=> item.companyName==cardInfo.companyName)

    if (!companyExist) {
      interviewList.push(cardInfo);
    }

    rejectedList=rejectedList.filter(item=> item.companyName !=cardInfo.companyName)

    calculateCount()
    renderInterview()
    
  }
   else if (event.target.classList.contains("reject-btn")) {
    const parenNode = event.target.parentNode.parentNode;
    const companyName = parenNode.querySelector(".company-name").innerText;
    const position = parenNode.querySelector(".position").innerText;
    const jobType = parenNode.querySelector(".job-type").innerText;
    const statusBtn = parenNode.querySelector(".status-btn").innerText;
    const descriptionP = parenNode.querySelector(".description").innerText;

    parenNode.querySelector(".status-btn").innerText = "Rejected";

    const cardInfo = {
      companyName,
      position,
      jobType,
      statusBtn: "Rejected",
      descriptionP,
    };
    const companyExist = rejectedList.find(item=> item.companyName==cardInfo.companyName)

    if (!companyExist) {
      rejectedList.push(cardInfo);
    }

    interviewList=interviewList.filter(item=> item.companyName !=cardInfo.companyName)

    if(currentStatus=="interview-filter-btn"){
      renderInterview();
    }

    calculateCount()
    
    
  }
});

function renderInterview() {
  filteredSection.innerHTML = ``;

  for (let interview of interviewList) {
    console.log(interview);
    let div = document.createElement("div");
    div.className =
      "card-container flex justify-between bg-white border border-[#F1F2F4] rounded-lg p-6";
    div.innerHTML = `
             <div class="left space-y-3">
            <p class="company-name font-semibold text-[#002C5C] text-[18px]">
              ${interview.companyName}
            </p>
            <p class="position text-[#64748B]">${interview.position}</p>
            <br />
            <p class="job-type text-[#64748B] text-[14px]">
              ${interview.jobType}
            </p>
            <button
              class="status-btn py-2 px-3 bg-[#EEF4FF] rounded-sm text-[14px] font-medium uppercase text-[#002C5C]"
            >
              ${interview.statusBtn}
            </button>
            <p class="description text-[14px] text-[#323B49] font-normal">
             ${interview.descriptionP}
            </p>

            <div class="buttons-container flex gap-2">
              <button
                class="py-2 px-3 bg-white border border-[#10B981] rounded-lg text-green text-[#10B981] font-semibold cursor-pointer"
              >
                interview
              </button>
              <button
                class="py-2 px-3 bg-white border border-[#EF4444] rounded-lg text-[14px] font-semibold text-[#EF4444] cursor-pointer"
              >
                Rejected
              </button>
            </div>
          </div>

          <!-- right-card-1 -->
          <div class="right">
            <button
              id="delete-btn"
              class="p-3 border border-gray-300 rounded-full bg-white text-gray-400 cursor-pointer"
            >
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>

        `;
    filteredSection.appendChild(div);
  }
}


                  // rejected funtion
function renderRejected() {
  filteredSection.innerHTML = ``;

  for (let rejected of rejectedList) {
    console.log(rejected);
    let div = document.createElement("div");
    div.className =
      "card-container flex justify-between bg-white border border-[#F1F2F4] rounded-lg p-6";
    div.innerHTML = `
             <div class="left space-y-3">
            <p class="company-name font-semibold text-[#002C5C] text-[18px]">
              ${rejected.companyName}
            </p>
            <p class="position text-[#64748B]">${rejected.position}</p>
            <br />
            <p class="job-type text-[#64748B] text-[14px]">
              ${rejected.jobType}
            </p>
            <button
              class="status-btn py-2 px-3 bg-[#EEF4FF] rounded-sm text-[14px] font-medium uppercase text-[#002C5C]"
            >
              ${rejected.statusBtn}
            </button>
            <p class="description text-[14px] text-[#323B49] font-normal">
             ${rejected.descriptionP}
            </p>

            <div class="buttons-container flex gap-2">
              <button
                class="py-2 px-3 bg-white border border-[#10B981] rounded-lg text-green text-[#10B981] font-semibold cursor-pointer"
              >
                interview
              </button>
              <button
                class="py-2 px-3 bg-white border border-[#EF4444] rounded-lg text-[14px] font-semibold text-[#EF4444] cursor-pointer"
              >
                Rejected
              </button>
            </div>
          </div>

          <!-- right-card-1 -->
          <div class="right">
            <button
              id="delete-btn"
              class="p-3 border border-gray-300 rounded-full bg-white text-gray-400 cursor-pointer"
            >
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>

        `;
    filteredSection.appendChild(div);
  }
}
