

class Combobox {

    #items
    #combobox
    #comboboxValue
    #comboboxBox
    #currentPosition
    #comboElements
    #listeners

    constructor(selector = '.combobox', items = [], options = {}) {
        this.#init(selector, items, options)
    }

    #init(selector, items, options) {

        let componentDir = options.componentDir
        this.#combobox = document.querySelector(selector)
        if (items.length == 0 || componentDir === undefined) {
            // Modify the innerhtml of the slider and display error


            this.#combobox.innerHTML = `
                <div class="combobox-error">
                    Please setup correctly the combobox
                </div>
            `
            return
        }

        this.#items = items
        this.#setupView(options)
        this.#comboElements = this.#combobox.querySelectorAll(".combobox-box .combobox-item")
        this.#currentPosition = 0
        this.#listeners = []
        this.#setupEvents()
        this.#updateView()
    }

    #setupView(options) {
        let leftImagePath = options.leftImagePath
        let componentDir = options.componentDir
        this.#combobox.innerHTML = `
            <div class="combobox-input">
                <div class="combobox-left-icon ${leftImagePath === undefined ? '' : 'show'}"><img src="${leftImagePath !== undefined ? leftImagePath : ''}" alt="" /></div>
                <div class="combobox-right-icon"><img src="${componentDir}/img/chevron-down.svg" alt="" /></div>
                <div class="combobox-value"></div>
            </div>

            <div class="combobox-box">
            </div>
        `

        this.#comboboxBox = this.#combobox.querySelector('.combobox-box')
        this.#comboboxValue = this.#combobox.querySelector('.combobox-input .combobox-value')
        this.#comboboxValue.innerHTML = `${this.#items[0]}`
        this.#items.forEach((item) => {
            let element = document.createElement('div')
            element.classList.add('combobox-item')
            element.innerHTML = `${item}`
            this.#comboboxBox.appendChild(element)
        })
    }

    #setupEvents() {

        this.#comboElements.forEach((element, index) => {
            element.addEventListener('click', (event) => {
                this.#currentPosition = index
                this.#updateView()
                event.stopPropagation()
            })
        })

        let input = this.#combobox.querySelector('.combobox-input')
        input.addEventListener('click', (event) => {
            this.#combobox.classList.toggle('active')
            event.stopPropagation()
        })

        let chevronnDown = this.#combobox.querySelector('.combobox-input .combobox-right-icon')
        chevronnDown.addEventListener('click', (event) => {
            this.#combobox.classList.toggle('active')
            event.stopPropagation()
        })

        document.body.addEventListener('click', () => {
            this.#combobox.classList.remove('active')
        })

        document.addEventListener('keydown', (key) => {
            if (key.code === "ArrowDown") {
                if (this.#currentPosition + 1 < this.#items.length)
                    this.#currentPosition++
                else
                    this.#currentPosition = 0

                this.#updateView()
            }

            if (key.code === "ArrowUp") {
                if (this.#currentPosition > 0) {
                    this.#currentPosition--

                } else if (this.#currentPosition === 0) {
                    this.#currentPosition = this.#comboElements.length - 1
                }

                this.#updateView()
            }
        })
    }

    #updateView() {

        this.#comboboxValue.innerHTML = `${this.#items[this.#currentPosition]}`

        this.#comboElements.forEach((element) => {
            element.classList.remove('active')
        })
        this.#comboElements[this.#currentPosition].classList.add('active')
        this.#listeners.forEach((listener) => {
            listener(this.#currentPosition)
        })
    }

    getPosition() {
        return this.#currentPosition
    }

    getValue() {
        return this.#items[this.#currentPosition]
    }

    addPositionChangeListener(listener) {
        this.#listeners.push(listener)
    }
}