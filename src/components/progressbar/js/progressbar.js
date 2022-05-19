class Progressbar {

    #progressbar
    #progressValue
    #progress
    #value
    #listeners

    constructor(selector, options = {}) {
        this.#init(selector, options)
    }

    #init(selector, options) {
        this.#progressbar = document.querySelector(selector)

        let value = options.value === undefined ? 100 : options.value
        let barBackground = options.barBackground === undefined ? "#F1F1F1" : options.barBackground
        let progressBackground = options.progressBackground === undefined ? "#e1584e" : options.progressBackground

        this.#progressbar.innerHTML = `
            <div class="progressbar-progress">
                <div class="progressbar-progress-progress"></div>
            </div>
            <div class="progressbar-progress-value"></div>
        `

        this.#progress = this.#progressbar.querySelector('.progressbar-progress-progress')
        this.#progressValue = this.#progressbar.querySelector('.progressbar-progress-value')

        this.#progress.style.backgroundColor = progressBackground
        this.#progressbar.querySelector(".progressbar-progress").style.backgroundColor = barBackground

        this.#value = value
        this.#listeners = []
        this.#setupEvents()
        this.#updateView()
    }

    #setupEvents() {

    }
    #updateView() {
        this.#progress.style.width = `${this.#value}%`
        this.#progressValue.innerHTML = this.#value + '%'

        this.#listeners.forEach((listener) => {
            listener(this.#value)
        })
    }

    addOnProgressChangeListener(listener) {
        this.#listeners.push(listener)
    }

    setProgress(value) {
        if (value > 100 || value < 0) {
            console.error("The value should not be greater or less than 0 and 100")
            return
        }
        this.#value = value
        this.#updateView()
    }


    getProgress() {
        return this.#value
    }
}