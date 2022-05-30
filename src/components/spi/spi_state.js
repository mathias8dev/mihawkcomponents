

class SpiState {
    constructor(
        componentDir = '.',
        nameClassroom = "Will Smith / CE2A",
        registrationNumber = "IG24JL2",
        feesTotalValue = "300 000",
        feesPaidValue = "100 000",
        feesRemainingValue = "200 000",
        feesPaidPercent = 30
    ) {
        this.nameClassroom = nameClassroom
        this.imagePath = componentDir + "/img/user.jpg"
        this.registrationNumber = registrationNumber
        this.feesTotalValue = feesTotalValue
        this.feesPaidValue = feesPaidValue
        this.feesRemainingValue = feesRemainingValue
        this.feesPaidPercent = feesPaidPercent
    }
}