let info=[]
let setLocalFlag=false
let editFlag=false
let editIndex
let getInfo=JSON.parse(localStorage.getItem("listInfo"))
if(!getInfo){
    localStorage.setItem("listInfo",JSON.stringify([]))
}
//Xử lí hàm click vào hình ảnh
function clickImg(){
    document.querySelector(".card-button-default").style.border="2px solid blue"
    document.querySelector(".card-message").textContent=``
}


//dừng load trang khi submit
document.querySelector(".submit-form").addEventListener("submit",(e)=>
    e.preventDefault()
)
// Hàm render thông tin
function displayInfo(){
    let html=``;
    let currentInfo=JSON.parse(localStorage.getItem("listInfo"))
    for(let i=0;i<currentInfo.length;i++){
        html+=`
        <tr>
            <td><img src="${currentInfo[i].img}" alt="card-pic" class="picOfCard"/></td>
            <td id="cardNumber${i}">${currentInfo[i].cardNumber.slice(0, 7)}*******${currentInfo[i].cardNumber[14]}${currentInfo[i].cardNumber[15]}</td>
            <td>${currentInfo[i].expiryDate}</td>
            <td id="CVV${i}">***</td>
            <td>
            <button class="view" id="view${i}" onclick="viewNumber(${i})">View</button>
            <button class="edit" id="edit${i}" onclick="pressEdit(${i})">Edit</button>
            <button class="delete" onclick="deleteCard(${i})">Delete</button>
            </td>
        </tr>
        `
    }
    document.querySelector("#info-show").innerHTML=html
    clearInfo()
}
displayInfo()
//Hàm lấy dữ liệu từ input
function getInputInfo(ele){
    return document.getElementById(ele).value
}
//Hàm gán giá trị lại cho input
function setInputValue(ele,value){
    document.getElementById(ele).value=value
}
//Hàm xóa thông tin khi nhấn save
function clearInfo(){
    setInputValue("input-card-number","")
    setInputValue("input-date","")
    setInputValue("input-CVC","")
}

//Hàm add thông tin vào local
function addInfo(){
    if(setLocalFlag){
    let getInfo=JSON.parse(localStorage.getItem("listInfo"))
    let carNumberInfo = getInputInfo("input-card-number")
    let expiryDate = getInputInfo("input-date")
    let CVC= getInputInfo("input-CVC")
    let url=document.getElementById("card-button-default").src
    let flag=true
    let count
    if(!editFlag){
    getInfo.push(
        {
            img:url,
            cardNumber:carNumberInfo,
            expiryDate:expiryDate,
            CVC:CVC,
        }
    )}
    else{
        getInfo[editIndex].CVC=CVC;
        getInfo[editIndex].cardNumber=carNumberInfo;
        getInfo[editIndex].expiryDate =expiryDate;
        getInfo[editIndex].img=url
        editFlag=false
    }
    localStorage.setItem("listInfo",JSON.stringify(getInfo))
    displayInfo()
}}

//xử lí button view

function viewNumber(i){
    let getInfo=JSON.parse(localStorage.getItem("listInfo"))
    let cardNumber= getInfo[i].cardNumber
    let CVC= getInfo[i].CVC
    if(document.getElementById(`view${i}`).textContent=="View"){
        document.getElementById(`view${i}`).textContent="Hidden"
        document.getElementById(`cardNumber${i}`).textContent=cardNumber
        document.getElementById(`CVV${i}`).textContent=CVC
    }
    else{
        document.getElementById(`view${i}`).textContent="View"
        let masked=String(cardNumber.slice(0, 7) + "*******" +cardNumber[14]+cardNumber[15]);
        document.getElementById(`cardNumber${i}`).textContent=masked
        document.getElementById(`CVV${i}`).textContent="***"
    }
}

//xử lí button edit
function pressEdit(index) {
    let getInfo1=JSON.parse(localStorage.getItem("listInfo"))
    setInputValue("input-card-number", getInfo1[index].cardNumber);
    setInputValue("input-date", getInfo1[index].expiryDate);
    setInputValue("input-CVC", getInfo1[index].CVC);
    editFlag=true
    editIndex=index
}
//Xử lí nút Delete
function deleteCard(i){
    let getInfo1=JSON.parse(localStorage.getItem("listInfo"))
    getInfo1.splice(i,1)
    localStorage.setItem("listInfo",JSON.stringify(getInfo1))
    displayInfo()
}

//Xử lí hàm Validate
function clickImgError(){
    document.querySelector(".card-message").textContent="Visa unavailable"
}
// Xử lí Validate Card Number
let cardNumers=document.getElementById("input-card-number")
cardNumers.addEventListener("blur",()=>{
    let result=cardNumers.value
    if(result.length!=16){
        document.querySelector(".card-number-message").textContent="Please enter exactly 16 numbers"
        document.querySelector(".card-number-message").style.color="red"
        setLocalFlag=false
    } else{
        document.querySelector(".card-number-message").textContent=""
        setLocalFlag=true
    }
})
// Xử lí Validate Expiry Date
let cardDate=document.getElementById("input-date")
cardDate.addEventListener("blur",()=>{
    let result=cardDate.value
    let date=result.split("/")
    let Month=date[0]
    let Year=date[1]
    if(!result.includes("/")||Month<1||Month>12||Year.length!=2){
        document.querySelector(".date-message").textContent="Please enter the correct format for month and year"
        document.querySelector(".date-message").style.color="red"
        setLocalFlag=false
    } else{
        document.querySelector(".date-message").textContent=""
        setLocalFlag=true
    }
})
// Xử lí Validate CVC
let cardCVC=document.getElementById("input-CVC")
cardCVC.addEventListener("blur",()=>{
    let result=cardCVC.value
    if(result.length!=3){
        document.querySelector(".password-message").textContent="Please enter exactly 3 numbers"
        document.querySelector(".password-message").style.color="red"
        setLocalFlag=false
    } else{
        document.querySelector(".password-message").textContent=""
        setLocalFlag=true
    }
})
