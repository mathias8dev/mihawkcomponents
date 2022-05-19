

class SpiState {
    constructor(
        nameClassroom = "Will Smith / CE2A",
        imagePath = `./img/user.jpg`,
        registrationNumber = "IG24JL2",
        feesTotalValue = "300 000",
        feesPaidValue = "100 000",
        feesRemainingValue = "200 000",
        feesPaidPercent = 30
    ) {
        this.nameClassroom = nameClassroom
        this.imagePath = imagePath
        this.registrationNumber = registrationNumber
        this.feesTotalValue = feesTotalValue
        this.feesPaidValue = feesPaidValue
        this.feesRemainingValue = feesRemainingValue
        this.feesPaidPercent = feesPaidPercent
    }
}