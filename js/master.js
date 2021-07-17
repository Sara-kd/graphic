////////////////////////////Local storageعندي الوان محفوظة ولا لا///////////////////////////////////////////
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) { 

    //   console.log('Locaal Storage is not empty you can set it on root');
    //   console.log(localStorage.getItem("color_option"));
   
    document.documentElement.style.setProperty("--main-color" ,localStorage.getItem("color_option"));
    
    //remove active class from all childrern
    document.querySelectorAll(".colorlist li").forEach ( element => {
        
        element.classList.remove("active");

        //add active class on element
        if(element.dataset.color === mainColors ){

        //add active class
        element.classList.add("active");
        }
    });
}
//random background option
let backgroundoption = true;

//variable to control the interval
let backgroundInterval;

//check if there's local storage random background 
let backgroundLocalItem = localStorage.getItem("background_option");

//check if random background local storge is not empty
if  (backgroundLocalItem !== null){
  
    if (backgroundLocalItem === 'true') {

        backgroundoption = true;
    } else {

        backgroundoption = false;

    }
}
    //remove active class from all spans
    document.querySelectorAll(".random-backgrounds span").forEach(element => {

       element.classList.remove("active"); 
    });

    if (backgroundLocalItem === 'true') {

        document.querySelector(".random-backgrounds .yes").classList.add("active");

    } else {

        document.querySelector(".random-backgrounds .no").classList.add("active");
    }

/////////////////////////////////////////Toggle ال كبسة تبع الاعدادات//////////////////////////////////////////////////////////////

//Toggle spin class on icon ليتحرك عند النقر عليه
document.querySelector(".toggle-sitting .fa-cog").onclick = function () {
    
    //Toggle rotation class on icon
    this.classList.toggle("fa-spin");
    //Toggle open class on icon
    document.querySelector(".sittings-box").classList.toggle("open");   
}
//////////////////////////////////////////// Color الالوان اللي بتتغير ///////////////////////////////////////////////////////////

// Switch color الالوان بالاعدادات
const colorli = document.querySelectorAll(".colorlist li");

//Loop on All List Items
colorli.forEach(li => {
   
     //click on every list item
     li.addEventListener("click", (e) => {
      
        //set color on root  
         document.documentElement.style.setProperty("--main-color" ,e.target.dataset.color);
        
        //set color on local storage
        localStorage.setItem("color_option" , e.target.dataset.color);
       
        handleactive(e);
        
    });
});
//////////////////////////////////////////// Color  yes noالالوان اللي بتتغير ///////////////////////////////////////////////////////////

// Switch random backgroud option الالوان بالاعدادات
const randombackel = document.querySelectorAll(".random-backgrounds span");

//Loop on All span
randombackel.forEach(span => {
   
     //click on every span
     span.addEventListener("click", (e) => {
        
        handleactive(e);
        
        if (e.target.dataset.background === 'yes') {
            
            backgroundoption = true;

            randomizeimage();

            localStorage.setItem("background_option" , true);

        } else {
            
            backgroundoption = false;

            clearInterval(backgroundInterval);
        
            localStorage.setItem("background_option" , false);
        
        }
    });
});

/////////////////////////////////////////////Landing Page///////////////////////////////////////////////////////////

//select landing page element اختيار الصورة الرئيسية
let landingpage = document.querySelector(".landing-page");

//array get of image مصفوفة الصور
let imageArray = ["1.jpg","2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg" ];

//function to randomize image
function randomizeimage () {

if (backgroundoption === true) {

    backgroundInterval = setInterval (() => { 

    //Get random number
    let randomNumber = Math.floor(Math.random() * imageArray.length);

    //change background image url
    landingpage.style.backgroundImage = 'URL("image/' + imageArray[randomNumber] + '")';

     }, 1000);
   }
}

randomizeimage();

//selesct skills selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
     
    //skills offset top
    let skillsOffsetTop = ourSkills.offsetTop;

    // skills Outer height 
    let skillsOuterHeight = ourSkills.offsetHeight;

    //window height
    let windowHeight = this.innerHeight;

    //window scroltop
    let windowscrolltop = this.pageYOffset;

    if (windowscrolltop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
         
        let allskills = document.querySelectorAll(".skill-box .skill-progress span");
        
        allskills.forEach(skill => {

            skill.style.width = skill.dataset.progress;
            
        });
    }
};

//create popup with the image
let ourgallery = document.querySelectorAll(".gallery img");

