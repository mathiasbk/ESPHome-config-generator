class YamlVisualizer {
    constructor(options = {}) {
        this.indentChar = options.indentChar || ' ';
    }

    visualizeYaml(yaml) {
        let outputYaml = '';

        let inputYamlarray = yaml.split('\n');

        //Loop each line
        for (let i = 0; i < inputYamlarray.length; i++) {
            const line = inputYamlarray[i];

  
            const indentLevel = line.search(/\S|$/); 
            const indents = '&nbsp;'.repeat(indentLevel); // Convert to HTML spaces

            if (line.includes(":")) {
                const parts = line.split(':');
                const key = parts[0].trim();
                const value = parts.slice(1).join(":").trim();
                outputYaml += `${indents}<span class="yaml-key">${key}:</span> <span class="yaml-string">${value}</span><br>`;
            } else {
                outputYaml += `${indents}${line}<br>`;
            }
        }

        return outputYaml;
    }
}