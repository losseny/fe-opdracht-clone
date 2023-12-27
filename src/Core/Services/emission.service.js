
export class EmissionService {

    #userService;

    constructor(userService) {
        this.#userService = userService;
    }

    // Constants for emission factors
    static EMISSION_FACTORS = {
        "Benzine Eigen Auto": 15,
        "Hybride Eigen Auto": 5,
        "Diesel Eigen Auto": 10,
        "Service Auto": 15,
        "Taxi": 15
    };


    calculateEmission(journey) {

        let emission;

        switch (journey.transportOption) {
            // Grouping zero-emission transport options
            case "OV (Trein/Metro/Tram)":
            case "Ov Fiets":
            case "Fiets":
            case "Elektrische Deelauto":
                emission = 0;
                break;

            // Handling other transport options
            case "Benzine Eigen Auto":
            case "Hybride Eigen Auto":
            case "Diesel Eigen Auto":
            case "Service Auto":
            case "Taxi":
                const emissionFactor = EmissionService.EMISSION_FACTORS[journey.transportOption];
                emission = this.#emissionCalculation(emissionFactor, journey.distance);
                break;

            // Default case for unexpected transport options
            default:
                emission = 0;
        }

        return Promise.resolve(emission);
    }

    calculateEmissionStatistics() {
        return Promise.all([
            this.#calculateTotalEmissionToday(),
            this.#calculateTotalEmissionMonth(),
            this.#calculateTotalEmissionYear(),
        ])
    }

    #calculateTotalEmissionToday() {
        return {
            key: 'Vandaag',
            result: this.#baseEmissionCalculator(f => new Date(f.date).getDate() === new Date().getDate())
        }
    }

    #calculateTotalEmissionMonth() {
        return {
            key: 'Maand',
            result: this.#baseEmissionCalculator(f => new Date(f.date).getMonth() === new Date().getMonth())
        }
    }

    #calculateTotalEmissionYear() {
        return {
            key: 'Jaar',
            result: this.#baseEmissionCalculator(f => new Date(f.date).getFullYear() === new Date().getFullYear())
        }
    }

    #baseEmissionCalculator(func) {
        return this.#userService.currentLoggedInUser().then(r => {
            if (!r || !r.journeys || r.journeys.length <= 0) {
                return 0;
            }
            return r.journeys.filter(func)
                .map(m => m.emission)
                .reduce((a, c) => a + c)
        })
    }



    #emissionCalculation(emissionFactor, kilometer) {
        // Error handling for invalid inputs
        if (kilometer <= 0) {
            return 0;
        }
        const result = emissionFactor * kilometer;
        return isNaN(result) ? 0 : result
    }
}
