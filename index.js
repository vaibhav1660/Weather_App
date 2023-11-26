let searchbar = document.getElementById("searchbar");
let btn = document.getElementById("btn");
// console.log(searchbar);
// console.log(btn);

searchbar.addEventListener("keyup",async(event) => {
  // console.log(event)
  if (searchbar.value != "" && searchbar.value.replace(/\s/g, "").length) {
    if (event.code == "Enter" || event.key == "Enter") {
      //console.log("working");
      //debugger;
       await updateData(searchbar.value).then((data)=>{
        updateDisp(data);
      }).catch(()=>{
        alert("SomeThing Went Wrong Plz Try Again Later");
      })
      searchbar.value = ""; 
    }
  }
});
btn.addEventListener("click",async () =>{
    if(searchbar.value != "" && searchbar.value.replace(/\s/g,"").length){
        //console.log("working")
        updateData(searchbar.value).then((data)=>{
            updateDisp(data);
          }).catch(()=>{
            alert("SomeThing Went Wrong Plz Try Again Later");
          })
        searchbar.value = ""
    }
    else{
        alert("Enter Details First...");
        searchbar.value = "";
    }
})

async function updateData(val){
    let data = await getLocation(val);
    let key = data.Key;
    let curr = await getWeather(key);
    
    let Placename = data["LocalizedName"];
    let tempvalue = curr["Temperature"]["Metric"]["Value"]; 
    let tempunit = curr["Temperature"]["Metric"]["Unit"];
    let wtype = curr["WeatherText"];
    let wicon = curr["WeatherIcon"];
    if(wicon < 10){
        wicon = "0"+wicon;
    }
    const format = {
        "Placename" : Placename,
        "TempValue" : tempvalue,
        "TempUnit" : tempunit,
        "WeatherType" : wtype,
        "WeatherIcon" : wicon
    }
    return format;

}
/*WeatherText": "Hazy sunshine",
    "WeatherIcon": 5, */
const addchild = document.getElementById("addchild");
function updateDisp(val){
    let a = document.createElement("div");
    a.className = "col-md-4";
    let b = document.createElement("div");
    b.className = "card";
    b.style.width = "18rem";
    let c = document.createElement("img");
    c.className = "card-img-top"
    c.setAttribute("src",`https://developer.accuweather.com/sites/default/files/${val.WeatherIcon}-s.png`)
    let d = document.createElement("div");
    d.className = "card-body";
    let e = document.createElement("h3");
    e.className = "card-title";
    e.innerText = `${val.TempValue}'${val.TempUnit}`;
    let f = document.createElement("h5");
    f.className = "card-title";
    f.innerText = `${val.Placename}`;
    let g = document.createElement("p");
    g.className = "card-text";
    g.innerText = `${val.WeatherType}`;
    d.appendChild(e);
    d.appendChild(f);
    d.appendChild(g);
    b.appendChild(c);
    b.appendChild(d);
    a.appendChild(b);
    addchild.appendChild(a);
}
{/* <div class="col-md-4">
<div class="card" style="width: 18rem">
    <img
      class="card-img-top"
      src="Images/night.png"
      alt="Card image cap"
    />
    <div class="card-body">
      <h3 class="card-title">17<sup>.</sup>c</h3>
      <h5 class="card-title">Raipur</h5>
      <p class="card-text">
        sunny weather
      </p>
    </div>
  </div>        
</div> */}
