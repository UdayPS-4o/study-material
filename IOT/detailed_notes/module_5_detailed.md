# Module 5 — Detailed Exam Notes: IoT Design Methodology, Security & Case Studies

> **Purpose:** Comprehensive notes on the formal methodology for designing IoT systems, addressing critical privacy/security concerns, hardware comparisons, and an end-to-end case study.

---

## Topic 1: IoT Design Methodology

Building an IoT system from scratch is complex. A structured design methodology ensures all requirements, physical elements, and logical connections are mapped correctly before deployment. The standard methodology involves multiple steps or "specifications".

### Step 1: Purpose & Requirements Specification
*   **Action:** Define the core purpose of the system. What problem is it solving?
*   **Details:**
    *   *Purpose:* e.g., "A smart home automation system."
    *   *Behavior:* e.g., "Must allow remote control of lights and AC."
    *   *Requirements:* Broken down into Data requirements, Operational requirements, and User Interface requirements.

### Step 2: Process Specification
*   **Action:** Defining the exact sequence of events or the state transitions in the system.
*   **Details:** Use Cases are defined here. You map out the step-by-step logic.
    *   *Example:* IF (Mode = Auto AND Light Level < threshold) THEN (Turn on Light).

### Step 3: Domain Model Specification
*   **Action:** Create an abstract representation of the main concepts, entities, and relationships in the IoT domain, independent of specific technology.
*   **Details:** Defines "Physical Entities" (e.g., Room), "Virtual Entities" (e.g., Digital representation of the room), "Devices", and "Services".

### Step 4: Information Model Specification
*   **Action:** Define the structure of all the information (data) handled by the IoT system.
*   **Details:** Defines the attributes of the Virtual Entities. e.g., The `Virtual Room` entity has attributes like `temperature (float)` and `light_status (boolean)`.

### Step 5: Service Specifications
*   **Action:** Map the entities to specific services.
*   **Details:** Determine what services are needed to read data, control devices, or process information. e.g., `Controller Service`, `Mode Service`.

### Step 6: IoT Level Specification
*   **Action:** Determine the deployment architecture.
*   **Details:** Choose whether the system will be local (IoT Level 1), cloud-based with heavy analytics (IoT Level 5), or something in between based on data volume and latency requirements.

### Step 7: Functional View Specification
*   **Action:** Map out the high-level functional groups.
*   **Details:** Define groups like "Device", "Communication", "Services", "Management", "Security", and "Application".

### Step 8: Operational View Specification
*   **Action:** Define exactly *how* the functional groups will be implemented operationally.
*   **Details:** This is where abstract choices become concrete. e.g., specifying that the communication protocol will be **Wi-Fi**, the messaging protocol will be **MQTT**, and the cloud server will be **AWS EC2**.

### Step 9: Device & Component Integration
*   Finalizing hardware components and integrating them.

### Step 10: Application Development
*   Developing the end-user GUI, mobile app, or dashboard.

---

## Topic 2: IoT Privacy and Security Solutions

Security is the biggest challenge in IoT deployments because devices are often deployed in insecure physical locations and have limited processing power to run complex encryption algorithms.

### Key IoT Security Challenges
1.  **Vulnerable Devices (Hardware & Software):** 
    *   Manufactures often ship devices with hardcoded or default passwords (e.g., "admin/admin") that users never change.
    *   Many IoT devices completely lack the capability to receive firmware updates, leaving them permanently exposed to zero-day vulnerabilities.
2.  **Network Security & Massive Attack Surface:** 
    *   IoT introduces billions of new endpoints to the internet. Each device is a potential entry point for hackers into a broader corporate or home network.
    *   Wireless networks (Wi-Fi, Zigbee) can be intercepted (sniffed), jammed, or subjected to Man-in-the-Middle (MitM) attacks.
3.  **Data Privacy & Sensitivity:**
    *   IoT devices collect highly intimate and sensitive personal data (e.g., continuous heart rate from medical monitors, live video feeds from home security cameras).
    *   Users often lack visibility into what data is being collected, where it is sent, or who has access to it.
4.  **Resource Constraints:**
    *   Small sensors have severely limited processing power and battery life, meaning they physically cannot run complex cryptographic algorithms (like AES-256) effectively.
5.  **Lack of Standardization:**
    *   The IoT ecosystem is highly fragmented. Countless proprietary protocols and standards mean there is no unified security framework, making holistic security extremely difficult.
6.  **Physical Accessibility & Sabotage:**
    *   Unlike secure data center servers, IoT sensors are often deployed in public or unattended locations (e.g., remote agricultural sensors, streetlights), making them highly susceptible to physical theft, tampering, or malicious reprogramming.

### IoT Security Solutions
1.  **Device Authentication:**
    *   Every device must be authenticated before joining the network.
    *   Solutions: Digital Certificates (PKI), MAC Address filtering, Biometrics (for users accessing the system).
2.  **Data Encryption:**
    *   *Data at Rest:* Encrypting data stored on the device or cloud storage.
    *   *Data in Transit:* Using Transport Layer Security (TLS/SSL) to encrypt data over the network (e.g., HTTPS, MQTTS).
3.  **Access Control (Authorization):**
    *   Implementing strict Role-Based Access Control (RBAC). A guest user shouldn't be able to reconfigure the smart thermostat's master schedule.
4.  **Firmware Updates (OTA):**
    *   Secure Over-The-Air (OTA) updates are crucial to patch discovered vulnerabilities. The device must verify the digital signature of the incoming update.
5.  **Network Segmentation:**
    *   Placing IoT devices on a separate, isolated VLAN on the network so that if a smart bulb is hacked, the hacker cannot access the main server or personal computers on the same network.
