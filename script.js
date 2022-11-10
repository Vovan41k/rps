

// Текст - Ваш ход
// События - Клик мыши по картинке
// Установка класса active для выбранной картинки
// Анимация хода оппонента(дым-загрузка-спираль)
// Текст - Ничья-Победа-Поражение и Вывод обоих ходов, Анимация таблички
// Обновление счёта
// Отображение кнопки "Новая игра"


// Новая игра - обнуление игры.
const imagesContainer = document.querySelector('.images')
const images = document.querySelectorAll('.images img')
const textEl = document.querySelector('.rules p')
const scoreEl = document.querySelector('.score')
const reloadEl = document.querySelector('.reload')
const score = [0,0]
let enemyImage = null
let userImage = null

let choose = ''

let enemyChoose = ''

const getResult = (choose, enemyChoose) => {
    if ((choose === 'rock' && enemyChoose === 'scissors') ||
        (choose === 'paper' && enemyChoose === 'rock') ||
        (choose === 'scissors' && enemyChoose === 'paper')) {
        return [1, 0, 'Вы победили!']
    }
    if ((choose === 'scissors' && enemyChoose === 'rock') ||
        (choose === 'rock' && enemyChoose === 'paper') ||
        (choose === 'paper' && enemyChoose === 'scissors')) {
        return [0, 1, 'Вы проиграли.']
    }
    return [0,0,'Ничья!']
}

const getRandomSign = () => {
    const signs = ['rock', 'paper', 'scissors']
    const index = Math.floor(Math.random() * signs.length)
    return signs[index]
}

const showScore = (score) => {
    scoreEl.textContent = score.join(':')
    // scoreEl.textContent = score[0]+':'+score[1]
}

const showText = (text) => {
    textEl.textContent = text
    
    
}

const showReload = () =>{
    reloadEl.style.display='block'
}

const hideReload = () =>{
    reloadEl.style.display='none'
}

const newGame = () => {
    enemyChoose=''
    choose=''
    imagesContainer.removeChild(enemyImage)
    enemyImage = null
    userImage.classList.remove('active')
    hideReload()
    showText('Ваш ход.')
}

showText('Ваш ход.')

images.forEach((image) => {
    image.onclick = () => {
        if (choose !== '') {
            return
        }
        userImage = image
        enemyChoose = getRandomSign()
        const foundImage = document.querySelector(`.images img[data-sign="${enemyChoose}"]`)
        enemyImage = foundImage.cloneNode()
        imagesContainer.appendChild(enemyImage)
        setTimeout(() => {
            enemyImage.classList.add('enemy-active')
        }, 10)
        choose = image.getAttribute('data-sign')
        image.classList.add('active')
        setTimeout(()=>{

            const [points, enemyPoints, info] = getResult(choose, enemyChoose)
            showText(info)
            score[0]+=points
            score[1]+=enemyPoints
            showScore(score)
            showReload()
        },1200)
    }
})
reloadEl.onclick=newGame
