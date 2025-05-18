document.addEventListener('DOMContentLoaded', function() {
  // Navigation buttons
  const meetTeamBtn = document.getElementById('meet-team-btn');
  const exploreSubjectsBtn = document.getElementById('explore-subjects-btn');
  
  // Carousel elements
  const carousel = document.querySelector('.carousel-container');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const carouselItems = document.querySelectorAll('.carousel-item');
  
  // Dialog elements
  const subjectDialog = document.getElementById('subject-dialog');
  //const customizeDialog = document.getElementById('customize-dialog');
  const dialogTitle = document.getElementById('dialog-title');
  const dialogImage = document.getElementById('dialog-image');
  const dialogDescription = document.getElementById('dialog-description');
  const closeButtons = document.querySelectorAll('.close-dialog');
  const subjectButtons = document.querySelectorAll('[data-subject-id]');
 // const customizeBtn = document.getElementById('customize-btn');
  // Contact form
  const contactForm = document.getElementById('contact-form');
  
  // Subject data
  const subjects = [
    {
      id: 1,
      title: "Mathematics",
      description: "This is a preview of our mathematics AR application for grade 3 students. The app provides interactive mathematics learning experiences aligned with the Lebanese curriculum.",
      imageSrc: "images/math.jpeg"
    },
    {
      id: 2,
      title: "Science",
      description: "This is a preview of our science AR application for grade 3 students. The app provides interactive science learning experiences aligned with the Lebanese curriculum.",
      imageSrc: "images/hart.jpeg"
    }
  ];
  
  // Smooth scrolling to team section
  meetTeamBtn.addEventListener('click', function() {
    const teamSection = document.getElementById('team');
    teamSection.scrollIntoView({ behavior: 'smooth' });
  });
  
  // Smooth scrolling to subjects section
  exploreSubjectsBtn.addEventListener('click', function() {
    const subjectsSection = document.getElementById('subjects');
    subjectsSection.scrollIntoView({ behavior: 'smooth' });
  });
  
  // Carousel functionality
  let currentIndex = 0;
  const itemWidth = carouselItems[0].offsetWidth;
  const itemCount = carouselItems.length;
  
  function updateCarouselButtons() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= itemCount - 1;
  }
  
  prevBtn.addEventListener('click', function() {
    if (currentIndex > 0) {
      currentIndex--;
      carousel.scrollTo({
        left: currentIndex * itemWidth,
        behavior: 'smooth'
      });
      updateCarouselButtons();
    }
  });
  
  nextBtn.addEventListener('click', function() {
    if (currentIndex < itemCount - 1) {
      currentIndex++;
      carousel.scrollTo({
        left: currentIndex * itemWidth,
        behavior: 'smooth'
      });
      updateCarouselButtons();
    }
  });
  
  carousel.addEventListener('scroll', function() {
    const scrollPos = carousel.scrollLeft;
    currentIndex = Math.round(scrollPos / itemWidth);
    updateCarouselButtons();
  });
  
  // Initialize carousel buttons
  updateCarouselButtons();
  
  // Handle window resize for carousel
  window.addEventListener('resize', function() {
    const newItemWidth = carouselItems[0].offsetWidth;
    carousel.scrollTo({
      left: currentIndex * newItemWidth,
      behavior: 'auto'
    });
  });
  
  // Dialog functionality
  function openDialog(dialogElement) {
    dialogElement.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }
  
  function closeDialog(dialogElement) {
    dialogElement.classList.remove('open');
    document.body.style.overflow = ''; // Re-enable scrolling
  }
  
  // Close dialogs when clicking close buttons
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const dialogParent = button.closest('.dialog');
      if (dialogParent) {
        closeDialog(dialogParent);
      }
    });
  });
  
  // Close dialogs when clicking outside content
  document.querySelectorAll('.dialog').forEach(dialog => {
    dialog.addEventListener('click', function(event) {
      if (event.target === dialog) {
        closeDialog(dialog);
      }
    });
  });
  
  // Open subject dialog when clicking subject buttons
  subjectButtons.forEach(button => {
    button.addEventListener('click', function() {
      const subjectId = parseInt(button.getAttribute('data-subject-id'));
      const subject = subjects.find(s => s.id === subjectId);
      
      if (subject) {
        dialogTitle.textContent = subject.title + ' AR Application';
        dialogImage.src = subject.imageSrc;
        dialogImage.alt = subject.title + ' AR App Screenshot';
        dialogDescription.textContent = subject.description;
        openDialog(subjectDialog);
      }
    });
  });
  
  // Open customize dialog
  // customizeBtn.addEventListener('click', function() {
  //   openDialog(customizeDialog);
  // });
  
  // Handle contact form submission
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Construct mailto link
    const mailtoLink = `mailto:AMH20020@students.aust.edu.lb?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\n\n${message}`)}`;
    
    // Open mail client
    window.location.href = mailtoLink;
    
    // Reset form
    contactForm.reset();
    
    // Show confirmation (could be replaced with a toast notification)
    alert('Email client opened. Your message is ready to be sent.');
  });
  
  // Handle keyboard events for dialogs
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      document.querySelectorAll('.dialog.open').forEach(dialog => {
        closeDialog(dialog);
      });
    }
  });
  
  // Implement responsive behavior for carousel on window resize
  function adjustCarousel() {
    const viewportWidth = window.innerWidth;
    
    if (viewportWidth >= 768) {
      // Show 2 items at once on tablet and above
      carouselItems.forEach(item => {
        item.style.flex = '0 0 50%';
        item.style.maxWidth = '50%';
      });
    } else {
      // Show 1 item at once on mobile
      carouselItems.forEach(item => {
        item.style.flex = '0 0 100%';
        item.style.maxWidth = '100%';
      });
    }
    
    // Reset carousel position and update button states
    carousel.scrollTo({
      left: 0,
      behavior: 'auto'
    });
    currentIndex = 0;
    updateCarouselButtons();
  }
  
  // Call once on load
  adjustCarousel();
  
  // Attach to window resize event
  window.addEventListener('resize', adjustCarousel);
});
