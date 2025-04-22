//Maybe get from API?
/*

https://registry.platformio.org/platforms/platformio/espressif32?version=5.3.0
https://redocly.github.io/redoc/?url=https://api.registry.platformio.org/v3/openapi.yaml#tag/Packages/paths/~1packages~1%7Busername%7D~1%7Bpkgtype%7D~1%7Bpkgname%7D~1boards/get
*/

//const platforms = ["ESP8266", "BK72", "ESP32", "RP2040", "RTL87"];
const platforms = async function () {
    try {
        const response = await fetch("https://api.registry.platformio.org/v3/packages/platformio/platform/espressif32/boards", {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Boards fetched from API:", data);

        // Extract relevant information from the API response
        const boards = data.map(board => ({
            id: board.id,
            name: board.name,
            mcu: board.mcu,
            connectivity: board.connectivity,
            frameworks: board.frameworks,
            vendor: board.vendor,
            url: board.url
        }));

        // Populate mcuList
        boards.forEach(element => {
            if (!mcuList.includes(element.mcu)) {
                mcuList.push(element.mcu);
            }
        });

        document.getElementById("boardSpinner").style.display = "none";
        return boards;
    } catch (error) {
        console.error("Error fetching boards:", error);
    }
};

let mcuList = [];
platforms().then(() => {
    populateMcus();
});