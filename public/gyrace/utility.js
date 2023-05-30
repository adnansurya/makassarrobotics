
// Update the values of the desired fields
if (liveMode) {
    devRef.update({
        in_game: 'gyrace',
        stat: 'active',
        player: playerName,
        score_text: "Score",
        score_val: 0,
        prompt: 'Standby...'
    })
        .then(function () {
            console.log("Data updated successfully");
        })
        .catch(function (error) {
            console.error("Error updating data:", error);
        });
}





import {
    AbsoluteOrientationSensor,
    RelativeOrientationSensor
} from '../sensor-polyfills/motion-sensors.js';



let output_txt = document.getElementById('alphaTxt');
output_txt.innerText = "-";

let y, z, w;


const sensor = new AbsoluteOrientationSensor();
Promise.all([
    navigator.permissions.query({ name: "accelerometer" }),
    navigator.permissions.query({ name: "magnetometer" }),
    navigator.permissions.query({ name: "gyroscope" }),
]).then((results) => {
    if (results.every((result) => result.state === "granted")) {
        sensor.start();
        // …
    } else {
        console.log("No permissions to use AbsoluteOrientationSensor.");
    }
});

const options = { frequency: 60, referenceFrame: "device" };
// const sensor = new AbsoluteOrientationSensor(options);

sensor.addEventListener("reading", () => {
    // model is a Three.js object instantiated elsewhere.
    // model.quaternion.fromArray(sensor.quaternion).inverse();
    let output_arr = sensor.quaternion;

    x_test = parseFloat(output_arr[0]).toFixed(3);
    y = parseFloat(output_arr[1]).toFixed(5);
    z = parseFloat(output_arr[2]).toFixed(5);
    w = parseFloat(output_arr[3]).toFixed(5);
    // output_txt.innerText = `x: ${x}   y:${y}   z:${z}`;
    output_txt.innerText = `${x_test}`;


});
sensor.addEventListener("error", (error) => {
    if (event.error.name === "NotReadableError") {
        console.log("Sensor is not available.");
    }
});
sensor.start();