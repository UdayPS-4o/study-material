# Module 5: IoT Design Methodology, Security & Raspberry Pi

## 1. IoT Design Methodology
Designing an IoT system requires a structured approach to ensure that the system meets its functional, operational, and performance requirements. The standard IoT design methodology involves several distinct steps:

### a. Purpose & Requirements Specification
*   **Purpose**: Defining what the IoT system needs to do.
*   **Requirements**: Defining the constraints and conditions. Includes:
    *   *Data Collection Requirements*: What is being measured?
    *   *Data Analysis Requirements*: Where does the processing happen? (Edge vs. Cloud).
    *   *System Management Requirements*: How will devices be monitored and updated?
    *   *Security Requirements*: How will data be protected?

### b. Process Model Specification
*   Defines the *use cases* of the IoT system.
*   It describes exactly how the system behaves, the sequence of events, and how the user interacts with it (often modeled using UML diagrams or flowcharts).

### c. Domain Model Specification
*   Describes the main concepts, entities, and objects in the domain of the IoT system.
*   Highlights the definitions of concepts and the relationships between them. For example, distinguishing between physical entities (e.g., a room), virtual entities (e.g., temperature reading), devices, and services.

### d. Information Model Specification
*   Defines the structure of all the information in the IoT system.
*   Describes how data is represented, ensuring that all components understand the data format (e.g., defining the JSON structure for a sensor reading: `{ "sensor_id": 1, "temp": 25.5, "timestamp": "2026-03-24T10:00:00Z" }`).

### e. Service Specification
*   Maps the processes and information models to actual software services.
*   Defines the REST APIs, WebSocket interfaces, or MQTT brokers that will handle data communication, business logic, and database operations.

### f. IoT Level Specification
*   Defines the deployment architecture. Decide which of the standard "IoT Levels" (typically Level 1 to 6) best suits the system based on scale, data volume, and analysis needs. 
    *   *Level 1*: Single node doing everything locally.
    *   *Level 6*: Independent end nodes, cloud-based data storage, and centralized analysis.

### g. Functional View Specification
*   Breaks down the system into functional components:
    *   *Device*: Sensors, actuators, edge processors.
    *   *Communication*: Protocols (Wi-Fi, Zigbee, MQTT).
    *   *Services*: Device monitoring, data publishing.
    *   *Management*: Device provisioning, firmware updates.
    *   *Security*: Authentication, authorization, encryption.
    *   *Application*: User interface, dashboards.

### h. Operational View Specification
*   Defines the exact options selected for the functional view components.
*   For example: Choosing *Raspberry Pi* (Device), *Wi-Fi 802.11n* (Communication), *MQTT over TLS* (Communication & Security), *InfluxDB* (Service/Storage).

### i. Device & Component Integration
*   The physical and logical assembly of the system. Writing the code for the microcontroller, setting up the cloud servers, and connecting the hardware.

### j. Application Development
*   Developing the final user-facing application (web, mobile, or desktop dashboard) that end-users will use to view data or control the system.

---

## 2. IoT Privacy and Security Solutions
IoT devices are notoriously vulnerable due to low computational power (often cannot run heavy encryption), massive scale, and physical accessibility.

*   **Key Challenges**:
    *   Default/Weak Passwords on devices.
    *   Lack of encryption in transit (e.g., using plain HTTP instead of HTTPS/TLS).
    *   Unsecured network interfaces and open ports.
    *   Physical tampering.
*   **Security Solutions**:
    *   **Authentication & Authorization**: Ensuring only trusted devices connect to the network (e.g., using X.509 certificates).
    *   **Data Encryption**: Using TLS/SSL for secure data transfer, and encrypting data at rest on the database.
    *   **Firmware Updates**: Over-The-Air (OTA) secure updates to patch vulnerabilities.
    *   **Network Security**: Using firewalls, VPNs, and keeping IoT networks isolated (VLANs) from core corporate/home networks.
    *   **Hardware Security**: Tamper-proof hardware, Trusted Execution Environments (TEE), Hardware Security Modules (HSM).

---

## 3. Raspberry Pi & Arduino Devices
These are the two most popular platforms for prototyping and developing physical IoT devices.

### Arduino
*   **Type**: Microcontroller board.
*   **OS**: No operating system. Runs a single C/C++ program in a continuous loop.
*   **Strengths**: Real-time hardware control, extremely low power, simple to interface with low-level analog sensors and actuators, instant boot time.
*   **Use in IoT**: Reading sensors, controlling motors, basic networking (if equipped with a Wi-Fi module like ESP8266/ESP32). Used primarily as edge sensors/actuators.

### Raspberry Pi
*   **Type**: Single-Board Computer (SBC).
*   **OS**: Runs a full Operating System (Linux - usually Raspberry Pi OS).
*   **Strengths**: High processing power, multi-tasking, networking capabilities (built-in Wi-Fi/Ethernet/Bluetooth), handles high-level languages like Python, Java, Node.js.
*   **Use in IoT**: Used as an Edge Gateway. It can aggregate data from multiple Arduinos/sensors, run localized database, perform edge analytics, and communicate securely with the Cloud.

---

## 4. IoT Case Studies: Smart City Streetlights Control & Monitoring
A classic smart city application that saves energy, reduces maintenance costs, and improves public safety.

### System Architecture
1.  **Sensors on Streetlights**: Each streetlight is equipped with:
    *   *LDR (Light Dependent Resistor)*: Measures ambient light (sunlight detection).
    *   *PIR Motion Sensor*: Detects passing vehicles or pedestrians.
    *   *Current/Voltage Sensor*: Monitors the health of the bulb.
2.  **Controller & Communication**: 
    *   A microcontroller (like ESP32) processes sensor data.
    *   Communicates via LoRaWAN, Zigbee, or NB-IoT to a local city gateway.
3.  **Cloud & Application**:
    *   The gateway forwards data to a cloud server.
    *   A centralized web dashboard allows city administrators to monitor the grid in real-time.

### Working Mechanism (Scenarios)
*   **Time or Light-Based Control**: The lights automatically turn on gradually as the sun sets (detected by LDR) instead of using a rigid timer.
*   **Motion-Based Dimming**: At midnight when traffic is low, lights dim to 20% brightness to save energy. When the PIR sensor detects motion (an approaching car or pedestrian), the specific light and the next few consecutive lights brighten to 100%. Once they pass, the lights return to 20%.
*   **Fault Detection**: If the current sensor detects 0 amps while the controller is telling the light to turn on, it registers a "Bulb Failed" event. The cloud server instantly logs an alert and dispatches a maintenance crew with the exact GPS coordinates of the broken light, eliminating the need for periodic manual inspections. 

### Benefits Achieved
*   Up to 50-70% energy savings through intelligent dimming.
*   Reduced CO2 emissions and extended lifespan of the LED bulbs.
*   Immediate maintenance response.
*   Enhanced public safety and optimized infrastructure management.
