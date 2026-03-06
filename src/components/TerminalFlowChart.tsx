import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FlowNode {
  id: string;
  label: string;
  type: 'input' | 'process' | 'decision' | 'output';
  description?: string;
  code?: string;
}

interface FlowStep {
  node: FlowNode;
  delay: number;
  highlight?: string[];
}

interface TerminalFlowChartProps {
  title: string;
  description: string;
  steps: FlowStep[];
  className?: string;
}

export default function TerminalFlowChart({ 
  title, 
  description, 
  steps, 
  className = '' 
}: TerminalFlowChartProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [highlightedCode, setHighlightedCode] = useState<string[]>([]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  useEffect(() => {
    const step = steps[currentStep];
    if (step?.highlight) {
      setHighlightedCode(step.highlight);
    }
  }, [currentStep, steps]);

  const handleRestart = () => {
    setCurrentStep(0);
    setIsPlaying(true);
    setHighlightedCode([]);
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'input': return '▸';
      case 'process': return '◉';
      case 'decision': return '◇';
      case 'output': return '◗';
      default: return '○';
    }
  };

  const highlightText = (text: string, highlights: string[]) => {
    if (!highlights.length) return text;
    
    return text.split(' ').map((word, idx) => {
      const isHighlighted = highlights.some(h => word.toLowerCase().includes(h.toLowerCase()));
      return (
        <span key={idx} style={{ 
          color: isHighlighted ? '#00ff00' : '#ffffff',
          fontWeight: isHighlighted ? 600 : 400,
          textShadow: isHighlighted ? '0 0 10px rgba(0, 255, 0, 0.5)' : 'none'
        }}>
          {word}{' '}
        </span>
      );
    });
  };

  return (
    <div className={`w-full h-full bg-black rounded-lg border border-green-500/30 font-mono text-sm ${className}`}>
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-green-500/30">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-green-500/60 text-xs">
          {title} - Process Flow
        </div>
        <button 
          onClick={handleRestart}
          className="text-green-500/60 hover:text-green-500 text-xs px-2 py-1 border border-green-500/30 rounded"
        >
          RESTART
        </button>
      </div>

      {/* Terminal Content */}
      <div className="p-6 h-[calc(100%-60px)] overflow-hidden">
        <div className="space-y-4">
          {/* Description */}
          <div className="text-green-500/60 text-xs mb-6">
            {description}
          </div>

          {/* Flow Steps */}
          <div className="space-y-3">
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <motion.div
                  key={step.node.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: isActive || isCompleted ? 1 : 0.3,
                    x: isActive || isCompleted ? 0 : -20
                  }}
                  transition={{ duration: 0.5 }}
                  className={`flex items-start gap-3 ${
                    isActive ? 'text-green-400' : isCompleted ? 'text-green-500/60' : 'text-gray-500'
                  }`}
                >
                  {/* Node Icon */}
                  <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center border ${
                    isActive ? 'border-green-400 bg-green-400/10' : 
                    isCompleted ? 'border-green-500/30 bg-green-500/5' : 
                    'border-gray-600 bg-gray-600/5'
                  } rounded`}>
                    <span className="text-lg">{getNodeIcon(step.node.type)}</span>
                  </div>

                  {/* Node Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{step.node.label}</span>
                      {isActive && (
                        <motion.div
                          className="w-2 h-2 bg-green-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      )}
                    </div>
                    
                    {step.node.description && (
                      <div className="text-xs opacity-70 mb-2">
                        {step.node.description}
                      </div>
                    )}

                    {/* Code Display */}
                    {step.node.code && (
                      <div className="bg-black/50 border border-green-500/20 rounded p-2 mt-2">
                        <pre className="text-xs overflow-x-auto">
                          <code>{highlightText(step.node.code, highlightedCode)}</code>
                        </pre>
                      </div>
                    )}
                  </div>

                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-11 mt-8 w-0.5 h-6 bg-green-500/20" />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-green-500/20">
            <div className="text-green-500/60 text-xs">
              Step {currentStep + 1} / {steps.length}
            </div>
            <div className="flex-1 h-1 bg-green-500/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-green-400"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
