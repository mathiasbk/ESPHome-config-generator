let deviceArray = [];
deviceArray.push(new devices("ESP32", "ESP32", "board"));

$(function() {
    //Populate select
    //console.log(platforms);
    $.each(platforms, function(index, device) {
        console.log(device);
        $("#platformSelect").append('<option value="' + device + '">' + device + '</option>');
    });

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
    updateYamlVisualization();
}

const visualizer = new YamlVisualizer();
const outputContainer = document.getElementById("yamlOutputContainer");

// Oppdater YAML-output når knappen trykkes
function updateYamlVisualization() {
    try {
        const yaml = outputContainer.innerText; // Hent YAML fra <p>-taggen
        const output = visualizer.visualizeYaml(yaml);
        outputContainer.innerHTML = output; // Oppdater med formatert YAML
    } catch (error) {
        console.error("Error visualizing YAML:", error);
    }
}


function addNewDevice() {

    //Logic
    const sensorType = $("#newSensorType");
    const devicename = $("#newDeviceName");
    const deviceplatform = $("#newDevicePlatform");

    console.log("før: " + deviceArray);
    const newdevice = new devices(
        sensorType.val(),
        devicename.val(), 
        deviceplatform.val(),
    );

    deviceArray.push(newdevice);

    console.log("Etter: " + deviceArray);

    //Add elements to GUI
    const devicecontainer = $("#devicescontainer");

    devicecontainer.after(createDeviceGuiElement(newdevice));

    //Clear and hide modal
    sensorType.val("Select sensortype");
    devicename.val("");
    deviceplatform.val("");
    $('#newdevicemodal').modal('hide');
}

function createDeviceGuiElement(deviceObject) {
    return `Element for ${deviceObject.name}`;
}

async function populateMcus() {
    try {
        //remove old ones
        $("#mcuSelect").empty();
        $("#mcuSelect").append("<option selected disabled>Select microcontroller</option>");

        mcuList.forEach(function(board) {
            // Legg til verdien fra mcuList som value og tekst
            $("#mcuSelect").append(`<option value="${board}">${board}</option>`);
        });
    } catch (error) {
        console.error("Error loading microcontrollers:", error);
    }
}

$("#mcuSelect").on("change", async function() {
    // Tøm dropdown
    $("#platformSelect").empty();
    let selectedMcu = $("#mcuSelect").val();

    try {

        const boards = await platforms();

        boards.forEach(function(board) {
            if(board.mcu == selectedMcu) {
                $("#platformSelect").append(`<option value="${board.id}">${board.name}</option>`);
            }
        });
    } catch (error) {
        console.error("Error loading platforms:", error);
    }
});