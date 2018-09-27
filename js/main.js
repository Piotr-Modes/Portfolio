
window.onload = function(){
    
///////////////HELPER FUNCTION FOR TOGGLING CLASSES///////////////////////    

    function toggleClass(id,cl) {
        const element = document.getElementById(id);

        if (element.classList) { 
            element.classList.toggle(cl);
        } else {
            const i = element.className.split(" ").indexOf(cl);

            if (i >= 0) 
                classes.splice(i, 1);
            else 
                classes.push(cl);
                element.className = classes.join(" "); 
        }
    }
    
 ///////////HELPER FUNCTION ADDING EVENT LISTENERS TO CLASS MEMBERS/////////// 
    function addEventToArray(classname,ev,fun){
        
        let arr = document.getElementsByClassName(classname);
        
        Array.from(arr).forEach(function(element){
          element.addEventListener(ev, fun);

        });
    }
    
///////////////////////////NAV OVERLAY ON MOBILE///////////////////////////////////   
    
    function toggleNav(){
        console.log("nav");
        toggleClass("navIcon","navigation__icon--open");
        toggleClass("navButton","navigation__button--open");
        toggleClass("nav","overlay");
        /*toggleClass("navList","navigation__nav--open");*/


        //addEventToArray("nav__ul__item","click",toggleNav);
        if(document.getElementsByClassName("overlay")[0]){
            document.getElementsByClassName("overlay")[0].addEventListener("click",toggleNav);
        }else{
            document.getElementById("nav").removeEventListener("click",toggleNav);
        }

    }
    

    
    document.getElementById("navButton").addEventListener("click", toggleNav);
    
/*const classname = document.getElementsByClassName("nav__ul__item");   
    
Array.from(classname).forEach(function(element){
      element.addEventListener('click', toggleNav);
    });*/

    

////////////CALLING ONSCROLL FUNCTIONS///////////////

    window.onscroll = function() {
        scrollSpy()
        toggleSticky()
    };
    
//////////////////STICKY NAVBAR//////////////////////////////    

    const navbar = document.getElementById("nav");
    let sticky = navbar.offsetTop;

    function toggleSticky() {
      if (window.pageYOffset > sticky) {
        navbar.classList.add("sticky")
      } else {
        navbar.classList.remove("sticky");
      }
    }
    
 
    addEventToArray("page-link","click",function(event){
        console.log(event.target)
        
        let id = event.target.attributes.dest.value;
        scrollToTarget(id);
    });
    
 
    
    
////////////////////////////////SMOOTH SCROLLING TO TARGET/////////////////////////////////////// 
    
    let scrollSpeed = 80;
    let easing = 0.01;
    let y;
    let oldPageOff;

    function scrollToTarget(targetId) {
      let targetEl = document.getElementById(targetId);
      let targetOff = targetEl.offsetTop;
      let pageOff = window.pageYOffset;
      
        easing<2?easing +=80/window.innerHeight:easing-=80/window.innerHeight;

        Math.abs(targetOff-pageOff)<Math.abs(y)?y=Math.abs(targetOff-pageOff):y= scrollSpeed*easing;
        if(targetOff<pageOff){
            y*=-1;

            //margin*=-1;
        }
        window.scrollBy(0,y);
        
        console.log("easing");
        
        oldPageOff = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        
        if(Math.abs(targetOff-pageOff)> y&&oldPageOff!==pageOff){
          window.requestAnimationFrame(function() {
            scrollToTarget(targetId);
        });
        }else{

            scrollSpeed=80;
            easing=0.01};
    }
    
    
//////////////////////////////SCROLL SPY CODE//////////////////////////////////////////////////    
    
    const sections = document.querySelectorAll(".scroll");

    function scrollSpy(){
        
      const scrollPos =  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
//WHEN ON THE BOTTOM OF PAGE GIVE THE ACTIVE CLASS TO THE LAST ITEM IN NAV ("CONTACT")     
        
      if ((window.innerHeight +scrollPos) >= document.body.offsetHeight) {
          
          document.getElementsByClassName( 'active' )[0].classList.remove( 'active' );
          document.querySelector( '.nav__ul__item:last-of-type' ).classList.add( 'active' );
          
      }else{
          for ( let i in sections )
            if (  sections[i].offsetTop <= scrollPos+150 ) {
              const id = sections[i].id;
              document.getElementsByClassName( 'active' )[0].classList.remove( 'active' );
              document.querySelector( `a[dest=${ id }]` ).parentNode.classList.add( 'active' );
            }
      }
    }
    
////////////////////////////////////////////////////////////////////////////////////////////////////    
    
    
    
    
    
    
    
    
    
    
    
    
    
////////////////////////////////////BACKGROUND EFFECT/////////////////////////////////////////////   
    
    
    
      function init(){
       
        const c = document.getElementById('can');
        const ctx = c.getContext('2d');
        c.width = window.innerWidth;
        c.height = window.innerHeight;
        let cW = c.width;
        let cH = c.height;
          
        let phrases = [];
        let ticks = 0;
        
        const COLORS = [
            
           '#9BE1FB', '#C5EFFD', '#FFFFFF', 
		   '#FFFFFF', '#006295'
        
        ]
        
        const CODE = [
            "this.",
            "*",
            "if",
            "for",
            "let",
            "=>",
            "</>",
            "return",
            "const",
            "+",
            "?",
            "^",
            "$",
            "{}",
            "()",
            "||",
            "[]",
            "/",
            ";",
            "''",
            "$",
            "!==",
            ":",
            "&&"
        ]
//////////////////////////////PHRASE CLASS/////////////////////////////////      
        
        function Phrase(){
            
            this.x = cW +5;
            this.y = (Math.random() * cH-15)+15;
            this.r = 2;
            this.ySpeed =0/*(Math.random() * 9)+0.5*/;
            this.xSpeed =(Math.random() * 9)+1.5;
            this.font = `${Math.floor(Math.random() * 200)+10}px bolder, Inconsolata, monospace, Arial`;
            this.fillColor = COLORS[Math.floor(Math.random() * COLORS.length-1)];
            this.alpha = (Math.random()*0.1)+0.05;  
            this.num = CODE[Math.floor(Math.random() * CODE.length-1)] || "if";
            
            this.render = function(){
        
                ctx.globalAlpha =this.alpha;
                ctx.beginPath();
                ctx.font = this.font;
                ctx.fillText(this.num,this.x,this.y);
                ctx.fillStyle = this.fillColor;
                ctx.fill();
                ctx.closePath();
                
            }
            
            this.update = function(){
                
                this.y += this.ySpeed;
                this.x -= this.xSpeed;
                this.render();
                
            }
            
        }
        
///////////////////////MAIN LOOP////////////////////////////////////////
          
        function loop() {
           
            ctx.clearRect(0,0,cW,cH);
            
            if(ticks === 4){
                const phrase = new Phrase();
                phrases.push(phrase);
                ticks = 0;
            }
            for(var i = 0; i<phrases.length;i++){
             
                if(phrases[i].x<-1000){
                    
                    phrases.splice(i,1);
                    i--;
                    
                }else{
                    phrases[i].update();
                }
            }
          
            ticks++;
            console.log(phrases.length);
        }
          
///////////////////////////////////////////////////////////////////////
              
          
        setInterval(loop,50);
    }
    
    init();

}

























