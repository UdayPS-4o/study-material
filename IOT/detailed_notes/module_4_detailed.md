# Module 4 — Detailed Exam Notes: Sensor Technology & Sensor Networks

> **Purpose:** Comprehensive notes on the physical edge of IoT: sensors, actuators, network topologies, specific industrial protocols, and underlying physical technologies like RFID and WSN.

---

## Topic 1: Sensor Technology

### Definition
A **Sensor** is a device, module, or subsystem whose purpose is to detect events or changes in its environment and send the information to other electronics, frequently a computer processor. They are the initial data acquisition points in any IoT system.

### Classification of Sensors
1.  **Active vs. Passive:**
    *   *Active:* Requires external power to operate (e.g., LiDAR, Radar).
    *   *Passive:* Does not require external power; generates its own signal based on environmental stimulus (e.g., Thermocouples, Piezoelectric sensors).
2.  **Analog vs. Digital:**
    *   *Analog:* Produces a continuous, variable output signal (requires an Analog-to-Digital Converter [ADC] to be read by microcontrollers).
    *   *Digital:* Produces discrete digital signals (0s and 1s), often using communication buses like I2C or SPI.

### Common Types of Sensors in IoT
*   **Temperature:** Thermistors, Thermocouples (e.g., LM35, DHT11 for temp & humidity).
*   **Proximity / Motion:** PIR (Passive Infrared) sensors, Ultrasonic sensors.
*   **Optical / Light:** LDR (Light Dependent Resistors), Photodiodes.
*   **Gas/Chemical:** CO2 sensors, smoke detectors.
*   **Accelerometers/Gyroscopes:** Detect tilt, movement, orientation (used in wearables).

---

## Topic 2: Actuators

### Definition
An **Actuator** is a component of a machine that is responsible for moving and controlling a mechanism or system. While sensors *collect* data, actuators *take action* based on logic or commands derived from that data.

### Types of Actuators
1.  **Electrical Actuators:** Use electricity to create mechanical movement. (e.g., Motors, Solenoids).
2.  **Hydraulic Actuators:** Use pressurized liquid to create powerful, heavy linear movements.
3.  **Pneumatic Actuators:** Use compressed air.
4.  **Thermal / Magnetic Actuators:** Rely on materials that change shape under heat or magnetic fields (e.g., relays, shape memory alloys).

### Sensor vs. Actuator
*   **Sensor:** Physical environment $\rightarrow$ Electrical signal (Input).
*   **Actuator:** Electrical signal $\rightarrow$ Physical environment (Output).

---

## Topic 3: Participatory Sensing

### Definition
**Participatory Sensing** (also known as crowdsensing) is the concept of coordinating a large group of individuals to collectively use their personal mobile devices (like smartphones) to gather sensory data regarding their environment, activities, or experiences.

### Concept:
Instead of deploying thousands of expensive, static environmental sensors, leverage the sensors already present in people's pockets (GPS, microphone, camera, accelerometer).

### Use Cases:
*   **Traffic Mapping:** Google Maps Waze uses users' GPS speed data to map traffic congestion in real-time.
*   **Environmental Monitoring:** Users capturing noise levels using their microphones or taking pictures of potholes via specific apps.
*   **Public Health:** Apps tracking symptom clusters across demographics.

---

## Topic 4: Industrial IoT (IIoT) and Automotive IoT

These are specialized domains of IoT with much stricter requirements regarding reliability, security, and latency.

### Industrial IoT (IIoT) / Industry 4.0
*   **Focus:** Manufacturing, supply chain, energy management, heavy industry.
*   **Requirements:** Absolute reliability (99.999%), ultra-low latency, rugged hardware to survive extreme temperatures and vibrations, and high security.
*   **Key Applications:**
    *   **Predictive Maintenance:** Analyzing machine vibration and heat to predict part failures before they break, preventing factory downtime.
    *   **Asset Tracking:** Real-time visibility into the supply chain.
    *   **Digital Twins:** Creating virtual, real-time replicas of physical production lines to run simulations.

### Automotive IoT / Connected Cars
*   **Focus:** Vehicles connecting to each other (V2V), to infrastructure (V2I), or to the cloud (V2C) — collectively known as V2X.
*   **Key Applications:**
    *   **Telematics:** Sending engine diagnostics, speed, and braking data to insurance companies or fleet managers.
    *   **Autonomous Driving:** Relying heavily on LiDAR, radar, cameras, and ultra-fast edge processing.
    *   **Infotainment:** Cloud-connected dashboards for navigation and entertainment.

