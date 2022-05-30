

class CInput {

    #cinput
    #underlineInput
    #valueChangeListeners
    #focusChangeListeners

    constructor(selector, options = {}) {
        this.#init(selector, options)
    }

    #init(selector, options) {
        this.#cinput = document.querySelector(selector)
        let formName = options.name === undefined ? '' : options.name
        let inputType = options.type === undefined ? 'text' : options.type
        if (formName === '' || !['text', 'email', 'tel', 'password', 'date'].includes(inputType)) {
            this.#cinput.innerHTML = `
                <div class="cinput-error">
                    Please setup correctly the input.
                </div>
            `
            return
        }

        this.#valueChangeListeners = []
        this.#focusChangeListeners = []
        this.#setupView(options)
        this.#setupEvents()
    }

    #setupView(options) {
        let placeholder = options.placeholder !== undefined ? options.placeholder : ''
        let name = options.name
        let inputType = options.type === undefined ? 'text' : options.type

        let leftImagePath = options.leftImagePath
        let imageTag = leftImagePath !== undefined ? `<img class="cinput-left" src="${leftImagePath}">` : ''

        let rightImagePath = options.rightImagePath
        let rightImageTag = rightImagePath !== undefined ? `<img class="cinput-right" src="${rightImagePath}">` : ''

        this.#cinput.innerHTML = `
             <div class="cinput-form-control">
                ${imageTag}
                <input type="${inputType}" name="${name}" placeholder="${placeholder}">
                ${rightImageTag}
            </div>
        `

        this.#underlineInput = this.#cinput.querySelector('input')
    }

    #setupEvents() {
        this.#underlineInput.addEventListener('focus', () => {
            this.#cinput.classList.add('active')
            this.#focusChangeListeners.forEach((listener) => {
                listener(true)
            })
        })

        this.#underlineInput.addEventListener('focusout', (event) => {
            this.#cinput.classList.remove('active')
            this.#focusChangeListeners.forEach((listener) => {
                listener(false)
            })
        })

        this.#underlineInput.addEventListener('change', (event) => {
            this.#valueChangeListeners.forEach((listener) => {
                listener(this.#underlineInput.value)
            })
        })

    }

    addValueChangeListener(listener) {
        this.#valueChangeListeners.push(listener)
    }

    addFocusChangeListener(listener) {
        this.#focusChangeListeners.push(listener)
    }

    getValue() {
        return this.#underlineInput.value
    }

    setError() {
        this.#cinput.classList.add('error')
    }

    unsetError() {
        this.#cinput.classList.remove('error')
    }

    toggleVisibility() {
        if (this.#underlineInput.type === "password") {
            this.#underlineInput.type = "text"
        } else {
            this.#underlineInput.type = "password"
        }
    }
}