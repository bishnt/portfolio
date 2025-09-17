---
title: "L2G Simple Fault Detection System"
description: "A simple fault detection system built during a hackathon using relay modules for automatic load disconnection and fault indication."
category: "Hardware/IoT"
status: "Completed"
startDate: "2024-03-15"
endDate: "2024-03-17"
technologies: ["Arduino", "Relay Module", "C++", "Hardware Interfacing", "Sensors"]
githubUrl: ""
liveUrl: ""
image: "/proj4.jpg"
author: "Bishrant Ghimire"
---

# L2G Simple Fault Detection System

**Project Name:** L2G Simple Fault Detection System

**My Role:** Hardware Developer / Team Member

**Tech Used:** Arduino, Relay Module, C++, Hardware Interfacing, Sensors

**Description:** 
L2G is a simple fault detection system developed during a hackathon focusing on automatic electrical fault detection and load disconnection. The system uses relay modules as the main component to detect electrical faults and automatically disconnect loads to prevent damage. Built with Arduino microcontroller, the system monitors electrical parameters, detects anomalies like overcurrent or short circuits, and triggers relay modules to isolate faulty circuits. The project demonstrates basic electrical safety automation with real-time fault detection, automatic load switching, and visual/audio fault indication systems.

## Project Overview

L2G was conceived and built during a hackathon as a practical solution for basic electrical fault protection. The system focuses on simplicity and reliability, using readily available components to create an automated safety mechanism for electrical circuits.

Key features include:

- **Automatic Fault Detection**: Real-time monitoring of electrical parameters
- **Relay-Based Load Control**: Automatic disconnection using relay modules
- **Fault Indication**: Visual and audio alerts for detected faults
- **Simple Interface**: Basic status display and manual controls
- **Quick Response**: Fast fault detection and isolation

## Technical Implementation

### Hardware Architecture

Built around **Arduino microcontroller** with relay modules:

- Current sensing for overcurrent detection
- Voltage monitoring for electrical parameter tracking
- Relay module control for load switching
- LED indicators and buzzer for fault notification
- Simple push-button interface for manual operations

### Control Logic

**Arduino C++** programming for system control:

- Sensor data reading and processing
- Threshold-based fault detection algorithms
- Relay control logic for load disconnection
- Status indication and user interface management

### Circuit Design

**Relay Module Integration** as core component:

- High-current load switching capability
- Electrical isolation between control and power circuits
- Multiple relay channels for different load zones
- Fail-safe operation in fault conditions

## Key Features

### Fault Detection Mechanism

The system's core functionality includes:

- Current threshold monitoring for overcurrent detection
- Voltage level monitoring for supply anomalies
- Real-time parameter comparison with preset limits
- Immediate fault flag generation upon detection

### Automatic Load Control

Relay-based switching system:

- Instant load disconnection upon fault detection
- Manual reset capability after fault clearance
- Multiple load zone control with individual relays
- Status feedback for each controlled circuit

### User Interface

Simple indication and control system:

- LED status indicators for system operation
- Audio buzzer for fault alerts
- Push-button controls for manual override
- Basic display showing system status

## Development Process

### Hackathon Constraints

1. **Time Limitation**: 48-hour development window
2. **Component Availability**: Using readily available hackathon supplies
3. **Simplicity Focus**: Prioritizing working prototype over complexity
4. **Team Coordination**: Quick collaboration and task distribution

### Implementation Approach

1. **Rapid Prototyping**: Quick breadboard setup and testing
2. **Iterative Testing**: Continuous testing with simulated faults
3. **Component Integration**: Systematic addition of hardware modules
4. **Functionality Validation**: Testing under various fault scenarios

## My Thoughts

Building the L2G fault detection system during a hackathon was an intense but rewarding experience that pushed me into hardware development territory. Working under tight time constraints with limited components taught me the value of simple, effective solutions over complex implementations.

The relay module became the heart of our system, and learning to interface it properly with the Arduino while handling the electrical safety aspects was both challenging and educational. Understanding concepts like electrical isolation, current sensing, and fail-safe design gave me practical insights into hardware engineering that you can't get from pure software development.

What made this project special was the collaborative hackathon environment. Working as a team to rapidly prototype, test, and iterate taught me about quick decision-making and focusing on core functionality first. The pressure to deliver a working demo within 48 hours meant we had to be very practical about our approach - no over-engineering, just solid, reliable functionality.

The hands-on experience with hardware interfacing, from reading sensor data to controlling high-current relays, was completely different from my usual software projects. Debugging hardware issues, dealing with electrical noise, and ensuring safe operation added a new dimension to my problem-solving skills.

Even though it was a simple system, seeing it actually detect faults and automatically disconnect loads felt incredibly satisfying. It was one of those projects where you build something that could genuinely prevent electrical accidents or equipment damage in real scenarios.

## Results and Impact

The system successfully demonstrates:

- **Hardware Integration Skills**: Successful Arduino and relay module interfacing
- **Rapid Prototyping**: Functional system built within hackathon timeframe
- **Practical Problem Solving**: Real-world electrical safety application
- **Team Collaboration**: Effective hackathon team coordination

### Key Achievements

- **Working Prototype**: Functional fault detection and automatic disconnection
- **Reliable Operation**: Consistent performance under test conditions
- **Safety Implementation**: Proper electrical isolation and fail-safe design
- **Hackathon Success**: Completed project within competition constraints

## Technical Specifications

### System Capabilities

- **Fault Detection**: Overcurrent and voltage anomaly detection
- **Response Time**: Sub-second fault detection and relay activation
- **Load Capacity**: Determined by relay module specifications
- **Control Interface**: Manual override and reset capabilities
- **Indication**: Visual LED and audio buzzer alerts

### Hardware Components

- **Microcontroller**: Arduino-based control system
- **Switching**: Relay modules for load control
- **Sensing**: Current and voltage monitoring circuits
- **Interface**: LED indicators and push-button controls
- **Power Supply**: Appropriate power management for system operation

## Conclusion

The L2G fault detection system represents a successful hackathon project that bridged software programming with practical hardware implementation. Building a working electrical safety system in just 48 hours taught me valuable lessons about rapid prototyping, hardware interfacing, and the importance of simple, reliable solutions. While it may not have the complexity of modern smart systems, it demonstrates fundamental engineering principles and the satisfaction of creating something that serves a real safety purpose. The experience of working with relay modules and electrical systems opened up a new area of interest beyond pure software development.