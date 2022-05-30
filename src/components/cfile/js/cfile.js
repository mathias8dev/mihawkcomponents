

class CFile {

    #cfile
    #underlineInput
    #fakeInput
    #valueChangeListeners
    #clickListeners

    constructor(selector, options = {}) {
        this.#init(selector, options)
    }

    #init(selector, options) {
        this.#cfile = document.querySelector(selector)
        let formName = options.name === undefined ? '' : options.name
        if (formName === '') {
            this.#cfile.innerHTML = `
                <div class="cfile-error">
                    Please setup correctly the input.
                </div>
            `
            return
        }

        this.#valueChangeListeners = []
        this.#clickListeners = []
        this.#setupView(options)
        this.#setupEvents()
    }

    #setupView(options) {
        let placeholder = options.placeholder !== undefined ? options.placeholder : ''
        let name = options.name

        let leftImagePath = options.leftImagePath
        let imageTag = leftImagePath !== undefined ? `<img class="cfile-left" src="${leftImagePath}">` : ''

        let rightImagePath = options.rightImagePath
        let rightImageTag = rightImagePath !== undefined ? `<img class="cfile-right" src="${rightImagePath}">` : ''

        this.#cfile.innerHTML = `
             <div class="cfile-form-control">
                ${imageTag}
                <input type="file" class="cfile-form-control-input hidden" name="${name}" accept="${options.accept}">
                <div class="cfile-form-control-fake_input">${placeholder}</div>
                ${rightImageTag}
            </div>
        `

        this.#underlineInput = this.#cfile.querySelector('input[type=file]')
        this.#fakeInput = this.#cfile.querySelector('.cfile-form-control-fake_input')
    }

    #setupEvents() {
        this.#fakeInput.addEventListener('click', () => {
            this.#underlineInput.click()
            this.#clickListeners.forEach((listener) => {
                listener()
            })
        })


        this.#underlineInput.addEventListener('change', (event) => {
            // Check if there is a file
            // If so, set the right imageTag
            // Otherwiser remove it

            let formControl = this.#cfile.querySelector('.cfile-form-control')
            if (this.#underlineInput.value !== "") {
                this.#cfile.classList.add('fill')
                try {
                    formControl.querySelector('img.cfile-right').classList.remove('hidden')
                } catch (e) {
                    console.log(e)
                }
            } else {
                this.#cfile.classList.remove('fill')
                try {
                    formControl.querySelector("img.cfile-right").classList.add('hidden')
                } catch (e) {
                    console.log(e)
                }
            }


            this.#valueChangeListeners.forEach((listener) => {
                listener(this.#underlineInput.value)

            })
        })

    }

    addOnValueChangeListener(listener) {
        this.#valueChangeListeners.push(listener)
    }

    addOnClickListener(listener) {
        this.#clickListeners.push(listener)
    }

    getValue() {
        return this.#underlineInput.value
    }

    setError() {
        this.#cfile.classList.add('error')
    }

    unsetError() {
        this.#cfile.classList.remove('error')
    }

    removeFile() {
        this.#underlineInput.value = undefined
    }
}