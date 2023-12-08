const makeSlideshow = (sliderId) => {
 let currentIdx = 0
 let timerId = undefined
 const sliderContent = document.querySelector(`#${sliderId} .slider-content`)
 const dots = document.querySelector(`#${sliderId} .slider-dots`)
 const itemCount = sliderContent.childElementCount
 const nextBtn = document.querySelector(`#${sliderId} .next-btn`)
 const previousBtn = document.querySelector(`#${sliderId} .previous-btn`)

 const startTimer = () => {
  timerId = setInterval(() => {
   handleNext()
  }, 5000)
 }

 const clearTimer = () => {
  if (timerId) {
   window.clearInterval(timerId)
  }
  startTimer()
 }

 const handleClickDot = (e) => {
  const clickedDot = e.target.closest('span')
  if (!clickedDot) return

  clearTimer()
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
  clearTimer()
  currentIdx++
  if (currentIdx >= itemCount) currentIdx = 0
  sliderContent.style.transform = `translateX(-${currentIdx * 100}%)`
  handleRemoveActive()
  dots
   .querySelector(`span:nth-child(${currentIdx + 1})`)
   .classList.add('active')
 }

 const handlePrevious = () => {
  clearTimer()
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
