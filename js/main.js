function getLiByNavSection(navSectionValue) {
    const anchors = document.querySelectorAll('a[data-nav-section]');
    
    // Loop through each anchor and find the one with the matching data-nav-section
    for (let anchor of anchors) {
        // Check if the current <a> has the desired data-nav-section value
        if (anchor.getAttribute('data-nav-section') === navSectionValue) {
            // If found, return the parent <li> element
             anchor.parentElement.classList.add("active");
        }
		if (anchor.parentElement.classList.contains("active") && !(anchor.getAttribute('data-nav-section') === navSectionValue))
			anchor.parentElement.classList.remove("active");
	}
}
function FadeInSection(sectionID){
	const section =document.getElementById(sectionID)
	section.classList.remove("hidden-section");
	const divs=section.querySelectorAll('div.animate__animated');
	divs.forEach(function(divitem){
		const rect=divitem.getBoundingClientRect();
		if (rect.top<=this.window.innerHeight && rect.bottom>=0){
			var effect=divitem.getAttribute('data-key');
		if (effect==="left")
			divitem.classList.add('animate__fadeInLeft');
		if (effect==="right")
			divitem.classList.add('animate__fadeInRight');
		if (effect==="top")
			divitem.classList.add('animate__fadeInDown');
		if (effect==="bottom")
			divitem.classList.add('animate__fadeInUp');
	}

	});





}
window.addEventListener('scroll', function() {
	const sections = document.querySelectorAll('section');
	
	sections.forEach(section => {
	  const rect = section.getBoundingClientRect();
	  
	  // Check if the section is in the viewport
	  if (rect.top <= window.innerHeight && rect.bottom >= 0) {
		const targetSectionId = section.getAttribute('id');
  
		// Fade in the section (you may have a function for this)
		FadeInSection(targetSectionId);
		
		// Call function to update the navigation based on the section's id
		getLiByNavSection(targetSectionId);
	  }
	});
  });
  
//handling navigation link clicks to trigger the fade-in effect
const navl= document.querySelectorAll('nav a');
navl.forEach(link=>{
	link.addEventListener('click',function(e){
		e.preventDefault();
		const targetSectionId =e.target.getAttribute('href').substring(1);
		document.getElementById(targetSectionId).scrollIntoView({
			behavior: 'smooth'
		});
		FadeInSection(targetSectionId);
		getLiByNavSection(targetSectionId);
	});
});
//counters
function animateCounter(id, start, end, duration){
	let current=start;
	const counterelem=document.getElementById(id);
	const steptime=Math.abs(Math.floor(duration/(end-start)));
	const interval=setInterval(()=>{
		current++;
		counterelem.textContent=current;
		if (current>=end){
			clearInterval(interval);
		}
	},steptime);
}
let countersAnimated = {
    counter1: false,
    counter2: false,
    counter3: false
};

// Function to handle scroll event with debouncing
let debounceTimeout;
window.addEventListener('scroll', function () {
    // Clear previous debounce timeout
    clearTimeout(debounceTimeout);

    // Set a new timeout to fire after scrolling stops
    debounceTimeout = setTimeout(() => {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            
            // Check if section is in the viewport
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                // Trigger animation for counter1, counter2, counter3 once when visible
                if (!countersAnimated.counter1) {
                    animateCounter('counter1', 0, 3, 5000);
                    countersAnimated.counter1 = true;  // Mark counter1 as animated
                }

                if (!countersAnimated.counter2) {
                    animateCounter('counter2', 0, 3, 5000);
                    countersAnimated.counter2 = true;  // Mark counter2 as animated
                }

                if (!countersAnimated.counter3) {
                    animateCounter('counter3', 0, 2, 5000);
                    countersAnimated.counter3 = true;  // Mark counter3 as animated
                }
            }
        });
    }, 200);  // 200ms debounce delay
});

// to handle progress bar animation
function animateProgressBar(progressBarId, targetValue) {
	const progressBarElement = document.getElementById(progressBarId);
	progressBarElement.style.width = `${targetValue}%`;  // Animate to target value
	progressBarElement.setAttribute('aria-valuenow', targetValue);  // Update aria value
	progressBarElement.textContent = `${targetValue}%`;  // Update text content
}

// Function to check if an element is in the viewport
function isInViewport(element) {
	const rect = element.getBoundingClientRect();
	return rect.top >= 0 && rect.top <= window.innerHeight;
}

// Handle scroll event to trigger progress bar animations
window.addEventListener('scroll', function() {
	const progressBars = document.querySelectorAll('.progress-bar');
	
	progressBars.forEach(progressBar => {
		if (isInViewport(progressBar)) {
			// Assign target values
			let targetValue;
			if (progressBar.id === 'progressBar1') {
				targetValue = 70;
			} else if (progressBar.id === 'progressBar2') {
				targetValue = 60;
			} else if (progressBar.id === 'progressBar3') {
				targetValue = 60;
			} else if (progressBar.id === 'progressBar4') {
				targetValue = 80;
			} else if (progressBar.id === 'progressBar5') {
				targetValue = 60;
			} else if (progressBar.id === 'progressBar6') {
				targetValue = 70;
			}

			// Animate the progress bar
			animateProgressBar(progressBar.id, targetValue);
			progressBar.classList.add('animated');  // Prevent animation from running again
		}
	});
});
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}
// Function to check if two elements are overlapping
function isOverlapping(element1, element2) {
	// Get the bounding rectangles of both elements
	const rect1 = element1.getBoundingClientRect();
	const rect2 = element2.getBoundingClientRect();

	// Check if there is no overlap
	const noOverlap = rect1.right < rect2.left || rect1.left > rect2.right

	// If there's no overlap, return false; otherwise, return true
	return !noOverlap;
}
function adjustLayout() {
    // Exit early if width is less than 768px
    if (window.innerWidth < 768) 
		{document.getElementById('main').width="100%";
			return};

    // Get the two elements
    const box1 = document.getElementById('main');
    const box2 = document.getElementById('sidebar2');
    const contact = document.getElementById('contact');
    const contactLi = document.getElementById('contactli');

    // Check if they overlap
    if (isOverlapping(box1, box2)) {
        box2.style.display = 'none';
        box1.style.width = '80%';
        contact.style.display = 'block';
        contactLi.style.display = 'inline';
    } else {
        box2.style.display = 'block';
        box1.style.width = '65%';
        contact.style.display = 'none';
        contactLi.style.display = 'none';
    }
}

// Initial layout adjustment
adjustLayout();



