# PCC-CI11 Internet of Things - Module 1 Notes

## 1. Introduction & Definition
The **Internet of Things (IoT)** refers to a global network of interconnected physical devices ("things") embedded with sensors, actuators, software, and network connectivity. This allows these devices to collect, exchange, and act upon data without requiring human-to-human or human-to-computer interaction. 

**Simplified Definition:** Connecting everyday objects to the internet so they can send and receive data.

## 2. Characteristics of IoT
Key characteristics that define an IoT system:
- **Dynamic & Self-Adapting:** Devices and systems dynamically adapt to changing contexts and take actions (e.g., a smart thermostat adjusting to a room's temperature).
- **Self-Configuring:** IoT devices can self-configure, connect to networks automatically, and fetch required updates or configurations on their own.
- **Interoperable Communication:** Different IoT devices (often using various protocols) can communicate and exchange data seamlessly.
- **Unique Identity:** Each IoT device has a unique identity (like an IP address or a URI) allowing it to be tracked and controlled individually over the network.
- **Integration into Information Network:** Devices are integrated into a larger information network, allowing their data to be stored, analyzed, and used by remote applications.
- **Enormous Scale:** IoT involves managing an incredibly vast number of connected devices, far exceeding the number of conventional computing devices.
- **Sensory & Actuation:** The ability to sense the real-world environment (sensors) and bring about physical changes (actuators).

## 3. IoT Conceptual Framework
The conceptual framework of IoT provides a basic understanding of how data flows and how components interact. It generally consists of 4 main layers:
1. **Physical/Device Layer:** The physical objects, sensors (collect data), and actuators (perform actions) at the edge.
2. **Network/Connectivity Layer:** The communication protocols and networks (Wi-Fi, Zigbee, Cellular, Bluetooth) that transmit data from devices to the cloud.
3. **Data Processing/Cloud Layer:** The platform where data is received, stored, aggregated, and heavily processed using analytics and machine learning.
4. **Application/User Layer:** The software interface or app that the end-user interacts with (e.g., a smart home app on a smartphone) to view data and control the devices.

## 4. IoT Architectural View
An architectural view goes deeper into the system's structural design. The common **reference architecture** includes:
- **Device & Gateway Domain:** Includes the sensors/actuators and the IoT Gateway (which pre-processes data and bridges local device networks to the internet).
- **Network Domain:** The core internet infrastructure (routers, switches, internet service providers) routing data to central servers.
- **Service & Application Domain:** The cloud platforms where data storage (databases), analytics, and business logic reside. It hosts APIs that allow applications to access the processed data.
- **Management & Security:** Cross-cutting functions that ensure devices are managed securely, firmware is up-to-date, and data is protected at every layer.

## 5. Physical Design of IoT
The physical design focuses on the physical components of IoT systems:
- **IoT Devices:** Hardware components consisting of sensors, actuators, processing units (microcontrollers), and communication interfaces. 
  - *Example:* Arduino, Raspberry Pi.
- **Sensors:** Devices that detect external information, replacing it with a signal that humans and machines can distinguish (e.g., temperature sensor, motion sensor).
- **Actuators:** Components responsible for moving and controlling a mechanism or system (e.g., a motor, a valve).
- **Physical Communication:** Different physical interfaces used by devices to communicate, like USB, I2C, SPI, and UART.

## 6. Logical Design of IoT
Logical design is the abstract representation of the system, focusing on its architecture and functionality independent of physical constraints. It includes:
- **IoT Functional Blocks:** 
  1. *Device:* The hardware.
  2. *Communication:* Protocols used.
  3. *Services:* Device monitoring, control, and data publishing.
  4. *Management:* Remote administration.
  5. *Security:* Authentication and data encryption.
  6. *Application:* User interface.
- **IoT Communication Models:** 
  - *Request-Response:* Client requests data, server responds (e.g., HTTP).
  - *Publish-Subscribe:* Publisher sends data to a "broker"; subscribers receive it (e.g., MQTT).
  - *Push-Pull:* Data is pushed to a queue and pulled by receivers.
  - *Exclusive Pair:* Persistent, bi-directional connection between client and server (e.g., WebSockets).
- **IoT Communication APIs:** REST-based APIs and WebSocket-based APIs used for interaction.

## 7. Application of IoT
IoT spans across multiple domains, making processes smarter and more efficient:
- **Smart Home:** Smart lighting (Philips Hue), smart thermostats (Nest), smart security systems.
- **Smart Cities:** Smart street lighting, smart parking, waste management, structural health monitoring.
- **Healthcare:** Wearable health monitors (Fitbit, Apple Watch), remote patient monitoring, smart hospital beds.
- **Agriculture:** Soil moisture tracking, automated irrigation, crop health monitoring.
- **Industrial (IIoT):** Predictive maintenance on factory floors, supply chain tracking, automated manufacturing.
- **Automotive:** Connected cars, fleet management, autonomous driving technologies.
