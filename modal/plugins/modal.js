Element.prototype.appendAfter = function(element){
    element.parentNode.insertBefore(this, element.nextSibling)
}

function noop(){}

function _createModalFooter(buttons = []){
    if(buttons.length === 0){
        return document.createElement('div')
    }
    const wrap = document.createElement ('div') 
    wrap.classList.add('modal-footer')

    buttons.forEach(btn => {
        const $btn = document.createElement('button')
        $btn.textContent = btn.text
        $btn.classList.add('btn')
        $btn.classList.add(`btn-${btn.type || 'secondary'}`)
        $btn.onclick = btn.handler || noop

        wrap.appendChild($btn)
    })

    return wrap
}   


function _createModal(options){
    const DEFAULT_WIDTH = "600px"
    const  passwordModal = document.createElement("div")
    passwordModal.classList.add("vmodal")
    passwordModal.insertAdjacentHTML("afterbegin", `  
        <div class="modal-overlay" data-close="true">
            <div class="modal-window" style="width: ${options.width}">
                <div class="modal-header">
                   <span class="modal-title">Enter your password</span>
                   ${options.closable ? `<span class="modal-close" data-close="true">&times;</span>`: ""}  
                   </div>
                <div class="modal-body" data-content>
                    <div>
                        <label for="pass">Password:</label>
                        <input type="password" id="pass"/>
                    </div>
                </div>
            </div>
        </div>  
    `)
    const footer = _createModalFooter(options.footerButtons)
    footer.appendAfter(passwordModal.querySelector('[data-content]'))
    document.body.appendChild(passwordModal)
    return passwordModal
}




$.passwordModal = function(options){
    const ANIMITION_SPEED = 200
    const $passwordModal = _createModal(options)
    let closing = false
    let closed = true


    const passwordModal = {
        open(){
        !closing && $passwordModal.classList.add("open")
        },
        close(){
            closing = true
            $passwordModal.classList.remove("open")
            $passwordModal.classList.add("hide")
            setTimeout(() => {
                $passwordModal.classList.remove("hide")
                closing = false
                if(typeof options.onClose === 'function'){
                    options.onClose()
                }
            }, ANIMITION_SPEED)
        },
    }

    const listener = event =>{  
        if( event.target.dataset.close){//in dataset sind alle Atrribute gespeichert und wir können damit arbeiten
            passwordModal.close()
        }
    }
}

if(closed === true){
    var signBtn = document.getElementById("SignIN")
    signBtn.onclick = passwordModal._createModal()    
    passwordModal.open()
}