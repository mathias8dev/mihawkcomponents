

class HSlider {

    #items
    #slider
    #currentPosition
    #listeners

    constructor(selector = '.hslider', items = []) {
        this.#init(selector, items)
    }

    #init(selector, items) {
        this.#slider = document.querySelector(selector)
        if (items.length == 0) {
            // Modify the innerhtml of the slider and display error
            this.#slider.innerHTML = `
                <div class="hslider-error">
                    Please setup correctly the stepper
                </div>
            `
            return
        }

        this.#items = items
        this.#currentPosition = 0
        this.#listeners = []
        this.#setupEvents()
        this.#updateView()
    }

    #setupEvents() {
        let prevButton = this.#slider.querySelector('.hslider-prev')
        let nextButton = this.#slider.querySelector('.hslider-next')

        prevButton.addEventListener('click', () => {
            if (this.#currentPosition > 0) {
                this.#currentPosition--
                this.#listeners.forEach((listener) => {
                    listener(this.#currentPosition)
                })

                this.#updateView()
            }
        })

        nextButton.addEventListener('click', () => {
            if (this.#currentPosition < this.#items.length - 1) {
                this.#currentPosition++
                this.#listeners.forEach((listener) => {
                    listener(this.#currentPosition)
                })

                this.#updateView()
            }
        })
    }

    #updateView() {
        let item = this.#slider.querySelector('.hslider-item')
        item.innerHTML = this.#items[this.#currentPosition]
    }

    getPosition() {
        return this.#currentPosition
    }

    addPositionChangeListener(listener) {
        this.#listeners.push(listener)
    }

}