---

## Topic 5: Sensor Data Communication Protocols

At the very lowest level (device level), sensors must communicate with the microcontroller. These are hardware-level wired communication protocols, distinct from web protocols like HTTP/MQTT.

1.  **UART (Universal Asynchronous Receiver-Transmitter):**
    *   Asynchronous (no shared clock line).
    *   Point-to-point (connects exactly 2 devices).
    *   Uses TX (Transmit) and RX (Receive) pins.
2.  **I2C (Inter-Integrated Circuit):**
    *   Synchronous (has a shared clock line).
    *   **Two-wire interface:** SDA (Serial Data) and SCL (Serial Clock).
    *   Multi-master, multi-slave capability. You can connect many sensors to just two pins on a microcontroller via an bus structure.
3.  **SPI (Serial Peripheral Interface):**
    *   Synchronous.
    *   **Four-wire interface:** MOSI (Master Out Slave In), MISO (Master In Slave Out), SCLK (Clock), SS (Slave Select).
    *   Much faster data transfer rates than I2C, but requires more physical wires.

---

## Topic 6: Radio Frequency Identification Technology (RFID)

### Definition
**RFID** is a technology that uses electromagnetic fields to automatically identify and track tags attached to objects. It is considered an early precursor to IoT.

### System Components:
1.  **RFID Tag (Transponder):** Contains a microchip (stores data) and an antenna.
    *   *Passive Tags:* No internal battery. They are powered entirely by the electromagnetic energy transmitted by the reader. Short range (few cm to ~10m).
    *   *Active Tags:* Have an internal battery. Can constantly broadcast their signal. Long range (up to 100m).
2.  **RFID Reader (Interrogator):** Sends out radio waves and receives signals back from the tags.

### Operation:
The reader sends RF energy. A passive tag's antenna captures this energy, powers up its microchip, and transmits its unique stored ID sequence back to the reader.

### Use Cases vs. Barcodes:
RFID does not require direct line-of-sight (unlike barcodes) and can scan hundreds of tags simultaneously in seconds. Used heavily in inventory management, toll collection (FASTag), and supply chain logistics.

---

## Topic 7: Wireless Sensor Network Technology (WSN)

### Definition
A **Wireless Sensor Network (WSN)** is a localized group of spatially dispersed, dedicated, autonomous sensors that collectively monitor physical or environmental conditions and cooperatively pass their data through the network to a main location (the sink/gateway).

### WSN vs IoT:
WSNs existed before IoT. A WSN becomes part of the IoT when its central Gateway node connects to the Internet and pushes the collected sensor data to the Cloud.

### WSN Components:
*   **Sensor Nodes (Motes):** Tiny devices with a sensor, microcontroller, radio transceiver, and small battery.
*   **Gateway / Sink Node:** A more powerful node that collects data from all motes and bridges the connection outside the WSN.

### Topologies in WSN:
The layout of how motes talk to each other is critical due to severe battery constraints.
1.  **Star Topology:** All nodes communicate directly with the central gateway. High power usage for distant nodes.
2.  **Tree Topology:** Nodes communicate hierarchically up through branch nodes to the root (gateway).
3.  **Mesh Topology:** Nodes act as routers. A mote can pass data to its neighbor, which passes it to the next, until it reaches the gateway. Highly resilient, reliable, and extends network range significantly (e.g., Zigbee mesh networks).

---

## Exam Tips for Module 4 🎯
1.  **Sensor vs Actuator:** Simple definition is required; Sensor = Input (physical to electrical), Actuator = Output (electrical to physical).
2.  **Participatory Sensing:** Keyword is "crowdsensing" via personal smartphones.
3.  **Wired Sensor Protocols:** Compare I2C (2 wires, multi-device, slower) vs SPI (4 wires, faster, more complex).
4.  **RFID Active vs Passive:** The key distinction is the presence of an internal battery. Explain how passive tags are powered by the reader.
5.  **WSN Topologies:** Emphasize the **Mesh** topology, as it is the most common and robust approach in modern IoT physical deployments (like Zigbee smart home setups).
