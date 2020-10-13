const dropZone = document.querySelector(".drop-zone");
const fileInput = document.querySelector("#fileInput");
const browseBtn = document.querySelector(".browseBtn");
const bgProgress = document.querySelector(".bg-progress");
const copyBtn = document.querySelector("#copyBtn");
const percentDiv = document.querySelector("#percent");
const progressBar = document.querySelector("progress-bar");
const progressContainer = document.querySelector(".progress-container");
const fileURL = document.querySelector("#fileURL");
const sharingContainer = document.querySelector(".sharing-container");
const host = "http://localhost:3000/";
const uploadURL = `${host}api/files`;




dropZone.addEventListener("dragover" , (e)=>{
    e.preventDefault();
    if(!dropZone.classList.contains("dragged"))
    {
        dropZone.classList.add("dragged");
    }
});

dropZone.addEventListener("dragleave",()=>{
    dropZone.classList.remove("dragged");
});


dropZone.addEventListener("drop",(e)=>{
    e.preventDefault();
    dropZone.classList.remove("dragged");
    const files = e.dataTransfer.files;
    if(files.length)
    {
        fileInput.files = files;
        fileUpload();
    }
});

fileInput.addEventListener("change",()=>{
    fileUpload();
});

browseBtn.addEventListener("click",()=>{
    fileInput.click();
});


const fileUpload = ()=>{
    progressContainer.style.display = "block";
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("myfile",file );
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState === XMLHttpRequest.DONE)
        {
            console.log(xhr.response);
            showlink(JSON.parse(xhr.response));
        }
    };

    xhr.upload.onprogress = updateProgress;
    xhr.open("POST",uploadURL);
    xhr.send(formData)
}



function updateProgress(e) {
    const percentage = Math.round((e.loaded / e.total) * 100);
    bgProgress.style.width = `${percentage}%`;
    percentDiv.innerText = percentage;
    // progressBar.style.transform = `scaleX(${percentage/100})`;
}

const showlink=({file: url})=>{
    progressContainer.style.display="none";
    fileURL.value= url;
    sharingContainer.style.display="block";
}
fileURL.addEventListener("click", () => {
    fileURL.select();
});


