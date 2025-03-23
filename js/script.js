document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Set profile information from config
    document.querySelector('.bio-section h1').textContent = config.name;
    document.querySelector('.tagline').textContent = config.tagline;
    
    // Handle bio as an array of paragraphs
    const bioContainer = document.querySelector('.bio');
    bioContainer.innerHTML = ''; // Clear existing content
    
    // Create a paragraph for each bio entry
    if (Array.isArray(config.bio)) {
        config.bio.forEach(paragraph => {
            const p = document.createElement('p');
            p.textContent = paragraph;
            p.className = 'bio-paragraph';
            bioContainer.appendChild(p);
        });
    } else {
        // Fallback for backwards compatibility
        bioContainer.textContent = config.bio;
    }
    
    // Generate links from config
    const linksContainer = document.querySelector('.links-container');
    linksContainer.innerHTML = ''; // Clear any existing links
    
    config.links.forEach(link => {
        const linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.className = 'link-card';
        linkElement.setAttribute('target', '_blank');
        linkElement.setAttribute('rel', 'noopener noreferrer');
        
        // Special case for email links (no target="_blank")
        if (link.url.startsWith('mailto:')) {
            linkElement.removeAttribute('target');
            linkElement.removeAttribute('rel');
        }
        
        linkElement.innerHTML = `
            <i class="${link.icon}"></i>
            <span>${link.name}</span>
            <i class="fas fa-arrow-right arrow"></i>
        `;
        
        linksContainer.appendChild(linkElement);
    });
    
    // Theme detection from system preferences
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Function to set the theme
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }
    
    // Set initial theme based on system preference
    if (prefersDarkScheme.matches) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
    });
    
    // Add subtle animations to links
    const links = document.querySelectorAll('.link-card');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
});
