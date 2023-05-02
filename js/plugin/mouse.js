

document.addEventListener("DOMContentLoaded", function()
{ 
	 mouse();
});
// ################ END Load Iniziale ###################


/*############# CURTAIN #############*/

// we are using window onload event here but this is not mandatory
window.onload = function() {
    // track the mouse positions to send it to the shaders
    var mousePosition = {
      x: 0,
      y: 0,
    };
  
  
}

function mouse(){
/*######### Mouse cursor ################## */
var element = document.getElementById('cursor');

// Track the mouse position
let mouse = {x: 0, y: 0};
window.addEventListener('mousemove', ev => mouse = getMousePos(ev));

// Linear interpolation
const lerp = (a, b, n) => (1 - n) * a + n * b;

// Gets the mouse position
const getMousePos = e => {
    return { 
        x : e.clientX, 
        y : e.clientY 
    };
};

class Cursor {
    constructor(el) {
        this.DOM = {el: el};
        this.DOM.el.style.opacity = 0;
        
        this.bounds = this.DOM.el.getBoundingClientRect();
        
        this.renderedStyles = {
            tx: {previous: 0, current: 0, amt: 0.2},
            ty: {previous: 0, current: 0, amt: 0.2},
            scale: {previous: 1, current: 1, amt: 0.2},
            opacity: {previous: 1, current: 1, amt: 0.2}
        };

        this.onMouseMoveEv = () => {
            this.renderedStyles.tx.previous = this.renderedStyles.tx.current = mouse.x - this.bounds.width/2;
            this.renderedStyles.ty.previous = this.renderedStyles.ty.previous = mouse.y - this.bounds.height/2;
            gsap.to(this.DOM.el, {duration: 0.9, ease: 'Power3.easeOut', opacity: 1});
            requestAnimationFrame(() => this.render());
            window.removeEventListener('mousemove', this.onMouseMoveEv);
        };
        window.addEventListener('mousemove', this.onMouseMoveEv);
    }
    enter() {
        //this.renderedStyles['scale'].current = 4;
        element.classList.add('border');
        //this.renderedStyles['opacity'].current = 0.5;
    }
    leave() {
        this.renderedStyles['scale'].current = 1;
        this.renderedStyles['opacity'].current = 1;
        element.classList.remove('border');
    }
    render() {
        this.renderedStyles['tx'].current = mouse.x - this.bounds.width/2;
        this.renderedStyles['ty'].current = mouse.y - this.bounds.height/2;

        for (const key in this.renderedStyles ) {
            this.renderedStyles[key].previous = lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].amt);
        }
                    
        this.DOM.el.style.transform = `translateX(${(this.renderedStyles['tx'].previous)}px) translateY(${this.renderedStyles['ty'].previous}px) scale(${this.renderedStyles['scale'].previous})`;
        this.DOM.el.style.opacity = this.renderedStyles['opacity'].previous;

        requestAnimationFrame(() => this.render());
    }
}


const cursor = new Cursor(document.getElementById('cursor'));

[...document.querySelectorAll('a, button, iframe, .filebox label, .checkbox label,#contents.c_sub .cs_insight .csi_card .csic_item')].forEach(link => {
    link.addEventListener('mouseenter', () => cursor.enter());
    link.addEventListener('mouseleave', () => cursor.leave());
});
/* ############ End Mouse cursor ########## */
}
