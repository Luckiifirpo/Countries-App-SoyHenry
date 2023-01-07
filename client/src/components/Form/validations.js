const nameValidation = /^[a-z\s]+$/i

export default function Validate(inputs){
    let errors = {}
    const time_input = document.getElementById("time_input")

    if(!inputs.name) errors.name = "A name is required for the activity"
        else if(inputs.name.length > 50) errors.name = "Name must contain no more than 50 characters"
        else if(!nameValidation.test(inputs.name)) errors.name = "Name cannot contain special characters"

    if(inputs.difficulty <= 0) errors.difficulty = "The difficulty must be greater than 0"
        else if(inputs.difficulty >= 6) errors.difficulty = "The difficulty must be less than 6"

    if(!inputs.durationTime) errors.durationTime = "You must select a time measurement"

    if(inputs.durationTime === "hours"){
       time_input.setAttribute("max", 24)
       if(inputs.duration > 24) errors.duration = "The duration cannot be more than 24 hours"
    } else{
       time_input.setAttribute("max", 59)
       if(inputs.duration > 59) errors.duration = "The duration cannot be more than 59 minutes"
    }

    if(inputs.duration <= 0) errors.duration = "The duration must not be 0"

    if(!inputs.season) errors.season = "You must select a season of the year"

    if(!inputs.countriesID.length) errors.countriesID = "You must select at least 1 country"
    return errors
}