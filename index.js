const adviceText = document.querySelector('.card-text');
const idAdvice = document.querySelector('.card-title');
const buttonAdvice = document.querySelector(".button")
const loadingState = document.querySelector(".loading")

function loadingGenerate(isLoading) {
  loadingState.style.display = isLoading ? "grid" : "none";
  adviceText.classList.toggle("hidden", isLoading)
}
loadingGenerate(false);
buttonAdvice.addEventListener("click", function fetchAdvice() {
  loadingGenerate(true);
  fetch('https://api.adviceslip.com/advice', {
    headers: { Accept: 'application/json' },
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    adviceText.textContent = '"'+data.slip.advice+'"';
    idAdvice.textContent = "ADVICE # "+data.slip.id;
  })
  .catch((error) => {
    console.error("There is a fetching problem:", error);
  }).finally(()=>{
    loadingGenerate(false);
  });
});  
document.addEventListener("DOMContentLoaded", function(){
    const divider = document.querySelector(".divider");
    const desktopWidth = 1024;
    const svgDesktop = `
          <svg width="444" height="16" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fill-rule="evenodd">
                  <path fill="#4F5D74" d="M0 8h196v1H0zM248 8h196v1H248z" />
                  <g transform="translate(212)" fill="#CEE3E9">
                    <rect width="6" height="16" rx="3" />
                    <rect x="14" width="6" height="16" rx="3" />
                  </g>
                </g>
              </svg>
      `;
  
    const svgMobile = `
          <svg width="295" height="16" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fill-rule="evenodd">
                  <path fill="#4F5D74" d="M0 8h122v1H0zM173 8h122v1H173z" />
                  <g transform="translate(138)" fill="#CEE3E9">
                    <rect width="6" height="16" rx="3" />
                    <rect x="14" width="6" height="16" rx="3" />
                  </g>
                </g>
              </svg>
      `;
    function updateSvg(){
        if(window.innerWidth < desktopWidth){
            divider.innerHTML = svgMobile
        }else{
            divider.innerHTML = svgDesktop
        }
    }
    updateSvg()
    window.addEventListener("resize", updateSvg)
});
fetchAdvice() 
