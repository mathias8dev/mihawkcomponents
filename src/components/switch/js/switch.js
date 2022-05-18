

class Switch {

    #state
    #switch
    #listeners

    constructor(selector, options = {}) {
        this.#init(selector, options)
    }

    #init(selector, options) {
        this.#switch = document.querySelector(selector)
        let state = options.state === undefined ? false : options.state

        this.#state = state
        this.#listeners = []
        this.#setupEvents()
        this.#updateView()
    }

    #setupEvents() {
        this.#switch.addEventListener('click', () => {
            this.#state = !this.#state

            this.#listeners.forEach((listener) => {
                listener(this.#state)
            })

            this.#updateView()
        })
    }

    #updateView() {
        if (this.#state === false) {
            this.#switch.classList.remove('active')
        } else {
            this.#switch.classList.add('active')
        }
    }

    addOnStateChangeListener(listener) {
        this.#listeners.push(listener)
    }


    getState() {
        return this.#state
    }

    setState(state) {
        this.#state = state
        this.#updateView()
    }
}