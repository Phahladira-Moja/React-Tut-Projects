import bot from "./assets/bot.svg";
import bot from "./assets/user.svg";

const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat_container");

let loadInterval;

function loader(element) {
  element.textContent = "";

  loadInterval = setInterval(() => {
    element.textContent += ".";

    if (element.textContent === "...") {
      element.textContent = "";
    }
  }, 300);
}

function typeText(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHtml += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

function generateUniqueId() {
  const timestamp = Date.now;
  const randomNumber = Math.random();
  const hexadecimal = randomNumber.toString();

  return `id=${timestamp}-${hexadecimal}`;
}

function chatStripe(isAi, value, uniqueId) {
  return `
      <div class="wrapper" ${isAi && "ai"}>
        <div class="chat">
          <div className="profile">
            <img 
              src="${isAi ? bot : user}"
              alt="${isAi ? "bot" : "user"}"
            />
          </div>
          <div class="message" id=${uniqueId}>
            ${value}
          </div>
        </div>
      </div>
    `;
}

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  // user's chatstripe
  chatContainer.innerHTML += chatStripe(false, data.get("prompt"));
};
