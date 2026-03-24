# Solutions to Mid Term Test II (Internet of Things)

These solutions are structured to grab full marks for 5-mark questions, containing clear definitions, bullet points, examples, and tabular comparisons where applicable.

---

## QUESTION 1

### Q.1(A) Write a short note on a) HTTP b) WebSocket (5 Marks)
**a) HTTP (Hypertext Transfer Protocol):**
*   **Definition**: HTTP is a fundamental application-level protocol used for transmitting hypermedia documents, such as HTML. It was originally designed for communication between web browsers and web servers.
*   **Architecture**: It follows a simple **Client-Server** model and a **Request-Response** paradigm. The client (e.g., an IoT device or web browser) sends an HTTP request, and the server returns an HTTP response.
*   **Stateless Nature**: HTTP is a stateless protocol. Every request is independent, and the server does not retain session information across multiple requests.
*   **Use in IoT**: While HTTP is ubiquitous, it carries a large overhead (heavy headers), making it less suitable for highly constrained, low-power IoT devices. However, it is widely used for sending non-frequent, simple telemetry data to the cloud.

**b) WebSocket:**
*   **Definition**: WebSocket is a communication protocol that provides full-duplex (two-way) simultaneous communication channels over a single, long-lived TCP connection.
*   **Working Mechanism**: It begins as a standard HTTP request and then "upgrades" to a WebSocket connection. Once established, both the client and server can push data to each other instantly at any time without waiting for requests.
*   **Advantages**: It guarantees much lower overhead and drastically reduced latency compared to HTTP because it eliminates the need to repeatedly send HTTP headers.
*   **Use in IoT**: Ideal for real-time IoT dashboards and applications where continuous, fast data streams exist (e.g., live sensor data feeds, real-time autonomous control, smart home remote controls).

### Q.1(B) What is an IP address? How does a MAC address differ from an IP address? (5 Marks)
**IP Address (Internet Protocol Address):**
An IP address is a unique numerical identifier assigned to every device connected to a computer network that uses the Internet Protocol for communication. Its primary functions are host identification and location addressing. IP addresses can be IPv4 (e.g., `192.168.1.5`) or IPv6 (e.g., `2001:db8::1`), and they are uniquely assigned by a network administrator or dynamically via a DHCP server.

**Difference between MAC Address and IP Address:**

| Feature | MAC Address (Media Access Control) | IP Address (Internet Protocol) |
| :--- | :--- | :--- |
| **Definition** | A physical hardware address assigned to a network interface controller (NIC) by the manufacturer. | A logical address assigned to a device dynamically on a network. |
| **Address Type** | Physical Address. | Logical Address. |
| **Length & Detail**| 48 bits (6 bytes) long, represented in Hexadecimal format format (e.g., 00:1A:2B:3C:4D:5E). | 32 bits (IPv4) or 128 bits (IPv6) long, represented in decimal or hex. |
| **Traceability** | Cannot be changed easily (hardcoded into the chip). | Dynamic and changes when the device moves to a completely different network. |
| **OSI Layer** | Operates at the Data Link Layer (Layer 2). | Operates at the Network Layer (Layer 3). |

---
### OR

### Q.1(A) What are message communication protocols in IoT and how do they work? (5 Marks)
**Message Communication Protocols in IoT:**
These are rules, standards, and formats that dictate how IoT devices, edge gateways, and cloud servers exchange data. Because typical IoT devices possess limited power and operate on constrained, lossy networks, standard web protocols are often inefficient. Appropriate IoT message protocols must be lightweight, consume low power, and handle unstable connections securely.

**How they work (Examples):**
1.  **MQTT (Message Queuing Telemetry Transport):**
    *   Works specifically on a lightweight **Publish/Subscribe** model rather than Client/Server.
    *   Devices (clients) connect to a central server known as a **Broker**.
    *   Sensors *publish* data to specific categories (called "topics"), and applications *subscribe* to those topics to securely receive the streamed data.
2.  **CoAP (Constrained Application Protocol):**
    *   Designed exclusively for constrained hardware nodes and networks (like WSNs).
    *   It uses a Client-Server model similar to HTTP but runs over **UDP** instead of TCP to severely reduce packet overhead.
    *   It supports RESTful architecture concepts modified for IoT.
3.  **AMQP (Advanced Message Queuing Protocol):**
    *   A highly robust protocol intended for enterprise business messaging, offering features like reliable delivery, complex message queuing, and routing mechanisms.

