

class SStat {

    #sstat
    #listeners
    #value
    #title
    #sstatTitle
    #sstatValue

    constructor(selector, options = {}) {

        this.#init(selector, options)
    }

    #init(selector, options) {
        this.#sstat = document.querySelector(selector)

        let title = options.title === undefined ? '' : options.title
        let value = options.value === undefined ? '' : options.value
        let imagePath = options.imagePath === undefined ? '' : options.imagePath

        if (title === '' || value === '' || imagePath === '') {
            this.#sstat.innerHTML = `
                <div class="sstat-error">
                    Please setup correctly the sstat
                </div>
            `

            return
        }
        this.#title = title
        this.#value = value
        this.#listeners = []
        this.#setupView(imagePath)
        this.#setupEvents()
    }

    #setupView(imagePath) {
        this.#sstatTitle = document.createElement('div')
        this.#sstatValue = document.createElement('div')

        let sstatImageContainer = document.createElement('div')
        let sstatImage = document.createElement('img')
        sstatImage.src = imagePath
        sstatImageContainer.classList.add('sstat-image')
        sstatImageContainer.appendChild(sstatImage)

        this.#sstatTitle.classList.add('sstat-title')
        this.#sstatValue.classList.add('sstat-value')

        this.#sstatTitle.innerHTML = this.#title
        this.#sstatValue.innerHTML = this.#value

        console.log("sstat is", this.#sstat)
        this.#sstat.appendChild(this.#sstatTitle)
        this.#sstat.appendChild(this.#sstatValue)
        this.#sstat.appendChild(sstatImageContainer)
    }

    #updateTitle() {
        this.#sstatTitle.innerHTML = this.#title
    }

    #updateValue() {
        this.#sstatValue.innerHTML = this.#value
    }

    #setupEvents() {
        this.#sstat.addEventListener('click', () => {
            this.#listeners.forEach((listener) => {
                listener()
            })
        })
    }

    addOnActionListener(listener) {
        this.#listeners.push(listener)
    }

    getValue() {
        return this.#value
    }
    setValue(value) {
        this.#value = value
        this.#updateValue()
    }

    setTitle(title) {
        this.#title = title
        this.#updateTitle()
    }

    getTitle() {
        return this.#title
    }
}