# Module 4: Sensor Technology & IoT Networks

## 1. Sensor Technology
A **sensor** is a device that detects and responds to some type of input from the physical environment. The specific input could be light, heat, motion, moisture, pressure, or any of a great number of other environmental phenomena. 
*   **Characteristics**: Accuracy, Range, Resolution, Sensitivity, Stability, Repeatability.
*   **Types of Sensors**:
    *   *Temperature Sensors*: Thermocouples, Thermistors (used in HVAC, industrial heating).
    *   *Proximity Sensors*: Inductive, Capacitive, Photoelectric, Ultrasonic (used in robotics, touch screens).
    *   *Pressure Sensors*: Piezoelectric, Strain gauges (used in weather monitoring, aviation).
    *   *Optical Sensors*: Photodiodes, LDRs (used in auto-brightness in screens, security lasers).
    *   *Environmental Sensors*: Humidity, Gas, Water quality sensors.

## 2. Participatory Sensing
**Participatory sensing** is the concept of communities or user groups contributing data spanning from environmental, urban to social aspects using their mobile devices (like smartphones).
*   **Concept**: Individuals opt-in to collect and share data using the sensors embedded in their mobile phones (GPS, camera, microphone, accelerometer).
*   **Applications**:
    *   *Traffic Monitoring*: Users' GPS data is used to predict traffic jams (e.g., Google Maps, Waze).
    *   *Environmental Monitoring*: Citizens mapping noise pollution or air quality in their cities.
    *   *Public Health*: Tracking the spread of a disease based on user-reported symptoms.
*   **Challenges**: Privacy of users, data credibility/accuracy (since data comes from non-professionals), power consumption on mobile devices.

## 3. Industrial IoT (IIoT) and Automotive IoT
### Industrial IoT (IIoT)
Refers to the extension and use of the Internet of Things in industrial sectors and applications. It focuses on Machine-to-Machine (M2M) communication, big data, and machine learning to achieve high efficiency and reliability.
*   **Key Features**: Predictive maintenance, asset tracking, quality control, smart supply chain.
*   **Benefits**: Reduces downtime, increases operational efficiency, improves safety.

### Automotive IoT
Integrating IoT technologies into vehicles to make them smarter, safer, and connected.
*   **Vehicle-to-Everything (V2X)**: Allows vehicles to communicate with each other (V2V), infrastructure (V2I), pedestrians (V2P), and networks (V2N).
*   **Applications**:
    *   *Telematics*: Monitoring vehicle behavior, GPS tracking.
    *   *Predictive Maintenance*: Vehicle self-diagnostics to alert the driver before a part fails.
    *   *Connected Infotainment*: Smart navigation, streaming services, voice assistants.
    *   *Autonomous Driving*: Cars navigating without human input using LiDAR, radar, and cameras.

## 4. Actuators
An **actuator** is the reverse of a sensor. While a sensor converts physical events into electrical signals, an actuator converts electrical signals into physical action.
*   **Types of Actuators**:
    *   *Electrical*: Motors (Stepper, Servo, DC) - widely used in robotics and automation.
    *   *Hydraulic*: Uses fluid pressure to generate motion (used in heavy machinery like excavators).
    *   *Pneumatic*: Uses compressed air to generate force (used in automated manufacturing lines).
    *   *Thermal/Magnetic*: Shape-memory alloys, relays.

## 5. Sensor Data Communication Protocols
Since sensors often operate on low power and need to transmit small amounts of data, specific protocols are used at the hardware level.
*   **I2C (Inter-Integrated Circuit)**: A multi-master, multi-slave, packet-switched, single-ended, serial computer bus. Used for attaching lower-speed peripheral ICs to processors and microcontrollers.
*   **SPI (Serial Peripheral Interface)**: A synchronous serial communication interface used for short-distance communication, primarily in embedded systems.
*   **UART (Universal Asynchronous Receiver-Transmitter)**: A hardware device for asynchronous serial communication in which the data format and transmission speeds are configurable.

*(Note: Network-level communication protocols like MQTT, CoAP, AMQP are often discussed alongside these, catering to passing sensor data over the internet).*

## 6. Radio Frequency Identification Technology (RFID)
**RFID** uses electromagnetic fields to automatically identify and track tags attached to objects.
*   **Components**:
    *   *RFID Tag*: Contains a microchip and an antenna. Can be passive (powered by the reader's signal) or active (has its own battery).
    *   *RFID Reader*: Transmits radio waves to the tag and receives the encoded multi-bit information back.
*   **Frequencies**: Low Frequency (LF), High Frequency (HF - includes NFC), Ultra-High Frequency (UHF).
*   **Applications**: Inventory management, supply chain tracking, electronic toll collection, access control (smart badges).

## 7. Wireless Sensor Network (WSN) Technology
A **WSN** refers to a group of spatially dispersed and dedicated sensors for monitoring and recording the physical conditions of the environment and organizing the collected data at a central location.
*   **Architecture**:
    *   *Sensor Nodes (Motes)*: Small, low-power devices with a microcontroller, transceiver, power source, and sensors.
    *   *Gateway (Sink)*: Connects the WSN to the internet or a central server.
*   **Topologies**: Star, Tree, Mesh. (Mesh is very common in WSN for fault tolerance).
*   **Common WSN Protocols**:
    *   **Zigbee**: Based on IEEE 802.15.4, creates low-power personal area networks. Ideal for smart home devices.
    *   **LoRaWAN**: Long Range Wide Area Network. Designed for wireless battery-operated things in a regional, national, or global network.
    *   **Bluetooth Low Energy (BLE)**: Designed for considerably reduced power consumption and cost while maintaining a similar communication range to standard Bluetooth.
*   **Challenges in WSN**: Power management (nodes often run on batteries for years), limited processing power, varying network topologies due to node failure.
