// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Particles configuration
particlesJS('particles-js',
  {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#397bdb"
      },
      "shape": {
        "type": "circle",
      },
      "opacity": {
        "value": 0.5,
        "random": false,
      },
      "size": {
        "value": 3,
        "random": true,
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#0a192f",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "repulse": {
          "distance": 100,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        }
      }
    },
    "retina_detect": true
  }
);

// Add scroll event listener for navbar
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.backgroundColor = 'rgba(45, 52, 54, 0.9)';
    } else {
        nav.style.backgroundColor = 'var(--primary-color)';
    }
});

// Particle system
const particleConfig = {
    particleCount: 200,
    particleSpread: 10,
    speed: 0.1,
    particleColors: ['#ffffff', '#ffffff'],
    particleBaseSize: 100,
    moveParticlesOnHover: true,
    cameraDistance: 20
};

class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.mouse = new THREE.Vector2(0, 0);
        this.clock = new THREE.Clock();

        this.init();
        this.createParticles();
        this.animate();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);
        this.camera.position.z = particleConfig.cameraDistance;

        window.addEventListener('resize', () => this.onWindowResize(), false);
        if (particleConfig.moveParticlesOnHover) {
            window.addEventListener('mousemove', (e) => this.onMouseMove(e), false);
        }
    }

    createParticles() {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleConfig.particleCount * 3);
        const colors = new Float32Array(particleConfig.particleCount * 3);

        for (let i = 0; i < particleConfig.particleCount; i++) {
            // Position
            positions[i * 3] = (Math.random() - 0.5) * particleConfig.particleSpread;
            positions[i * 3 + 1] = (Math.random() - 0.5) * particleConfig.particleSpread;
            positions[i * 3 + 2] = (Math.random() - 0.5) * particleConfig.particleSpread;

            // Color
            const color = new THREE.Color(
                particleConfig.particleColors[Math.floor(Math.random() * particleConfig.particleColors.length)]
            );
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: particleConfig.particleBaseSize * 0.01,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const time = this.clock.getElapsedTime() * particleConfig.speed;

        if (this.particles) {
            this.particles.rotation.x = Math.sin(time * 0.2) * 0.1;
            this.particles.rotation.y = Math.cos(time * 0.5) * 0.15;
            
            if (particleConfig.moveParticlesOnHover) {
                this.particles.position.x = -this.mouse.x;
                this.particles.position.y = -this.mouse.y;
            }

            const positions = this.particles.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i] += Math.sin(time + i) * 0.01;
                positions[i + 1] += Math.cos(time + i) * 0.01;
            }
            this.particles.geometry.attributes.position.needsUpdate = true;
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize particle system
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('particles-container');
    new ParticleSystem(container);

    // Keep the existing smooth scrolling code
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Ripple effect for buttons
document.querySelectorAll('.resume-btn, .contact-btn, .project-links a').forEach(button => {
    // Add ripple class
    button.classList.add('btn-ripple');
    
    // Add click handler
    button.addEventListener('click', function(e) {
        // Create ripple element
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        // Get position
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Position ripple
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        // Add ripple to button
        this.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

