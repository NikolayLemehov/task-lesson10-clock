import './clock.styl';

function clock(selector) {
  const widgetTemplate = `
        <div class="clock_button-container">
            <div class="clock_button">on/off</div>
        </div>
        <div class="clock_display-container">
            <div class="clock_display" id="clockId">
                <span class="hour click-allow">00</span>:<span class="min click-allow">00</span><span class="switch-mod click-allow">:</span><span class="sec switch-mod click-allow">00</span>
            </div>
        </div>
  `;
  const rootElement = document.querySelector(selector);
  let intervalId;
  let switchOnOff = false;
  let switchFullFormatTime = true;
  let clockIdElem;
  let hiddenElements;

  function renderStatic() {
    rootElement.innerHTML = widgetTemplate;
    clockIdElem = document.getElementById('clockId');
    hiddenElements = rootElement.querySelectorAll('.switch-mod');
  }

  function stopInterval() {
    console.log('Interval stopped');
    clearInterval(intervalId);
  }

  function startInterval() {
    console.log('Interval started!');
    intervalId = setInterval(function () {
      updateTime();
    }, 1000);
    updateTime();
  }

  function resetInterval() {
    stopInterval();
    startInterval();
  }

  function switchOffClock() {
    switchOnOff = !switchOnOff;
    stopInterval();
    clockIdElem.children[0].innerHTML = '00';
    clockIdElem.children[1].innerHTML = '00';
    clockIdElem.children[3].innerHTML = '00';
  }

  function switchOnClock() {
    switchOnOff = !switchOnOff;
    resetInterval();
  }

  function updateTime() {
    let dateArrClock = new Date();
    let hours = dateArrClock.getHours();
    if (hours < 10) hours = '0' + hours;
    clockIdElem.children[0].innerHTML = hours;

    let minutes = dateArrClock.getMinutes();
    if (minutes < 10) minutes = '0' + minutes;
    clockIdElem.children[1].innerHTML = minutes;

    let seconds = dateArrClock.getSeconds();
    if (seconds < 10) seconds = '0' + seconds;
    clockIdElem.children[3].innerHTML = seconds;
  }

  function toggleDisplayMod() {
    switchFullFormatTime = !switchFullFormatTime;
    if (switchFullFormatTime) {
      for (let hiddenElement of hiddenElements) {
        hiddenElement.classList.remove('hidden');
      }
    } else {
      for (let hiddenElement of hiddenElements) {
        hiddenElement.classList.add('hidden');
      }
    }
  }

  function handleEvents() {
    rootElement.addEventListener('click', function (e) {
      if (e.target.classList.contains('clock_button')) {
        if (switchOnOff) {
          switchOffClock();
        } else {
          switchOnClock();
        }
      }
    });
    rootElement.addEventListener('dblclick', function (e) {
      if (e.target.classList.contains('clock_display')) {
        toggleDisplayMod();
      }
      if (e.target.classList.contains('click-allow')) {
        toggleDisplayMod();
      }
    })
  }

    function init() {
      renderStatic();
      handleEvents();
    }

    init();
  }

  export {clock};