### Q.1(B) How do SOAP and REST differ in terms of performance and flexibility? (5 Marks)
**SOAP (Simple Object Access Protocol):**
SOAP is a highly structured, strict, XML-based messaging protocol.
*   **Performance**: SOAP is heavier and computationally expensive because every single message is wrapped in extensive XML envelopes. This requires significant network bandwidth and hardware processing power, making it a poor choice for low-power IoT constraints.
*   **Flexibility**: Extremely low flexibility. It requires strict adherence to a defined standard interface framework (WSDL - Web Services Description Language) and only works securely with the XML data format.

**REST (Representational State Transfer):**
REST is an architectural mindset and style rather than a strict protocol, commonly implementing standard HTTP web services.
*   **Performance**: REST is lightweight, fast, and scalable. It uses vastly less bandwidth than SOAP, making it performant and highly utilized in modern IoT APIs.
*   **Flexibility**: Highly flexible. Because it relies on standard, understood HTTP methods (GET, POST, PUT, DELETE), REST can handle virtually any data format, including JSON, XML, HTML, and plain text. JSON is extremely common here due to its small footprint.

---

## QUESTION 2

### Q.2(A) What is RFID? Explain its working mechanism. (5 Marks)
**RFID (Radio Frequency Identification):**
RFID is a wireless, non-contact use of radio-frequency electromagnetic fields to automatically identify and track distinct tags attached to physical objects. It is a fundamental enabler in the IoT ecosystem, used daily for real-time asset tracking, modern supply chains, and secure access control.

**Working Mechanism:**
A functional RFID system consists of two primary hardware components: an RFID Tag and an RFID Reader.
1.  **Tag Powering:**
    *   **Active Tags** possess their own internal battery and consistently broadcast their radio signal.
    *   **Passive Tags** lack a battery. The scanning RFID Reader emits a designated radio frequency signal. The tag's internal antenna captures this signal, and the electromagnetic energy induces a tiny electrical current capable of powering the tag's microchip.
2.  **Data Transmission**: Once adequately powered, the RFID tag modulates the radio wave symmetrically, carrying the unique identifier (ID data) hardcoded in its memory.
3.  **Data Reception**: The RFID reader captures this modulated backscatter signal from the tag, digitally decodes it, and securely extracts the unique ID or stored data.
4.  **Backend Processing**: The reader forwards this digital information to a backend database or an IoT cloud platform, linking the ID directly to the physical object's exact record and location history.

### Q.2(B) Discuss the concept of Wireless Sensor Networks (WSNs) and analyze their advantages and drawbacks. (5 Marks)
**Concept of WSNs:**
A Wireless Sensor Network (WSN) is a network system of spatially distributed, autonomous, low-power micro-devices called "sensor nodes" or "motes". These independent nodes cooperatively monitor physical or environmental conditions (like temperature, sound, vibration, pressure) and systematically pass their data through the network structure to a central location or gateway.

**Advantages:**
1.  **Easy Deployment**: Can be rapidly deployed in remote, hazardous, or physically inaccessible environments without relying heavily on permanent wired infrastructure.
2.  **Scalability & Expansion**: New remote sensor nodes can be easily added dynamically to the network to expand physical coverage.
3.  **Fault Tolerance**: By using topologies like Mesh routing, if one single node breaks or fails, data intuitively re-routes itself through other active nodes.
4.  **Cost-Effective**: Massive cost reduction by eliminating structured cabling and wiring constraints over incredibly large areas (e.g., vast agriculture monitoring).

**Drawbacks:**
1.  **Power Constraints**: Most nodes are completely reliant on batteries. When a battery dies, the single node fails, making optimal power management the largest hurdle.
2.  **Security Vulnerabilities**: Wireless transmission natively makes the WSN prone to eavesdropping, packet injection, and unauthorized data access.
3.  **Limited Processing & Storage**: Sensor nodes inherently possess exceptionally limited computation capacity and cannot perform complex actions natively.

---
### OR

### Q.2(A) Give differences between IIOT & IOT (5 Marks)

