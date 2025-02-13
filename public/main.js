import { getOllamaResponseStream } from "./models/Stream_models.js";


// Para detener el Streaming
// Crea un controlador para poder abortar la solicitud si es necesario
const controller = new AbortController();
const signal = controller.signal;

const chatMessages = document.querySelector('.chat-messages');
const chatInput = document.querySelector('.chat-input input');
const chatButton = document.querySelector('#send');
const clearButton = document.querySelector('#clear');
const stopButton = document.querySelector('#stop');
const modelo = document.querySelector('#modelo');




// enviar pregunta
chatButton.addEventListener('click', () => {
// accediendo al modelo
const model_ia = modelo.value;
const userMessage = chatInput.value;



// llamando al modelo
getOllamaResponseStream(model_ia,userMessage,signal)

    
    if (userMessage.trim() !== '') {
        addMessage(userMessage, 'user');
        chatInput.value = '';

        // Simulación de respuesta del asistente
        // setTimeout(() => {
        //     addMessage('Esta es una respuesta simulada del asistente.', 'assistant');
        // }, 1000);
    }



});

clearButton.addEventListener('click', () => {
    chatMessages.innerHTML = '';
});

stopButton.addEventListener('click', () => {
    // Ejemplo de cómo detener el streaming después de 5 segundos
    setTimeout(() => {
        controller.abort();
        addMessage('El asistente ha sido detenido.', 'assistant')
    }, 2000);
    





});

 

 function addMessage(message, sender) {  
  const  messageElement = document.createElement('div')
    messageElement.classList.add('message', sender);
    messageElement.innerText = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

export function addMessage_ia(message, sender) {  
    const  messageElement = document.createElement('span')
      messageElement.classList.add('message', sender);
      messageElement.innerText = message;
      chatMessages.appendChild(messageElement);
      chatMessages.scrollTop = chatMessages.scrollHeight;
     
      // elimina todas las etiquetas span think y br
       // Selecciona el contenedor padre
       // Selecciona todas las etiquetas span dentro del contenedor padre
    


  }

