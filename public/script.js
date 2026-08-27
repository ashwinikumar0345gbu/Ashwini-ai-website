document.addEventListener('DOMContentLoaded', () => {
    // 1. स्क्रीन के एलिमेंट्स को सेलेक्ट करना (टैग और टेक्स्ट के आधार पर)
    const inputField = document.querySelector('input'); // इनपुट बॉक्स जहाँ 'Hi' लिखा है
    
    // सभी बटन में से वह बटन ढूंढें जिसमें "Ask AI" लिखा हो
    const askButton = Array.from(document.querySelectorAll('button, input[type="button"]')).find(btn => 
        btn.textContent.includes('Ask AI')
    ) || document.querySelector('button'); // अगर नहीं मिले तो डिफ़ॉल्ट पहला बटन

    // वह एलिमेंट ढूंढें जहाँ "Ashwini AI:" लिखा हुआ संदेश दिख रहा है
    const responseBox = Array.from(document.querySelectorAll('p, div, span')).find(el => 
        el.textContent.includes('Ashwini AI:')
    );

    // अगर एलिमेंट्स न मिलें तो अलर्ट दिखाएं (ताकि आपको पता चल सके)
    if (!askButton || !inputField) {
        console.error("Ashwini AI Error: HTML एलिमेंट्स नहीं मिल पाए। कृपया अपनी HTML चेक करें।");
        return;
    }

    // 2. जब यूजर "Ask AI" बटन पर क्लिक करे
    askButton.addEventListener('click', async (e) => {
        e.preventDefault(); // पेज को रीलोड होने से रोकने के लिए

        const userQuestion = inputField.value.trim();
        
        // चेक करें कि इनपुट खाली तो नहीं है
        if (!userQuestion) {
            alert("अश्विनी भाई, पहले इनपुट बॉक्स में कुछ सवाल तो लिखो!");
            return;
        }

        // स्क्रीन पर "सोच रहा हूँ..." वाला लोडिंग संदेश दिखाएं
        if (responseBox) {
            responseBox.innerHTML = `🤖 <strong>Ashwini AI:</strong> सोच रहा हूँ... थोड़ा समय दीजिए।`;
        }

        try {
            // 3. बैकएंड एक्सप्रेस सर्वर (/api/ask) को सवाल भेजना
            const response = await fetch('/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question: userQuestion })
            });

            const data = await response.json();

            // 4. बैकएंड से मिले असली एआई जवाब को स्क्रीन पर दिखाना
            if (responseBox && data.answer) {
                responseBox.innerHTML = `🤖 <strong>Ashwini AI:</strong> ${data.answer}`;
            } else if (responseBox) {
                responseBox.innerHTML = `❌ <strong>Ashwini AI:</strong> त्रुटि हुई - ${data.error || 'जवाब नहीं मिल सका।'}`;
            }

        } catch (error) {
            console.error("Fetch Error:", error);
            if (responseBox) {
                responseBox.innerHTML = `❌ <strong>Ashwini AI:</strong> सर्वर से कनेक्शन नहीं हो पाया। टर्मिनल में जांचें कि 'node server.js' चल रहा है या नहीं।`;
            }
        }
    });
});
