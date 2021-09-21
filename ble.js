// document.getElementById("button").onclick = function() {myFunction()};
console.log("button");
document.getElementById("button").addEventListener("click", function(){
    console.log("button");
    openBlutooth();
});

function openBlutooth(){
    navigator.bluetooth.requestDevice({
    // acceptAllDevices: true,
    filters: [
        {services: ["021a9004-0382-4aea-bff4-6b3f1c5adfb4"]},
        {namePrefix: "ESP32BLE"}
    ]
    })
    .then(device => device.gatt.connect())
    .then(server => server.getPrimaryService("021a9004-0382-4aea-bff4-6b3f1c5adfb4"))
    .then(service => service.getCharacteristic("beb5483e-36e1-4688-b7f5-ea07361b26a8"))
    .then(characteristic => {
        const resetEnergyExpended = Uint8Array.of(1);
        characteristic.writeValue(resetEnergyExpended);
        return characteristic.readValue();
      })
    .then(value => {
        console.log(`Battery percentage is ${value.getUint8(0)}`);
    })
    .catch(error => { console.error(error); });
}