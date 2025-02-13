
import {  addMessage_ia } from "../main.js";

export async function getOllamaResponseStream(model, prompt, signal) {
    const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: model,
            prompt: prompt,
            stream: true  // Streaming activado
        }),
        signal: signal  // Pasar el controlador de señal para cancelación
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    try {
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n").filter(line => line.trim() !== "");

            for (const line of lines) {
                try {
                    const json = JSON.parse(line);
                    if (json.response) {
                        console.log(json.response);  // Muestra en la consola
                        // Agrega texto a la página
                        addMessage_ia(json.response, 'assistant');
                    }
                } catch (error) {
                    console.error("Error al procesar JSON:", error);
                }
            }
        }
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Streaming cancelado.');
        } else {
            console.error('Error en el streaming:', error);
        }
    }
}


