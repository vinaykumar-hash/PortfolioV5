import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const CircuitBackground = () => {
    // Configuration
    const NODE_COUNT = 30; // Number of nodes
    const MAX_DISTANCE = 25; // Max distance to connect nodes (percentage)
    const PULSE_COUNT = 8; // Number of data packets flowing

    // Generate stable random nodes
    const nodes = useMemo(() => {
        return Array.from({ length: NODE_COUNT }).map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
        }));
    }, []);

    // Generate connections based on distance
    const connections = useMemo(() => {
        const lines = [];
        nodes.forEach((node, i) => {
            nodes.slice(i + 1).forEach((otherNode, j) => {
                const dx = node.x - otherNode.x;
                const dy = node.y - otherNode.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < MAX_DISTANCE) {
                    lines.push({
                        start: node,
                        end: otherNode,
                        id: `${i}-${i + j + 1}`,
                        distance: distance
                    });
                }
            });
        });
        return lines;
    }, [nodes]);

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
            <svg className="w-full h-full">
                {/* Connections */}
                {connections.map((line) => (
                    <line
                        key={line.id}
                        x1={`${line.start.x}%`}
                        y1={`${line.start.y}%`}
                        x2={`${line.end.x}%`}
                        y2={`${line.end.y}%`}
                        stroke="white"
                        strokeWidth="1"
                        strokeOpacity="0.2"
                    />
                ))}

                {/* Nodes */}
                {nodes.map((node, i) => (
                    <circle
                        key={i}
                        cx={`${node.x}%`}
                        cy={`${node.y}%`}
                        r="2"
                        fill="white"
                        fillOpacity="0.5"
                    />
                ))}

                {/* Data Pulses (Live Data Flow) */}
                {connections.map((line, i) => {
                    // Only add pulses to a subset of lines to avoid chaos, or random chance
                    if (Math.random() > 0.8) return null;

                    return (
                        <motion.circle
                            key={`pulse-${i}`}
                            r="3"
                            fill="#8b5cf6" // Violet/Purple accent for data
                            initial={{
                                cx: `${line.start.x}%`,
                                cy: `${line.start.y}%`,
                                opacity: 0
                            }}
                            animate={{
                                cx: [`${line.start.x}%`, `${line.end.x}%`],
                                cy: [`${line.start.y}%`, `${line.end.y}%`],
                                opacity: [0, 1, 0]
                            }}
                            transition={{
                                duration: 2 + Math.random() * 3, // Random duration for variety
                                repeat: Infinity,
                                ease: "linear",
                                repeatDelay: Math.random() * 2
                            }}
                        />
                    );
                })}
            </svg>
        </div>
    );
};

export default CircuitBackground;
