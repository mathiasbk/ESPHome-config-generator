class yamlGenerator {
    constructor(options = {}) {
        this.inputvalues = {...options};
    };

    generateYaml() {
        //Validation
        console.log(this.inputvalues);
        if(!this.inputvalues.deviceName || this.inputvalues.deviceName === "") {
            return("Please enter a device name");
            
        }
        if(!this.inputvalues.platformSelect || this.inputvalues.platformSelect === "Select device") {
            return("Please select a platform");
        }
        
        let yaml = `esphome:
        name: ${this.inputvalues.deviceName}
        platform: ${this.inputvalues.platformSelect}
        board: ${this.inputvalues.boardSelect}\n`;
        
        //Wifi settings
        if(this.inputvalues.SSID) {
            yaml += `wifi:\n`;
            yaml += `  ssid: ${this.inputvalues.SSID}\n`;
            yaml += `  password: ${this.inputvalues.wifiPassword}\n`;
        }

        //checkboxes
        if(this.inputvalues.loggerCheck) {
            yaml += `logger:\n`;
        }
        if(this.inputvalues.apiCheck) {
            yaml += `api:\n`;
        }
        if(this.inputvalues.otaCheck) {
            yaml += '\n\nota:';
            // Optional: Add OTA password
            yaml += `
        password: "your_ota_password"`;
        }

        console.log(yaml);
        return yaml;
    }
}

window.yamlGenerator = yamlGenerator;