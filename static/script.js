document.querySelector("form").addEventListener("submit",(event)=>{
    event.preventDefault()
    fetch("/add", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: event.target["title"].value,
            desc:event.target["desc"].value,
        })
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