| Feature | IoT (Internet of Things) | IIoT (Industrial Internet of Things) |
| :--- | :--- | :--- |
| **Focus area** | Consumer-level, commercial applications (Smart Homes, Wearables, Healthcare). | Industrial, manufacturing operations (Logistics, Oil & Gas pipelines, Energy grids). |
| **Primary Goal** | Enhancing daily convenience, comfort, and improving physical user lifestyle. | Optimizing large operational efficiency, safety, output consistency, and predictive maintenance. |
| **Criticality** | Often low-impact if a single device drops (e.g., a smart bulb doesn't respond). | Extremely high-impact if a system drops (failure can cause massive financial ruin or physical danger). |
| **Data Volume** | Ranges from fairly low to moderate depending entirely on user activity. | Habitually handles massive, continuous, and extreme-velocity streams of raw big data. |
| **Security Standards**| Moderate consumer-level network security required. | Requires ultra-robust, ironclad cybersecurity frameworks due to system stakes. |

### Q.2(B) What is sensor & actuator? Give examples of sensor & its uses. (5 Marks)
**Sensor vs. Actuator:**
*   **Sensor**: A hardware component that detects physical variables or changes in the immediate environment (such as motion, temperature, pressure, light levels) and actively converts them into a readable electrical signal or digital data point. It represents the "input" mechanism of any IoT system.
*   **Actuator**: A hardware component that receives an electrical signal or direct digital instruction and mechanically converts it into direct physical action (movement, heat, light, flow). It represents the "output" mechanism of any IoT system.

**Examples of Sensors and Uses:**
1.  **Temperature Sensor (e.g., DHT11)**: Used centrally in Smart HVAC units to monitor a room's exact temperature and automatically toggle ACs accordingly.
2.  **Proximity/Motion Sensor (e.g., PIR Sensor)**: Used heavily in smart security systems or automated hallway lighting to detect sudden human movement signatures.
3.  **Gas/Smoke Sensor (e.g., MQ-2)**: Used reliably in industrial safety suites or residential smoke alarms to detect lethal leakages of CO, methane, or basic fire smoke.
4.  **LDR/Light Sensor**: Integrated securely in modern smartphones for true auto-brightness software adjustment or in smart agriculture systems to correctly measure sun intensity over crops.

---

## QUESTION 3

### Q.3(A) Explain design methodology in detail. (5 Marks)
**IoT Design Methodology:**
Constructing a resilient IoT structure requires a structured, step-by-step sequential approach ensuring all expectations are successfully processed. Primary steps involve:

1.  **Purpose & Requirements Specification**: Specifically defining the fundamental goal (what exactly needs monitoring/control) and identifying concrete constraints (total cost, system size, available power, connectivity limits).
2.  **Process Model Specification**: Visually mapping the exact use cases and control workflows of the system. Documenting exactly how the final user or third-party machines interact with the network.
3.  **Domain Model Specification**: Detailing all the physical functional entities, virtual data entities, hard devices, and internal services. It details how the software interprets the physical world.
4.  **Information Model Specification**: Solidifying the data structures, network message formats (e.g., establishing standard JSON schemas for sensors), and relationship rules between flowing data variables.
5.  **Service Specification**: Formally outlining exactly which software services will execute models over the cloud framework (REST APIs, physical controllers, cloud databases).
6.  **IoT Level Specification**: Finalizing the architectural deployment configuration—whether executing purely as a local single device (Level 1) or a sprawling cloud-integrated mesh layout (Level 6).
7.  **Functional View Specification**: Breaking down the overall system into functional component blocks.
8.  **Operational View Specification**: Selecting the concrete technologies that will fulfill the functional blocks (e.g., choosing a *Raspberry Pi* as the physical device, *Wi-Fi* as the network, *MQTT* as the protocol, and *InfluxDB* for data).

### Q.3(B) What is Raspberry Pi? Explain its features in detail (5 Marks)
**Raspberry Pi:**
The Raspberry Pi is a hugely popularized, low-cost, credit-card-sized Single-Board Computer (SBC). Distinctly unlike simpler microcontrollers (like Arduino modules), it natively runs a comprehensive full operating system (typically "Raspberry Pi OS", a Linux distribution). Within IoT, it is fundamentally deployed as an edge computing server gateway.

**Detailed Features:**
1.  **Full Operating System Environment**: It manages genuine OS tasks, seamlessly empowering developers with the ability to orchestrate complex IoT scripts safely utilizing Python, Java, Node.js, and leveraging heavy computation libraries safely.
2.  **Extreme Processing Capability**: Built utilizing robust multi-core ARM CPU processors and high-capacity RAM (ranging successfully up to 8GB natively), reliably enabling rigorous localized edge-analytics and hosting heavy localized databases.
3.  **Expansive Networking Options**: Out-of-the-box it natively incorporates modern dual-band Wi-Fi connectivity, Bluetooth (BLE), physical Gigabit Ethernet networking, diverse USB inputs, and direct HDMI video outputs.
4.  **40-Pin GPIO Header (General Purpose Input/Output)**: Uniquely includes a functional 40-pin GPIO pinout board seamlessly allowing it to communicate low-level voltages directly to analog electronic components.
5.  **Direct Camera Integration**: Offers specialized dedicated CSI camera ports safely utilized frequently within automated computer-vision and facial recognition IoT monitoring sectors.

---
### OR

### Q.3(A) What are the challenges in IoT privacy? Discuss its solutions. (5 Marks)
**Challenges in IoT Privacy:**
1.  **Eavesdropping & Data Interception**: Open wireless environmental transmissions are relatively straightforward for bad actors to intercept simply by "sniffing" raw network traffic.
2.  **Weak Authentication Access**: Frighteningly high percentages of commercial IoT equipment arrive packaged hardcoded with universal factory-default passwords that average consumers lazily fail to replace.
3.  **Hardware & Physical Tampering**: Devices securely placed far in public infrastructure systems (like automated city streetlights) can be maliciously broken, simply stolen, or hacked via internal USB ports simply because of public accessibility.
4.  **Mass Data Profiling**: Corproations heavily aggregate ungodly amounts of sensitive consumer sensor readings (such as granular smart home activity tracking or private wearable health biometric metrics) which are subsequently weaponized for targeted marketing manipulation without direct consent.

**Solutions for IoT Privacy:**
1.  **Mandate Strong Cryptography Software**: Aggressively strictly enforcing End-to-End Encryption (E2EE) communication principles and integrating TLS/SSL software handshakes regarding all data traveling wirelessly, additionally encrypting databases constantly.
2.  **Over-the-Air (OTA) Firmware Update Mandates**: Instituting mechanisms securely authorizing signed Over-The-Air patching deployments so zero-day vulnerabilities inside offline machines can be patched entirely remotely.
3.  **Strict Authentication Mechanisms**: Permanently forcing individual hardware owners to establish difficult passwords immediately during device boot setups. Integrating X.509 Cryptographic Certificates efficiently.
4.  **Network Architecture Segmentation**: Safely isolating weak IoT sensors onto their own isolated virtual sub-network hardware (VLAN), significantly detached logically from a consumer’s private core PC network layouts.

### Q.3(B) What is Arduino, and how does a microcontroller differ from a microprocessor? (5 Marks)
**Arduino:**
Arduino signifies a tremendously popular open-source electronics platform based meticulously around simple-to-utilize microcontroller boards (routinely operating the ATmega micro-chipset families). It operates heavily alongside its unified IDE (Integrated Development Environment). Within IoT circles, it is favored enormously for creating rudimentary endpoints explicitly focused on continuously polling analog readings without the burdensome power-hogging constraints regarding background OS tasks operations.

**Difference between Microcontroller and Microprocessor:**

| Feature | Microcontroller (e.g., Arduino ATmega328) | Microprocessor (e.g., Raspberry Pi CPU, Intel Core) |
| :--- | :--- | :--- |
| **Architectural Design** | Integrates Central CPU, structural RAM memory, ROM, and physical I/O output pins completely onto a **single standalone silicon chip**. | Contains absolutely strictly exactly only the central CPU processor cores permanently on the chip array. |
| **Functional Purpose** | Exclusively structured toward performing one specific programmed hardware objective repeatedly forever safely (e.g., operating a simple digital temperature timer). | Intended firmly towards universal generic-purpose computational loads, graphical tasks, massive multitasking workloads continually. |
| **Raw Processing Htz** | Operationally exceptionally miniscule (averages around typical 16 MHz bounds mostly). | Computationally staggeringly large (averages routinely among 2.0 GHz+ benchmarks currently). |
| **Constant Power Draw** | Infinitesimally low power consumption averages; explicitly outstanding for multi-year remote battery-reliant WSN endpoint operations entirely. | Extreme power hungry hardware characteristics; demands reliable constant external hard power supply connections flawlessly to operate safely. |
| **Operating System** | Systematically initiates hardware code loops without an underlying OS software foundation (referred constantly strictly as bare-metal code looping). | Inoperable absolutely without utilizing fully featured commercial OS foundations (like standard Windows UI platforms or Linux servers). |
