$(function() {
    //Populate select
    console.log(devices);
    $.each(devices, function(index, device) {
        console.log(device);
        $("#platformSelect").append('<option value="' + device + '">' + device + '</option>');
    });

    //initiate generator

});

function generateYaml() {
    // Hent inputs
    const inputcontainer = document.getElementById("inputcontainer");
    const inputs = inputcontainer.querySelectorAll("input, select");

    const inputValues = {};
    inputs.forEach(element => {
        if (element.type === "checkbox") {
            inputValues[element.id || element.name] = element.checked;
        } else {
            inputValues[element.id || element.placeholder || element.name] = element.value;
        }
    });

    // Opprett en ny instans av yamlGenerator
    const generator = new yamlGenerator(inputValues);
    document.getElementById("yamlOutputContainer").innerHTML = generator.generateYaml();

}