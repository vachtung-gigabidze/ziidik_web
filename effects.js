// Отложенная загрузка интерактивных эффектов
document.addEventListener('DOMContentLoaded', function() {
    // Добавление курсора
    const cursor = document.createElement('div');
    cursor.style.position = 'fixed';
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.backgroundColor = '#0f0';
    cursor.style.borderRadius = '50%';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.opacity = '0.7';
    cursor.style.mixBlendMode = 'difference';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = (e.pageX - 10) + 'px';
        cursor.style.top = (e.pageY - 10) + 'px';
    });
    
    // Случайные эффекты глитча для заголовков
    const headings = document.querySelectorAll('h1, h2, h3');
    
    setInterval(() => {
        if (Math.random() > 0.7) {
            const randomHeading = headings[Math.floor(Math.random() * headings.length)];
            randomHeading.style.transform = 'translateX(' + (Math.random() * 10 - 5) + 'px)';
            randomHeading.style.color = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff'][Math.floor(Math.random() * 6)];
            
            setTimeout(() => {
                randomHeading.style.transform = '';
                randomHeading.style.color = '';
            }, 100);
        }
    }, 3000);
    
    // Эффект пиксельного дождя
    function createPixelRain() {
        const pixel = document.createElement('div');
        pixel.style.position = 'fixed';
        pixel.style.width = '4px';
        pixel.style.height = '4px';
        pixel.style.backgroundColor = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff'][Math.floor(Math.random() * 6)];
        pixel.style.top = '-10px';
        pixel.style.left = Math.random() * window.innerWidth + 'px';
        pixel.style.zIndex = '-1';
        document.body.appendChild(pixel);
        
        let pos = -10;
        const fall = setInterval(() => {
            pos += 5;
            pixel.style.top = pos + 'px';
            
            if (pos > window.innerHeight) {
                clearInterval(fall);
                pixel.remove();
            }
        }, 30);
    }
    
    setInterval(createPixelRain, 100);
    
    // Резервные варианты для изображений
    const projectImages = document.querySelectorAll('.project-image img');
    projectImages.forEach(img => {
        img.addEventListener('error', function() {
            const projectName = this.closest('.project-card').querySelector('h3').textContent;
            this.src = 'data:image/svg+xml;base64,' + btoa(`
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                    <rect width="100%" height="100%" fill="#000"/>
                    <text x="50%" y="50%" font-family="Press Start 2P" font-size="12" fill="#0f0" text-anchor="middle" dy=".3em">${projectName}</text>
                </svg>
            `);
        });
    });
});