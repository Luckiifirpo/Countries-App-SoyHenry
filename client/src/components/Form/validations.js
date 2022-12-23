const nameValidation = /^[a-z\s]+$/i

export default function Validate(inputs){
    let errors = {}

    // console.log({inputs: inputs});

    if(!inputs.name) errors.name = "Se requiere un nombre para la actividad"
        else if(inputs.name.length > 50) errors.name = "El nombre no debe contener más de 50 carácteres"
        else if(!nameValidation.test(inputs.name)) errors.name = "El nombre no puede contener carácteres especiales"

    if(inputs.difficulty <= 0) errors.difficulty = "La dificultad debe ser mayor que 0"
        else if(inputs.difficulty >= 6) errors.difficulty = "La dificultad debe ser menor que 6"

    if(inputs.duration <= 0) errors.duration = "La duración no debe ser 0 ni negativa"
        else if(inputs.duration > 60) errors.duration = "La duración no puede ser mayor que 60"

    if(!inputs.season) errors.season = "Debes seleccionar una estación del año"

    if(!inputs.durationTime) errors.durationTime = "Debes seleccionar una medida de tiempo"

    if(!inputs.countriesID.length) errors.countriesID = "Debes seleccionar al menos 1 país"
    return errors
}