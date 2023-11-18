import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const keyStorage = 'feedback-form-state';

let formData = {};

const saveToLocalStorage = throttle(e => {
  formData[e.target.name] = e.target.value.trim();
  localStorage.setItem(keyStorage, JSON.stringify(formData));
}, 500);

formEl.addEventListener('input', saveToLocalStorage);
formEl.addEventListener('submit', handleSubmit);
document.addEventListener('DOMContentLoaded', loadSavedData);

function loadSavedData() {
  try {
    const data = localStorage.getItem(keyStorage);
    if (!data) return;
    formData = JSON.parse(data);
    Object.entries(formData).forEach(([key, val]) => {
      formEl.elements[key].value = val;
    });
  } catch (error) {
    console.log(error.message);
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const formFields = formEl.elements;
  const isFormValid = Array.from(formFields).every(
    field => field.value.trim() !== ''
  );

  if (!isFormValid) {
    alert('Please fill in all fields before submitting.');
    return;
  }

  localStorage.removeItem(keyStorage);
  console.log(formData);
  formData = {};
  event.target.reset();
}
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
