const images   = ['images/img.png', 'images/img5.png', 'images/img2.png', 'images/img3.png'];
let imageIndex = 0;
//
const timeBeforeAnimate = 3000; // in ms
const AnimateVisible    = 10000; // in ms
//
let messages = [
    {
        from: 'bot',
        content: `
            Bonjour 👋,<br>
            je suis Clicky, votre assistant virtuelle !<br>
            Propulsée par l'IA générative, je vous aide à trouver des produits, à répondre à vos questions et à vous guider vers les bonnes pages.<br>
            Je suis encore en apprentissage, alors merci pour votre patience pendant que je continue de m'améliorer 😊.
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
    const changeImgBtn = document.querySelector('.change_img');
    const buttonImg    = document.querySelector('.clicky_cont .button_cont img');
    const widgetImg    = document.querySelector('.widget_cont img.logo');
    const favicon      = document.querySelector("link[rel~='icon']");
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
        // Bot reponse
        setTimeout(() => {
            const botReply = {
                from: 'bot',
                content: "Merci pour votre aimable message ! 😊 (Réponse automatique)"
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
                    // Peut arriver si l'utilisateur n'a pas encore interagi avec la page
                    console.warn("Le son ne peut pas être joué automatiquement :", e);
                });
            }
            if (avatar) avatar.classList.add('attention');   
        }
    }, timeBeforeAnimate); // 3000ms = 3 seconds
    //
    setTimeout(() => {
        notif.classList.remove('show');
        avatar.classList.remove('attention');
    }, timeBeforeAnimate+AnimateVisible); // 3s in + 5s visible
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
    //
    changeImgBtn.addEventListener('click', () => {
        if(imageIndex+1 === images.length){imageIndex = 0}
        else {imageIndex = imageIndex+1;}
        //
        buttonImg.src = images[imageIndex];
        widgetImg.src = images[imageIndex];
        favicon.href  = images[imageIndex];
    })
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        onSend(e.msg);
    })
});