ourgallery.forEach(img => {
    img.addEventListener('click', (e) => {

        //create overlay element
        let overlay = document.createElement("div");

        //add class to overlay
        overlay.className = 'popup-overlay';

        //apend overlay to the body
        document.body.appendChild(overlay);

        //create the popup
        let popupBox = document.createElement("div");

        //add class to popupbox
        popupBox.className = 'popupBox';
        
        if (img.alt !== null) {
            
            //create heading
            let imgHeading = document.createElement("h3");

            //create text for heading
            let imgtext = document.createTextNode(img.alt);

            //apend the text to the heading
            imgHeading.appendChild(imgtext);

            //append the heading  to the popup box
            popupBox.appendChild(imgHeading);
        }
        //create image
        let popupImage = document.createElement("img");

        //set image source
        popupImage.src = img.src;

        //add image to popup bpx
        popupBox.appendChild(popupImage);

        //append popup to body
        document.body.appendChild(popupBox);

         //create the close span
         let closebutton = document.createElement("span");

         //create the close button trxt
         let closebuttontext = document.createTextNode("x");

         //append text to close  button
         closebutton.appendChild(closebuttontext);

         //add class to close button
         closebutton.className = 'close-button';

         //add class button to the popup box
         popupBox.appendChild(closebutton);
    });
});
//close popup
document.addEventListener("click", function (e) {

    if (e.target.className == 'close-button') {
    //remove the current popup 
    e.target.parentNode.remove();

    //remove overlay
    document.querySelector(".popup-overlay").remove();
    }
});
//////////////////////////////////////طريقة الذهاب لقسم اخر لما بنكبس عليها/////////////////////////////////////////////////
//select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullets");

//select All Linke
const alllinks = document.querySelectorAll(".links a");

function scrolltosomewhere(elements){
 
    elements.forEach(ele => {

        ele.addEventListener("click", (e) => {

            e.preventDefault();
    
            document.querySelector(e.target.dataset.section).scrollIntoView({
    
                behavior: 'smooth'
            });
        });
    });
}
scrolltosomewhere(allBullets);
scrolltosomewhere(alllinks);

//handle active state
function handleactive(ev) {
         
    //remove active class from all childrern
    ev.target.parentElement.querySelectorAll(".active").forEach ( element => {
        
        element.classList.remove("active");
    });
        // add active class on self
        ev.target.classList.add("active");
}

let bulletspan = document.querySelectorAll(".bullets-option span");

let bulletscontainer = document.querySelector(".nav-bullets");

let bulletlocalitem = localStorage.getItem("bullets-option")

if (bulletlocalitem !== null) {

    bulletspan.forEach(span => {

        span.classList.remove("active");
    });

    if (bulletlocalitem === 'block') {

        bulletscontainer.style.display = 'block';

        document.querySelector(".bullets-option .yes").classList.add("active");
    } else {

        bulletscontainer.style.display = 'none';

        document.querySelector(".bullets-option .no").classList.add("active");

    }
}

bulletspan.forEach(span => {

    span.addEventListener("click", (e) => {
         
        if (span.dataset.display === 'show') {

            bulletscontainer.style.display = 'block';

            localStorage.setItem("bullets-option", 'block');

        } else {
              
            bulletscontainer.style.display = 'none';

            localStorage.setItem("bullets-option", 'none');
        }

        handleactive(e);

    });
});

////Reset button

document.querySelector(".reset-option").onclick = function () {

    // localStorage.clear();
    localStorage.removeItem("color_option");
   localStorage.removeItem("bullets-option");
    localStorage.removeItem("background_option");
    //reload window
    window.location.reload();
};

////toggle menu 

let togglebtn = document.querySelector(".toggle-menu");
let tlinks = document.querySelector(".links");

togglebtn.onclick = function (e) {

    //stop propagation
    e.stopPropagation();

    //toggle class menu on button
    this.classList.toggle("menu-active");
    
    //toggle class open on links
    tlinks.classList.toggle("open");
};
//close menu in click any where
document.addEventListener("click", function (e) {

    if (e.target !== togglebtn && e.target !== tlinks) {
     
        ////خون كمان لقفل المينو من اي مكان 
        //check if menu open ]عني اذا القائمة معروضة او لاا
        if(tlinks.classList.contains("open")) {

            //toggle class menu on button
            togglebtn.classList.toggle("menu-active");
    
            //toggle class open on links
            tlinks.classList.toggle("open");
        }

    }
});

//stop propagation on menu
tlinks.onclick = function (e) {
    e.stopPropagation();
}











