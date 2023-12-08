const makeSlideshow = (sliderId) => {
 let currentIdx = 0
 let timerId = null
 const slider = document.getElementById(sliderId)

 if (!slider) return

 const sliderContent = slider.querySelector('.slider-content')
 const itemCount = sliderContent.childElementCount
 const dots = slider.querySelector('.slider-dots')
 const nextBtn = slider.querySelector('.next-btn')
 const previousBtn = slider.querySelector('.previous-btn')

 const startTimer = () => {
  timerId = setInterval(() => {
   handleNext()
  }, 5000)
 }

 const clearAndResumeTimer = () => {
  if (timerId) {
   window.clearInterval(timerId)
  }
  startTimer()
 }

 const handleClickDot = (e) => {
  const clickedDot = e.target.closest('span')
  if (!clickedDot) return

  clearAndResumeTimer()
  currentIdx = clickedDot.dataset.index

  handleRemoveActive()
  clickedDot.classList.add('active')
  sliderContent.style.transform = `translateX(-${currentIdx * 100}%)`
 }

 const handleRemoveActive = () => {
  dots.querySelectorAll('span').forEach((tag) => {
   tag.classList.remove('active')
  })
 }

 const handleNext = () => {
  clearAndResumeTimer()
  currentIdx++
  if (currentIdx >= itemCount) currentIdx = 0
  sliderContent.style.transform = `translateX(-${currentIdx * 100}%)`
  handleRemoveActive()
  dots
   .querySelector(`span:nth-child(${currentIdx + 1})`)
   .classList.add('active')
 }

 const handlePrevious = () => {
  clearAndResumeTimer()
  currentIdx--
  if (currentIdx < 0) currentIdx = itemCount - 1
  sliderContent.style.transform = `translateX(-${currentIdx * 100}%)`
  handleRemoveActive()
  dots
   .querySelector(`span:nth-child(${currentIdx + 1})`)
   .classList.add('active')
 }

 nextBtn.onclick = handleNext
 previousBtn.onclick = handlePrevious
 dots.onclick = handleClickDot
 startTimer()
}
