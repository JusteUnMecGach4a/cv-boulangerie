/* ==========================================================================
   INTERACTIONS & LOGIC FOR MATHEO'S CV
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. DOM Elements
    const themeToggleBtn = document.getElementById('theme-toggle');
    const printBtn = document.getElementById('print-button');
    const body = document.body;

    const sunIcon = themeToggleBtn.querySelector('.sun-icon');
    const flameIcon = themeToggleBtn.querySelector('.flame-icon');
    const btnText = themeToggleBtn.querySelector('.btn-text');

    // 2. Theme Toggle System (Mode Jour / Mode Fournil)
    // Check saved theme from localStorage
    const savedTheme = localStorage.getItem('cv-theme') || 'light';
    
    if (savedTheme === 'dark') {
        applyDarkTheme();
    } else {
        applyLightTheme();
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            applyDarkTheme();
            localStorage.setItem('cv-theme', 'dark');
        } else {
            applyLightTheme();
            localStorage.setItem('cv-theme', 'light');
        }
    });

    function applyDarkTheme() {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        
        // Update icons
        sunIcon.classList.add('hidden');
        flameIcon.classList.remove('hidden');
        
        // Update text
        btnText.textContent = "Mode Jour";
        themeToggleBtn.setAttribute('title', "Changer pour l'ambiance Jour");
    }

    function applyLightTheme() {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        
        // Update icons
        sunIcon.classList.remove('hidden');
        flameIcon.classList.add('hidden');
        
        // Update text
        btnText.textContent = "Mode Fournil";
        themeToggleBtn.setAttribute('title', "Changer pour l'ambiance Fournil");
    }

    // 2.5 Holiday System (Fête des Mères auto-detection)
    const HOLIDAYS = [
        { name: 'mothers-day', month: 4, day: 31, range: 7 }
    ];

    function getActiveHoliday() {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentDay = now.getDate();

        for (const holiday of HOLIDAYS) {
            const holidayDate = new Date(now.getFullYear(), holiday.month, holiday.day);
            const diffTime = holidayDate - now;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (currentMonth === holiday.month && currentDay === holiday.day) return holiday.name;
            if (diffDays > 0 && diffDays <= holiday.range) return holiday.name;
        }
        return 'neutral';
    }

    function initHoliday() {
        const holiday = getActiveHoliday();
        body.setAttribute('data-holiday', holiday);
        if (holiday === 'mothers-day') {
            const banner = document.querySelector('.holiday-banner');
            if (banner) banner.classList.remove('d-none');
        }
    }

    initHoliday();

    // 3. Print / PDF Generation System
    printBtn.addEventListener('click', () => {
        // Soft haptic feedback / visual effect on click before opening dialog
        printBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            printBtn.style.transform = 'translateY(-1px)';
            window.print();
        }, 150);
    });

    // 4. Fun Console Message for bakers
    console.log(
        "%c🥖 Mathéo Canova-Prevot - Futur Apprenti Boulanger 🥖\n%cCe CV web interactif a été conçu pour impressionner les maîtres d'apprentissage. Bonne chance pour l'alternance !",
        "color: #b45309; font-size: 16px; font-weight: bold; font-family: serif;",
        "color: #5b4a3e; font-size: 12px; font-style: italic;"
    );
});
