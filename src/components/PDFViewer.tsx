"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as pdfjsLib from "pdfjs-dist";

// Set worker path
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

interface PDFViewerProps {
  url: string;
  currentPage: number;
  onPageChange: (page: number) => void;
  onLoadSuccess: (numPages: number) => void;
  onLoadError: (error: Error) => void;
  eyeComfortMode: boolean;
  onNext: () => void;
  onPrev: () => void;
}

export function PDFViewer({
  url,
  currentPage,
  onLoadSuccess,
  onLoadError,
  eyeComfortMode,
}: PDFViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Load PDF document
  useEffect(() => {
    let isCancelled = false;

    const loadPdf = async () => {
      try {
        setIsLoading(true);
        setLoadingProgress(0);

        const loadingTask = pdfjsLib.getDocument(url);

        loadingTask.onProgress = (progress: { loaded: number; total: number }) => {
          if (progress.total > 0) {
            setLoadingProgress(Math.round((progress.loaded / progress.total) * 100));
          }
        };

        const pdf = await loadingTask.promise;

        if (!isCancelled) {
          setPdfDoc(pdf);
          onLoadSuccess(pdf.numPages);
          setIsLoading(false);
        }
      } catch (error) {
        if (!isCancelled) {
          onLoadError(error instanceof Error ? error : new Error("Failed to load PDF"));
          setIsLoading(false);
        }
      }
    };

    loadPdf();

    return () => {
      isCancelled = true;
    };
  }, [url, onLoadSuccess, onLoadError]);

  // Render current page
  const renderPage = useCallback(async () => {
    if (!pdfDoc || !canvasRef.current || !containerRef.current) return;

    try {
      const page = await pdfDoc.getPage(currentPage);
      const canvas = canvasRef.current;
      const container = containerRef.current;
      const context = canvas.getContext("2d");

      if (!context) return;

      // Get container dimensions
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      // Get page dimensions
      const viewport = page.getViewport({ scale: 1 });
      const pageWidth = viewport.width;
      const pageHeight = viewport.height;

      // Calculate scale to fit page in container while maintaining aspect ratio
      const scaleX = containerWidth / pageWidth;
      const scaleY = containerHeight / pageHeight;
      const scale = Math.min(scaleX, scaleY) * 0.95; // 95% to add some padding

      // Create scaled viewport
      const scaledViewport = page.getViewport({ scale });

      // Set canvas dimensions
      canvas.width = scaledViewport.width;
      canvas.height = scaledViewport.height;

      // Clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Render page
      await page.render({
        canvasContext: context,
        viewport: scaledViewport,
      }).promise;
    } catch (error) {
      console.error("Error rendering page:", error);
    }
  }, [pdfDoc, currentPage]);

  // Render page when PDF loads or page changes
  useEffect(() => {
    renderPage();
  }, [renderPage]);

  // Re-render on window resize
  useEffect(() => {
    const handleResize = () => {
      renderPage();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [renderPage]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="w-16 h-16 border-4 border-white/20 border-t-amber-400 rounded-full animate-spin mb-4" />
        <p className="font-fredoka text-white text-lg">
          Loading... {loadingProgress}%
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`w-full h-full flex items-center justify-center ${
        eyeComfortMode ? "sepia-[0.15]" : ""
      }`}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4)",
        }}
      />
    </div>
  );
}
