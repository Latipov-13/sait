document.addEventListener('DOMContentLoaded', function() {
  // Установка текущего года
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Переключение темы
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('.theme-icon');
  const themeText = themeToggle.querySelector('.theme-text');
  
  // Проверка сохраненной темы
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.remove('dark-mode');
    themeIcon.textContent = '🌙';
    themeText.textContent = 'Тёмная тема';
  }
  
  themeToggle.addEventListener('click', function() {
    const isDark = document.body.classList.toggle('dark-mode');
    
    if (isDark) {
      themeIcon.textContent = '🌞';
      themeText.textContent = 'Светлая тема';
      localStorage.setItem('theme', 'dark');
    } else {
      themeIcon.textContent = '🌙';
      themeText.textContent = 'Тёмная тема';
      localStorage.setItem('theme', 'light');
    }
  });

  // Табы курсов
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      
      // Обновляем активную кнопку
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
      });
      this.classList.add('active');
      
      // Показываем соответствующий контент с анимацией
      tabPanels.forEach(panel => {
        panel.hidden = true;
      });
      
      const targetPanel = document.getElementById(`${targetTab}-tab`);
      targetPanel.hidden = false;
      
      // Анимация появления
      targetPanel.animate([
        { opacity: 0, transform: 'translateY(20px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], {
        duration: 400,
        easing: 'ease-out'
      });
    });
  });

  // Проверка ответов в тестах
  document.querySelectorAll('.check-answer').forEach(button => {
    button.addEventListener('click', function() {
      const questionContainer = this.closest('.quiz-question');
      const selectedOption = questionContainer.querySelector('input[type="radio"]:checked');
      const feedback = questionContainer.querySelector('.quiz-feedback');
      
      if (!selectedOption) {
        feedback.textContent = 'Пожалуйста, выберите ответ';
        feedback.style.color = 'var(--error)';
        return;
      }
      
      if (selectedOption.hasAttribute('correct')) {
        feedback.textContent = 'Правильно! ✓';
        feedback.style.color = 'var(--success)';
        
        // Анимация успеха
        feedback.animate([
          { transform: 'scale(1)', opacity: 1 },
          { transform: 'scale(1.1)', opacity: 1 },
          { transform: 'scale(1)', opacity: 1 }
        ], {
          duration: 500,
          iterations: 1
        });
      } else {
        feedback.textContent = 'Неверно. Попробуйте еще раз.';
        feedback.style.color = 'var(--error)';
        
        // Анимация ошибки
        feedback.animate([
          { transform: 'translateX(0)' },
          { transform: 'translateX(-10px)' },
          { transform: 'translateX(10px)' },
          { transform: 'translateX(0)' }
        ], {
          duration: 400,
          iterations: 1
        });
      }
    });
  });

  // Форма регистрации
  const registrationForm = document.getElementById('registration-form');
  
  registrationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    
    // Сброс ошибок
    document.querySelectorAll('.form-error').forEach(el => {
      el.textContent = '';
    });
    
    // Валидация имени
    const name = this.elements.name.value.trim();
    if (!name) {
      document.getElementById('name-error').textContent = 'Пожалуйста, введите ваше имя';
      isValid = false;
    }
    
    // Валидация email
    const email = this.elements.email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      document.getElementById('email-error').textContent = 'Пожалуйста, введите email';
      isValid = false;
    } else if (!emailRegex.test(email)) {
      document.getElementById('email-error').textContent = 'Пожалуйста, введите корректный email';
      isValid = false;
    }
    
    // Валидация пароля
    const password = this.elements.password.value;
    if (!password) {
      document.getElementById('password-error').textContent = 'Пожалуйста, введите пароль';
      isValid = false;
    } else if (password.length < 6) {
      document.getElementById('password-error').textContent = 'Пароль должен быть не менее 6 символов';
      isValid = false;
    }
    
    // Отправка формы
    const formResult = document.getElementById('form-result');
    if (isValid) {
      formResult.textContent = 'Регистрация прошла успешно! Добро пожаловать!';
      formResult.className = 'form-result success';
      this.reset();
      
      // Анимация успеха
      formResult.animate([
        { opacity: 0, transform: 'translateY(20px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], {
        duration: 500,
        easing: 'ease-out'
      });
      
      // Очистка сообщения через 5 секунд
      setTimeout(() => {
        formResult.animate([
          { opacity: 1 },
          { opacity: 0 }
        ], {
          duration: 500,
          iterations: 1
        }).onfinish = () => {
          formResult.textContent = '';
          formResult.className = 'form-result';
        };
      }, 5000);
    } else {
      formResult.textContent = 'Пожалуйста, исправьте ошибки в форме';
      formResult.className = 'form-result error';
      
      // Анимация ошибки
      formResult.animate([
        { transform: 'translateX(0)' },
        { transform: 'translateX(-10px)' },
        { transform: 'translateX(10px)' },
        { transform: 'translateX(-10px)' },
        { transform: 'translateX(0)' }
      ], {
        duration: 500,
        iterations: 1
      });
    }
  });

  // Плавная прокрутка
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href') === '#') return;
      
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Анимация элементов при прокрутке
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.course-card, .feature-card');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const animationPoint = windowHeight * 0.8;
      
      if (elementPosition < animationPoint) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  // Начальное состояние для анимации
  document.querySelectorAll('.course-card, .feature-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  // Запуск анимации при загрузке и прокрутке
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);
});
