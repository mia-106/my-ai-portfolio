import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface FlowNode {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  type: 'input' | 'process' | 'decision' | 'output';
}

interface FlowConnection {
  from: string;
  to: string;
  label?: string;
  color: string;
}

interface InteractiveFlowChartProps {
  title: string;
  description: string;
  nodes: FlowNode[];
  connections: FlowConnection[];
  className?: string;
}

export default function InteractiveFlowChart({ 
  title, 
  description, 
  nodes, 
  connections, 
  className = '' 
}: InteractiveFlowChartProps) {
  const [activePath, setActivePath] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // 自动演示流程
  useEffect(() => {
    const paths = ['chitchat', 'query', 'search_direct'];
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      setActivePath(paths[currentIndex]);
      currentIndex = (currentIndex + 1) % paths.length;
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const isNodeActive = (nodeId: string) => {
    if (!activePath) return false;
    
    // 根据激活的路径判断节点是否高亮
    const pathConnections = connections.filter(conn => 
      conn.label === activePath || 
      (conn.from === 'Router' && connections.indexOf(conn) === ['chitchat', 'query', 'search_direct'].indexOf(activePath))
    );
    
    return pathConnections.some(conn => conn.from === nodeId || conn.to === nodeId);
  };

  return (
    <div className={`w-full h-full p-4 flex items-center justify-center bg-[#0a0a0a] rounded-xl relative ${className}`}>
      {/* SVG 流程图 */}
      <svg 
        viewBox="0 0 800 400" 
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.05))' }}
      >
        {/* 定义渐变 */}
        <defs>
          <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
          </linearGradient>
          
          {/* 发光效果 */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* 连接线 */}
        {connections.map((conn) => {
          const fromNode = nodes.find(n => n.id === conn.from);
          const toNode = nodes.find(n => n.id === conn.to);
          
          if (!fromNode || !toNode) return null;
          
          const isActive = activePath === conn.label;
          const isHighlighted = isNodeActive(conn.from) || isNodeActive(conn.to);
          
          return (
            <g key={`${conn.from}-${conn.to}`}>
              {/* 连接线 */}
              <motion.line
                x1={fromNode.x + 60}
                y1={fromNode.y + 30}
                x2={toNode.x + 60}
                y2={toNode.y + 30}
                stroke={isActive ? 'url(#glowGradient)' : (isHighlighted ? '#ffffff' : '#374151')}
                strokeWidth={isActive ? 2 : (isHighlighted ? 1.5 : 1)}
                strokeDasharray={isActive ? "0" : "5,5"}
                animate={{
                  strokeDasharray: isActive ? "0" : "5,5",
                  opacity: isActive || isHighlighted ? 1 : 0.4
                }}
                transition={{ duration: 0.5 }}
              />
              
              {/* 流动光点 */}
              {isActive && (
                <motion.circle
                  r="4"
                  fill="#fff"
                  filter="url(#glow)"
                  initial={{ cx: fromNode.x + 60, cy: fromNode.y + 30 }}
                  animate={{ 
                    cx: [fromNode.x + 60, toNode.x + 60],
                    cy: [fromNode.y + 30, toNode.y + 30]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
              
              {/* 连接线标签 */}
              {conn.label && (
                <text
                  x={(fromNode.x + toNode.x) / 2 + 60}
                  y={(fromNode.y + toNode.y) / 2 + 20}
                  fill={isActive ? '#ffffff' : '#6b7280'}
                  fontSize="11"
                  textAnchor="middle"
                  className="font-mono"
                  style={{ fontWeight: 300 }}
                >
                  {conn.label}
                </text>
              )}
            </g>
          );
        })}

        {/* 节点 */}
        {nodes.map((node) => {
          const isActive = isNodeActive(node.id);
          const isHovered = hoveredNode === node.id;
          
          return (
            <motion.g
              key={node.id}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              animate={{
                scale: isActive ? 1.05 : (isHovered ? 1.02 : 1),
                opacity: isActive ? 1 : 0.8
              }}
              transition={{ duration: 0.3 }}
            >
              {/* 节点背景 */}
              <rect
                x={node.x}
                y={node.y}
                width="120"
                height="60"
                rx="4"
                fill={isActive ? '#ffffff' : '#0a0a0a'}
                stroke={isActive ? '#ffffff' : '#374151'}
                strokeWidth="1.5"
                filter={isActive ? "url(#glow)" : undefined}
              />
              
              {/* 节点类型图标 - 使用几何图形 */}
              <g transform={`translate(${node.x + 60}, ${node.y + 20})`}>
                {node.type === 'input' && (
                  <circle cx="0" cy="0" r="8" fill={isActive ? '#000000' : '#ffffff'} opacity={isActive ? 1 : 0.6} />
                )}
                {node.type === 'process' && (
                  <rect x="-8" y="-8" width="16" height="16" fill={isActive ? '#000000' : '#ffffff'} opacity={isActive ? 1 : 0.6} />
                )}
                {node.type === 'decision' && (
                  <polygon points="0,-10 10,10 -10,10" fill={isActive ? '#000000' : '#ffffff'} opacity={isActive ? 1 : 0.6} />
                )}
                {node.type === 'output' && (
                  <polygon points="-10,0 10,-5 10,5" fill={isActive ? '#000000' : '#ffffff'} opacity={isActive ? 1 : 0.6} />
                )}
              </g>
              
              {/* 节点文字 */}
              <text
                x={node.x + 60}
                y={node.y + 45}
                fill={isActive ? '#000000' : '#ffffff'}
                fontSize="12"
                textAnchor="middle"
                className="font-mono"
                style={{ fontWeight: 400 }}
              >
                {node.label}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
