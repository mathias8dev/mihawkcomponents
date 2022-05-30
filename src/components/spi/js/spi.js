

class Spi {

    #spi
    /**
     * The state here is just a wrapped form of a student
     * 
     */
    #state
    #spiName
    #spiImage
    #componentDir
    #spiRegistrationNumber
    #spiFeesValue
    #spiPaidValue
    #spiRemainingValue
    #progressbar



    constructor(selector, options = {}) {
        this.#init(selector, options)
    }

    #setStyle() {
        let style = document.createElement('style')
        style.innerHTML = `
            .spi {
                width: 300px;
                padding: 14px;
                background-color: #f1f1f1;
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
            }

            .spi.error {
                background-color: rgba(255, 0, 0, 0.07);
                padding: 20px 5px;
                border-radius: 5px;
            }

            .spi * {
            box-sizing: border-box;
            }

            .spi .spi-image {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background-color: #c4c4c4;
            align-self: center;
            }

            .spi .spi-image img {
            width: 100%;
            height: 100%;
            border-radius: inherit;
            object-fit: cover;
            object-position: center;
            }

            .spi .spi-name {
            font-weight: 600;
            font-size: 20px;
            margin-top: 20px;
            color: #114a82;
            align-self: center;
            }

            .spi .spi-registration_number {
            font-size: 16px;
            color: #114a82;
            align-self: center;
            }

            .spi .progressbar {
            width: 80%;
            align-self: center;
            margin-top: 10px;
            }

            .spi .spi-fees {
            margin: 20px 0;
            width: 100%;
            }

            .spi .spi-fees-value {
            font-weight: 600;
            }

            .spi .spi-row {
            display: flex;
            justify-content: space-between;
            }

            .spi .spi-row-paid-value {
            font-weight: 600;
            }

            .spi .spi-row-remaining {
            text-align: right;
            }

            .spi .spi-row-remaining-value {
            font-weight: 600;
            }

        `
        this.#spi.appendChild(style)
    }

    #setHTML() {
        this.#spi.innerHTML = `
                <div class="spi-image"><img></div>
                <div class="spi-name"></div>
                <div class="spi-registration_number"></div>
                <div class="progressbar spi-progressbar"></div>
                <div class="spi-fees">
                    <div>Frais de scolarités :</div>
                    <div class="spi-fees-value"></div>
                </div>

                <div class="spi-row">
                    <div class="spi-row-paid">
                    <div>Total payé :</div>
                    <div class="spi-row-paid-value"></div>
                    </div>

                    <div class="spi-row-remaining">
                    <div>Reste à payer :</div>
                    <div class="spi-row-remaining-value"></div>
                    </div>
                </div>
        `
    }

    #setupElements() {
        this.#progressbar = new Progressbar('.progressbar.spi-progressbar', { value: this.#state.paidPercent, barBackground: "white", progressBackground: "#e1584e" })
        this.#spiName = this.#spi.querySelector('.spi-name')
        this.#spiImage = this.#spi.querySelector('.spi-image img')
        this.#spiRegistrationNumber = this.#spi.querySelector('.spi-registration_number')
        this.#spiFeesValue = this.#spi.querySelector('.spi-fees .spi-fees-value')
        this.#spiPaidValue = this.#spi.querySelector('.spi-row .spi-row-paid .spi-row-paid-value')
        this.#spiRemainingValue = this.#spi.querySelector('.spi-row .spi-row-remaining .spi-row-remaining-value')
    }
    #init(selector, options) {
        this.#spi = document.querySelector(selector)
        this.#componentDir = options.componentDir
        if (this.#componentDir === undefined) {
            this.#spi.classList.add('error')
            this.#spi.innerHTML = `
                <div>
                    Please setup correctly the spi
                </div>
            `
            return
        }

        this.#state = options.state
        if (this.#state === undefined) {
            this.#state = new SpiState(this.#componentDir)
        }

        this.#setHTML()
        this.#setStyle()
        this.#setupElements()

        this.#updateView()

    }

    #updateView() {
        this.#progressbar.setProgress(this.#state.feesPaidPercent)
        this.#spiName.innerHTML = this.#state.nameClassroom
        this.#spiImage.src = this.#state.imagePath
        this.#spiRegistrationNumber.innerHTML = this.#state.registrationNumber
        this.#spiFeesValue.innerHTML = this.#state.feesTotalValue
        this.#spiPaidValue.innerHTML = this.#state.feesPaidValue
        this.#spiRemainingValue.innerHTML = this.#state.feesRemainingValue
    }

    setState(state) {
        this.#state = state
        this.#updateView()
    }

    getState() {
        return this.#state
    }
}