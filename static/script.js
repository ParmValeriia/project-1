document.querySelector("form").addEventListener("submit",(event)=>{
    event.preventDefault()
    fetch("/add", {
        method: "POST",
        body: new FormData(event.target)
    }).then(()=>location.reload())
})

document.querySelector(".closeBtn").addEventListener("click", ()=>{
    document.querySelector(".modal").style.display="none"
})

document.querySelector("#openBtn").addEventListener("click", ()=>{
    document.querySelector(".modal").style.display="grid"
    console.log("dfsdf")
})

// fetch("/ads").then(res=>res.json()).then(data=>{
//     console.log(data)
//     document.querySelector(".wrapper").innerHTML = data.map(el=>`
//         <div class="/ads">
//         <h3>${el.title}</h3>
//         <p>${el.desc}</p>
//         </div>
//         `).join("")
// })