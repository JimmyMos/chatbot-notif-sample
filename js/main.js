const timeBeforeAnimate = 3000; // in ms
const AnimateVisible    = 10000; // in ms
//
let messages = [
    {
        from: 'bot',
        content: `
            Hello 👋,<br>
            I'm Chaty, your virtual assistant!<br>
            Powered by generative AI, I help you find products, answer your questions, and guide you to the right pages.<br>
            I'm still learning, so thank you for your patience while I keep improving 😊.
        `
    }
]
//
window.addEventListener('DOMContentLoaded', () => {
    const notif        = document.createElement('span');
    const sound        = document.getElementById('notifSound');
    const avatar       = document.querySelector('.clicky_cont .button_cont img');
    const widget       = document.querySelector('.clicky_cont .widget_cont');
    const buttonCont   = document.querySelector('.clicky_cont .button_cont');
    const closeBtn     = document.querySelector('.close');
    const messagesCont = document.querySelector('.widget_cont .main');
    const messageForm  = document.querySelector('.widget_cont form');
    const messageInput = document.querySelector('.widget_cont form input');
    //
    let wasWidgetOpened = false;
    let isWidgetOpen    = false;
    //
    function openWidget(){
        widget.classList.add('open'); 
        notif.classList.remove('show');
        avatar.classList.remove('attention');
        wasWidgetOpened = true;
        isWidgetOpen    = true;
    }
    function closeWidget(){
        widget.classList.remove('open');
        isWidgetOpen   = false;
    }
    function setMessages(){
        messages.forEach(m => {
            const msgSpan = document.createElement('span');
            msgSpan.className = `msg ${m.from}`; // 'bot' | 'user'
            msgSpan.innerHTML = m.content;
            messagesCont.appendChild(msgSpan);
        });
    }
    function onSend(e) {
        //
        const input = messageInput;
        const userMsg = input.value.trim();
        //
        messages.push({
            from: 'user',
            content: userMsg
        });
        //
        const msgSpan = document.createElement('span');
        msgSpan.className = 'msg user';
        msgSpan.textContent = userMsg;
        messagesCont.appendChild(msgSpan);
        //
        input.value = '';
        messagesCont.scrollTop = messagesCont.scrollHeight;
        //
        // Bot response
        setTimeout(() => {
            const botReply = {
                from: 'bot',
                content: "Thanks for your kind message! 😊 (Auto-reply)"
            };
            messages.push(botReply);

            const replySpan = document.createElement('span');
            replySpan.className = 'msg bot';
            replySpan.innerHTML = botReply.content;
            messagesCont.appendChild(replySpan);
            messagesCont.scrollTop = messagesCont.scrollHeight;
            sound.play();
        }, 1000);
    }
    //
    setMessages();
    //
    setTimeout(() => {
        if(!wasWidgetOpened){
            notif.className = 'notification show';
            notif.textContent = 'Need help? Click me!';
            buttonCont.insertBefore(notif, avatar);
            if (sound) {
                sound.play().catch(e => {
                    // Might happen if the user hasn't interacted with the page yet
                    console.warn("Sound cannot be played automatically:", e);
                });
            }
            if (avatar) avatar.classList.add('attention');   
        }
    }, timeBeforeAnimate); // 3000ms = 3 seconds
    //
    setTimeout(() => {
        notif.classList.remove('show');
        avatar.classList.remove('attention');
    }, timeBeforeAnimate+AnimateVisible); // 3s in + 10s visible
    setTimeout(() => {
        notif.style.display = 'none';
    }, timeBeforeAnimate+AnimateVisible+400);
    //
    [avatar, notif].forEach(e => {
        e.addEventListener('click', () => {
            if (widget) {
                if(isWidgetOpen){
                    closeWidget();
                }else{
                    openWidget();
                }
            }
        }) 
    });
    closeBtn.addEventListener('click', () => {
        if (widget) {
            closeWidget();
        }
    })
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        onSend(e.msg);
    })
});