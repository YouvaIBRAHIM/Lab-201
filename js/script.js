import "./contact.js";
import "./tours.js";
import "./header.js";


const videoContainer = document.querySelector('.videos .container');
const video = document.querySelector('.videos .container iframe');
const presentation = document.querySelector('.videos .container .presentation');
const toWatchVideoBtn = document.querySelector('.toWatchVideo');
const presentationP = document.querySelector('.videos .container .presentation .text');
const presentationExpand = document.querySelector('.videos .container .presentation a');
const presentationExpandSpan = document.querySelector('.videos .container .presentation a span');
const avisP = document.querySelector('.videos .container .avis .text');
const avisExpand = document.querySelector('.videos .container .avis .avisExpand');
const avisExpandSpan = document.querySelector('.videos .container .avis .avisExpand span');
presentationExpand.addEventListener('click', (event) => {
   event.preventDefault();
   presentationExpandSpan.classList.toggle('expanded');
   presentationP.classList.toggle('expanded');
   
})
avisExpand.addEventListener('click', (event) => {
   event.preventDefault();
   avisExpandSpan.classList.toggle('expanded');
   avisP.classList.toggle('expanded');
   
})
let screenHeight = window.innerHeight;
let videoOnTop;
if (window.innerWidth > 550) {
   let screenWidth = window.innerWidth;
   video.style.width = ((screenWidth*50) / 100) + "px"; 
   video.style.height = ((screenHeight*45) / 100) + "px";
   videoOnTop = ((-screenHeight / 2) + 50) + 'px';
   videoContainer.style.top = videoOnTop;
   
}

let isOnCenter = false;
document.addEventListener('scroll', (event) => {
   if (window.innerWidth > 550) {
      if (scrollY <= screenHeight/4) {
      if (window.innerWidth > 550) {
         let screenWidth = window.innerWidth;
         video.style.width = ((screenWidth*50) / 100) + "px"; 
      }
      isOnCenter = true;
      presentation.classList.remove("display")
      videoContainer.styletransition = "all .1s";
      videoContainer.style.marginTop = '0px';
      videoContainer.style.position = 'relative';
      videoContainer.style.top = videoOnTop;
      videoContainer.style.marginTop = '0';
      setTimeout(() => {
         videoContainer.style.transform = "scale(0.6)";
      },200);
      }
      if ( scrollY >= screenHeight/2 && scrollY <= screenHeight - (screenHeight/4)) {
         if (window.innerWidth > 1440) {
            let screenWidth = window.innerWidth;
            video.style.width = ((screenWidth*40) / 100) + "px"; 
         }
         
         if (isOnCenter == true) {
            presentation.classList.add("display")
            
         }
         videoContainer.style.position = 'absolute';
         videoContainer.style.top = (scrollY + (screenHeight/4))+ 'px';
         setTimeout(() => {
            videoContainer.style.transform = "scale(1)";
         },100);
      }
      if (scrollY >= screenHeight - (screenHeight/4) && scrollY <= screenHeight - (screenHeight/5)) {
         videoContainer.style.transform = "scale(1)";
         videoContainer.style.position = 'relative';
         videoContainer.style.top = 'auto';
         isOnCenter = false;
         
         
      }
   }
   
   
})
toWatchVideoBtn.addEventListener('click', (event) => {
   setTimeout(() => {
      videoContainer.style.transform = "scale(1)";
      presentation.classList.add("display")
      
   }, 500);
})
