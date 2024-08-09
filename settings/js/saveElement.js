// script.js

let savedValue = '';
let saveElement;

function changed() {
  if (weerlive_api_key.value === savedValue) {
    saveElement.textContent = Homey.__('settings.saved');
  } else {
    saveElement.textContent = Homey.__('settings.save');
  }
}

// Voeg andere scriptfunctionaliteit toe indien nodig
