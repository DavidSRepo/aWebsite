window.addEventListener('load', function(){



const bounce = document.createElement("div")
bounce.style.position = "absolute"
bounce.style.width = "100px"
bounce.style.height = "100px"
bounce.style.zIndex = -1;
document.body.appendChild(bounce)
bounceCount = null
bounceGoal = 5
count = null
colorIndex = 0
colorIndexB = 0
x=50
y=50
xvel=1
yvel=1
currentTimer = null;
gameVisible = false
style = 'norm'
bounce.style.backgroundColor = "black"






const colors =  ["red", "orange", "yellow", "green", "blue", "indigo", "violet"] 
const colorsB =["#f94144", "#f'ArrowLeft'22c", "#f8961e","#f9c74f", "#90be6d", "#43aa8b", "#577590"]
const motifs = [
    "It's a marathon, not a sprint.",
    "We are not individuals experiencing the universe, but the universe experiencing individuality .",
    //"If anybody makes it in the family, it'll be you.",
    "Live up to your potential.",
    "Make it a great day or not, the choice is yours.",
    "If you're not first, you're last.",
    "Hall of fame, or hall of shame. Always find a way to be remembered.",
    "Be your biggest cheerleader.",
    "A wise mans life is based around f*** you.",
    "Ball is life.",
    "F*** it, we ball.",
    "F*** it, we live.",
    "Top 10, not 10.",
    "Thug that s*** out.",
    "Life hard but we go harder.",
    "Don't forget to smile.",
    "Don't Over Think ----.",
    "Sometimes worse is better.",
    "Most people don't even like themselves, don't worry about if they like you or not.",
    "Being bad at something is the first step at being good at something.",
    "I talk to myself because I like talking to intellegent people.",
    "You should take people by surprise, and do something they wouldn't expect you to do."
]
const dracula = [
    "There are bugs in my skin and I need to get them out.",
    "The worms in my head won't shut the hell up.",      
    "The bugs are back.",
    "Money isn't real, and it really is them damn phones."
]






function headLiner(){
   const headLineElement =  document.getElementById('headLine')
   if(headLineElement){
    headLineElement.innerHTML = motifs[count]
   }
   else{
    console.error("Element with id 'headLine' not found.")
   }
}






function startBounce(style){
    if(currentTimer){
       clearInterval(currentTimer)
       currentTimer = null;
    }
    currentTimer = setInterval(()=>{
        if(style === 'norm'){
            normBounceLogic();
        }
        else if (style === 'reverse'){
            reverseBounceLogic();
        }
    }, 1500/60)

}





function normBounceLogic(){
    bounceOccured = false

    x+=xvel*5
    y+=yvel*5

    if(x<0){
        x = 0
        xvel = 1
        bounce.style.backgroundColor = colors[colorIndex]
        colorIndex = (colorIndex + 1) % colors.length
        bounceOccured = true
        
    }
    else if(x>window.innerWidth - bounce.offsetWidth) {
        x = window.innerWidth - bounce.offsetWidth
        xvel = -1
        bounce.style.backgroundColor = colors[colorIndex]
        colorIndex = (colorIndex + 1) % colors.length
        bounceOccured = true
        
        }
    if(y<0){
        y = 0
        yvel = 1
        bounce.style.backgroundColor = colors[colorIndex]
        colorIndex = (colorIndex + 1) % colors.length
        bounceOccured = true
        
    }
    else if(y>window.innerHeight - bounce.offsetHeight) {
        y = window.innerHeight - bounce.offsetHeight
        yvel = -1
        bounce.style.backgroundColor = colors[colorIndex]
        colorIndex = (colorIndex + 1) % colors.length
        bounceOccured = true
        
    }

    if(bounceOccured){
        bounceCount = bounceCount + 1
        if (bounceCount > bounceGoal){
            bounceCount = 0
            count = (count  + 1) % motifs.length
            headLiner();
        }
    }

    
    bounce.style.left = x+"px"
    bounce.style.top = y+"px"

}


function reverseBounceLogic(){
    bounceOccured = false

    x+=xvel*5
    y+=yvel*5
    
    if(x<0){
    xvel = 1
    document.body.style.background = colorsB[colorIndexB]
    colorIndexB = (colorIndexB + 1) % colorsB.length
    bounceOccured = true
    }
    else if(x>window.innerWidth - bounce.offsetWidth) {
    x = window.innerWidth - bounce.offsetWidth
    xvel = -1
    document.body.style.background = colorsB[colorIndexB]
    colorIndexB = (colorIndexB + 1) % colorsB.length
    bounceOccured = true
    }
    if(y<0){
    yvel = 1
    document.body.style.background = colorsB[colorIndexB]
    colorIndexB = (colorIndexB + 1) % colorsB.length
    bounceOccured = true
    }
    else if(y>window.innerHeight - bounce.offsetHeight) {
    y = window.innerHeight - bounce.offsetHeight
    yvel = -1
    document.body.style.background = colorsB[colorIndexB]
    colorIndexB = (colorIndexB + 1) % colorsB.length
    bounceOccured = true
    }

    if(bounceOccured){
        bounceCount = bounceCount + 1
        if (bounceCount > bounceGoal){
            bounceCount = 0
            count = (count  + 1) % motifs.length
            headLiner();
        }
    }


    bounce.style.left = x+"px"    
    bounce.style.top = y+"px" 
    

}


function normBounce(){
    bounce.style.backgroundColor = "black"
    document.body.style.backgroundColor = "#FFE4E1"
    startBounce('norm')
}
function reverseBounce(){
    document.body.style.backgroundColor = "grey"
    bounce.style.backgroundColor = "white"
    startBounce('reverse')
}





normBounce();




if (window.location.pathname.includes('index.html')){
    const switchButtonElement = this.document.getElementById('switchButton')
    switchButtonElement.addEventListener('click',function(){
        if (style ==='norm'){
            reverseBounce();
            style = 'reverse'
        }
        else {
            normBounce();
            style ='norm'
        }
    })
}

});