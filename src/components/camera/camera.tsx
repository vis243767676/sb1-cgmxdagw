import { useEffect, useRef, useState } from 'react';
import { PoseDetectionResult } from '@/lib/types';
import { LoadingSpinner } from '../ui/loading-spinner';
import { AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';

interface CameraProps {
  onPoseDetected: (pose: PoseDetectionResult) => void;
}

export function Camera({ onPoseDetected }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let animationFrame: number;
    let isMounted = true;

    async function initializeCamera() {
      try {
        setIsLoading(true);
        setError(null);

        // Check if browser supports getUserMedia
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Your browser does not support camera access');
        }

        // Request camera permissions
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user',
          },
        });

        if (!isMounted) return;

        setHasPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await new Promise<void>((resolve) => {
            if (videoRef.current) {
              videoRef.current.onloadedmetadata = () => resolve();
            }
          });

          await videoRef.current.play();
          setIsLoading(false);

          // Start pose detection loop
          function detectPose() {
            if (!isMounted || !videoRef.current || !canvasRef.current) return;

            const ctx = canvasRef.current.getContext('2d');
            if (!ctx) return;

            // Clear previous frame
            ctx.clearRect(0, 0, 640, 480);

            // Draw current video frame
            ctx.drawImage(videoRef.current, 0, 0, 640, 480);

            // Simulate pose detection
            const mockPose: PoseDetectionResult = {
              score: 0.8 + Math.random() * 0.2,
              keypoints: [
                { x: 320 + Math.random() * 20, y: 240 + Math.random() * 20, score: 0.9, name: 'nose' },
                { x: 300 + Math.random() * 20, y: 300 + Math.random() * 20, score: 0.85, name: 'left_shoulder' },
                { x: 340 + Math.random() * 20, y: 300 + Math.random() * 20, score: 0.85, name: 'right_shoulder' },
              ],
            };

            onPoseDetected(mockPose);

            // Draw pose overlay
            ctx.strokeStyle = '#00ff00';
            ctx.lineWidth = 2;

            mockPose.keypoints.forEach((point, index) => {
              // Draw keypoint
              ctx.fillStyle = '#ff0000';
              ctx.beginPath();
              ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
              ctx.fill();

              // Draw connections between points
              if (index > 0) {
                ctx.beginPath();
                ctx.moveTo(mockPose.keypoints[index - 1].x, mockPose.keypoints[index - 1].y);
                ctx.lineTo(point.x, point.y);
                ctx.stroke();
              }
            });

            animationFrame = requestAnimationFrame(detectPose);
          }

          detectPose();
        }
      } catch (err) {
        if (!isMounted) return;
        console.error('Camera initialization error:', err);
        
        if ((err as Error).name === 'NotAllowedError') {
          setError('Camera access denied. Please grant camera permissions to continue.');
          setHasPermission(false);
        } else {
          setError('Failed to initialize camera. Please try again.');
        }
        
        setIsLoading(false);
      }
    }

    initializeCamera();

    return () => {
      isMounted = false;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [onPoseDetected]);

  const handleRetry = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      window.location.reload();
    } catch (err) {
      setError('Camera access denied. Please grant camera permissions in your browser settings.');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-gray-100">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !hasPermission) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center rounded-lg bg-gray-100 p-4 text-center">
        <AlertCircle className="mb-2 h-8 w-8 text-red-500" />
        <p className="mb-4 text-sm text-gray-600">{error || 'Camera permission required'}</p>
        <Button onClick={handleRetry} variant="default" size="sm">
          Grant Camera Access
        </Button>
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
      <video
        ref={videoRef}
        className="absolute h-full w-full object-cover"
        playsInline
        muted
      />
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        className="absolute h-full w-full"
      />
    </div>
  );
}