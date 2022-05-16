

class Stepper {

    #stepper
    #stepChangeListeners
    #endListeners

    constructor(selector) {
        this.#init(selector)
        this.#stepChangeListeners = []
        this.#endListeners = []
    }

    #init(selector) {
        this.#stepper = document.querySelector(selector)

        if ((this.#discoveredContents() == this.#discoveredSteps()) && (this.#discoveredContents() == this.#discoveredLines() + 1)) {
            this.#setup()
        } else {

            this.#stepper.innerHTML = `
                <div class="stepper-error">
                    Please setup correctly the stepper
                </div>`
        }

    }

    #setup() {
        this.stepperItems = this.#stepper.querySelectorAll(".stepper-header .stepper-item")
        this.stepperLines = this.#stepper.querySelectorAll(".stepper-header .stepper-line")
        this.stepperContents = this.#stepper.querySelectorAll(".stepper-contents .stepper-content")
        this.currentStep = 0
        this.#updateView()
    }

    #updateView() {
        for (let i = 0; i <= this.currentStep; i++) {
            this.stepperItems[i].classList.add('active')
        }

        if (this.currentStep > 0) {
            for (let i = 0; i < this.currentStep; i++) {
                this.stepperLines[i].classList.add('active')
            }
        }

        for (let i = this.currentStep + 1; i < this.stepperItems.length; i++) {
            this.stepperItems[i].classList.remove('active')
            this.stepperLines[i - 1].classList.remove('active')
        }


        // // Display the contents
        for (let i = 0; i < this.stepperContents.length; i++) {
            this.stepperContents[i].classList.remove('show')
        }
        this.stepperContents[this.currentStep].classList.add('show')
    }


    /**
     * Return the count of the steps
     */
    #discoveredSteps() {
        let count = this.#stepper.querySelectorAll('.stepper-header .stepper-item').length
        // console.log(`The discovered steps = ${count}`)
        return count
    }

    /**
     * Return the count of the contents
     */
    #discoveredContents() {
        let count = this.#stepper.querySelectorAll('.stepper-contents .stepper-content').length
        // console.log(`The discovered contents = ${count}`)
        return count
    }

    #discoveredLines() {
        let count = this.#stepper.querySelectorAll('.stepper-header .stepper-line').length
        // console.log(`The discovered lines = ${count}`)
        return count
    }

    // Lambda is a closure or a lambda
    addStepChangeListener(lambda) {
        this.#stepChangeListeners.push(lambda)
    }

    addEndListener(lambda) {
        this.#endListeners.push(lambda)
    }


    goTo(position) {

    }

    next() {
        if (this.currentStep == this.stepperItems.length - 1) {
            this.#endListeners.forEach(listener => {
                listener()
            })

            return
        }

        this.currentStep++
        this.#stepChangeListeners.forEach(listener => {
            listener(this.currentStep)
        })

        this.#updateView()
    }

    previous() {
        if (this.currentStep == 0) {
            return
        }

        this.currentStep--
        this.#stepChangeListeners.forEach(listener => {
            listener(this.currentStep)
        })

        this.#updateView()
    }


}