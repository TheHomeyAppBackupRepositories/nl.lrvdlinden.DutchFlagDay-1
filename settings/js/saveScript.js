// saveScript.js

// a method named 'onHomeyReady' must be present in your code
function onHomeyReady(Homey) {
  saveElement = document.getElementById('save');

  // Use the correct translation key or a static string
  saveElement.textContent = Homey.__('settings.save') || 'Close';

  saveElement.addEventListener('click', async (e) => {
    // Redirect to the specified URL when the Save button is clicked
    window.open('https://community.homey.app/t/83738', '_blank');
    //window.location.href = 'https://community.homey.app/t/83738';
  });

  Homey.ready();
}
