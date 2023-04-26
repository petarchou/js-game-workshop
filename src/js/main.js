const startScrn = document.querySelector('.start-screen');
startScrn.addEventListener('click',(e)=>{
    e.currentTarget.classList.add('hidden');
    console.log('start game');
})