6.  **Physical Security:**
    *   Tamper-proof casing for outdoor sensors. Using secure boot mechanisms so the device won't boot if tampered with.

---

## Topic 3: Hardware Devices - Raspberry Pi & Arduino

At the edge of the IoT ecosystem, localized computing is handled by microcontrollers and single-board computers.

### Arduino
*   **Type:** Microcontroller board.
*   **OS:** No Operating System. It runs a single program (sketch) in an infinite loop.
*   **Processing Power:** Low (e.g., 16 MHz processor, 2KB RAM).
*   **Best Used For:** Hard real-time tasks, simple repetitive tasks, direct hardware interaction, reading analog sensors perfectly, very low power applications.
*   **IoT Role:** Excellent as a "Sensor Node" or "Mote" at the very edge of the network. Must usually add a Wi-Fi module (like ESP8266) to connect to IoT.

### Raspberry Pi (RPi)
*   **Type:** Single-Board Computer (SBC).
*   **OS:** Runs a full Operating System (typically Linux - Raspberry Pi OS).
*   **Processing Power:** High (e.g., 1.5 GHz Quad-Core processor, 2GB-8GB RAM).
*   **Best Used For:** Complex networking, running databases, heavy data processing, handling multiple tasks simultaneously, multimedia applications.
*   **IoT Role:** Excellent as an "IoT Gateway" or local edge server. It can aggregate data from multiple Arduinos, process it, and send a summary to the cloud.

### Quick Comparison Table
| Feature | Arduino | Raspberry Pi |
| :--- | :--- | :--- |
| **Architecture** | Microcontroller | Microprocessor (SBC) |
| **Operating System**| None (Bare Metal) | Linux |
| **Complexity** | Simple, Single Task | Complex, Multi-tasking |
| **Power Consumption**| Very Low | High |
| **Analog Inputs** | Yes, built-in ADC | No (requires external ADC chip) |

---

## Topic 4: IoT Case Study - Smart City Streetlights Control & Monitoring

This is an end-to-end practical application tying all previous modules together.

### Problem Statement
Traditional streetlights run on pre-set timers (e.g., 6 PM to 6 AM). This wastes massive amounts of electricity during summer (when 6 PM is still bright) or late at night when streets are entirely empty. Further, detecting a broken bulb requires manual patrol.

### Proposed IoT System Solution
Create a networked, intelligent street lighting system that adapts to the environment and reports faults automatically.

### System Architecture mapping

**1. Perception Layer (Physical Edge):**
*   **Sensors:**
    *   *LDR (Light Dependent Resistor):* To measure ambient natural light (turn on only when it's actually dark).
    *   *PIR (Passive Infrared) / Radar:* To detect the motion of vehicles or pedestrians.
    *   *Current/Voltage Sensor:* To monitor power consumption and detect if a bulb has blown.
*   **Actuators:** Relays to switch lights ON/OFF and dimming circuits to control brightness.
*   **Controller:** A microcontroller (e.g., ESP32 or Arduino w/ LoRa module) inside each streetlight pole.

**2. Network Layer:**
*   **Local Network:** Since Wi-Fi is too short-range for city streets, and cellular for every pole is too expensive, the poles communicate via a **Wireless Sensor Network (Mesh Topology)** using protocols like **Zigbee** or **LoRaWAN**.
*   **Gateway:** A central Raspberry Pi (or rugged industrial gateway) in the neighborhood collects data from the mesh network and sends it securely to the cloud via Cellular 4G.

**3. Data Processing & Cloud Layer:**
*   Data is stored in a Time-Series Database on an IoT Cloud Platform (e.g., AWS IoT).
*   The cloud executes business rules.

**4. Application Layer:**
*   A centralized web dashboard monitored by city engineers.

### Operational Logic (Process Specification)
1.  **Daylight Rule:** If LDR reading > Threshold (Daytime), Light = OFF regardless of motion.
2.  **Night Empty Rule:** If LDR reading < Threshold (Night) AND No Motion detected → Light = Dimmed to 20% (saves power, maintains basic security).
3.  **Night Active Rule:** If LDR reading < Threshold (Night) AND Motion detected → Light = 100% Brightness for 5 minutes. (Neighboring lights also light up ahead of the vehicle via communication).
4.  **Fault Rule:** If relay=ON but Current Sensor=0 → Bulb is broken. Send alert to dashboard immediately.

### Benefits achieved:
*   Up to 60-70% energy savings.
*   Instant fault reporting reduces maintenance costs.
*   Increased public safety due to responsive lighting.

---

## Exam Tips for Module 5 🎯
1.  **Design Methodology steps:** Just memorize the general flow: Purpose $\rightarrow$ Process $\rightarrow$ Domain/Info Model $\rightarrow$ Services $\rightarrow$ Operational View. Emphasize that it moves from abstract requirements to concrete technical choices.
2.  **Security Solutions:** Categorize them clearly: Authentication (who), Encryption (data hiding), Updates (OTA patching).
3.  **Arduino vs RPi:** The fundamental difference is **No OS vs Linux OS** and **Microcontroller vs Microprocessor**. Describe their roles: Arduino as the *edge sensor node*, RPi as the *gateway*.
4.  **Smart Streetlight Case Study:** Structure your answer cleanly. State the problem $\rightarrow$ Define the hardware (LDR, PIR, Relays) $\rightarrow$ Define the network (LoRa/Zigbee Mesh) $\rightarrow$ Explain the behavioral logic (dimming when empty). This shows a complete grasp of the entire course.
