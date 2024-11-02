const passwordModal = $.modal({
    title: "Enter your Password:",
    closable: true,
    width: '400px',
    footerButtons:[
        {text: 'Close', type: 'primary', handler(){
            console.log('Primary btn clicked')
            passwordModal.close()
        }},
    ]
})




document.addEventListener('click',  event => {
    event.preventDefault()
    const id = +event.target.dataset.id
    const btnType  = event.target.dataset.btn
    if(btnType === 'Sign in'){
        passwordModal.open()
    }

})