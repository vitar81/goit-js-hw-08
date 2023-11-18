import throttle from 'lodash.throttle';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.feedback-form');
  const emailInput = form.querySelector('input[name="email"]');
  const messageInput = form.querySelector('textarea[name="message"]');

  const saveToLocalStorage = () => {
    const formData = {
      email: emailInput.value,
      message: messageInput.value,
    };
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  };

  const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem('feedback-form-state');
    if (savedData) {
      const { email, message } = JSON.parse(savedData);
      emailInput.value = email;
      messageInput.value = message;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const formData = {
      email: emailInput.value,
      message: messageInput.value,
    };
    console.log('Form submitted:', formData);

    localStorage.removeItem('feedback-form-state');
    emailInput.value = '';
    messageInput.value = '';
  };

  form.addEventListener('input', throttle(saveToLocalStorage, 500));
  form.addEventListener('submit', handleSubmit);

  loadFromLocalStorage();
});
