// Performance monitoring utility for tracking Core Web Vitals and other metrics

interface PerformanceMetrics {
  FCP?: number; // First Contentful Paint
  LCP?: number; // Largest Contentful Paint
  FID?: number; // First Input Delay
  CLS?: number; // Cumulative Layout Shift
  TTFB?: number; // Time to First Byte
  domContentLoaded?: number;
  loadComplete?: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {};
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeObservers();
  }

  private initializeObservers(): void {
    // Observe paint metrics
    if ("PerformanceObserver" in window) {
      // First Contentful Paint
      try {
        const paintObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === "first-contentful-paint") {
              this.metrics.FCP = entry.startTime;
            }
          }
        });
        paintObserver.observe({ entryTypes: ["paint"] });
        this.observers.push(paintObserver);
      } catch (e) {
        console.warn("Paint observer not supported");
      }

      // Largest Contentful Paint
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.metrics.LCP = lastEntry.startTime;
        });
        lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
        this.observers.push(lcpObserver);
      } catch (e) {
        console.warn("LCP observer not supported");
      }

      // First Input Delay
      try {
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const fidEntry = entry as any; // Cast to any since PerformanceEventTiming might not be available in all environments
            if (fidEntry.processingStart && fidEntry.startTime) {
              this.metrics.FID = fidEntry.processingStart - fidEntry.startTime;
            }
          }
        });
        fidObserver.observe({ entryTypes: ["first-input"] });
        this.observers.push(fidObserver);
      } catch (e) {
        console.warn("FID observer not supported");
      }

      // Cumulative Layout Shift
      try {
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          this.metrics.CLS = clsValue;
        });
        clsObserver.observe({ entryTypes: ["layout-shift"] });
        this.observers.push(clsObserver);
      } catch (e) {
        console.warn("CLS observer not supported");
      }
    }
  }

  public measureNavigation(): void {
    if ("performance" in window && "getEntriesByType" in performance) {
      const navEntries = performance.getEntriesByType(
        "navigation"
      ) as PerformanceNavigationTiming[];
      if (navEntries.length > 0) {
        const nav = navEntries[0];
        this.metrics.TTFB = nav.responseStart - nav.requestStart;
        this.metrics.domContentLoaded =
          nav.domContentLoadedEventEnd - nav.domContentLoadedEventStart;
        this.metrics.loadComplete = nav.loadEventEnd - nav.loadEventStart;
      }
    }
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public logMetrics(): void {
    const metrics = this.getMetrics();
    console.group("🚀 Performance Metrics");
    console.log(
      "%c📊 Core Web Vitals Report",
      "font-size: 16px; font-weight: bold; color: #0ea5e9;"
    );

    if (metrics.FCP) {
      console.log(
        `🎨 First Contentful Paint: ${metrics.FCP.toFixed(
          2
        )}ms ${this.getPerformanceGrade("FCP", metrics.FCP)}`
      );
    }

    if (metrics.LCP) {
      console.log(
        `🖼️ Largest Contentful Paint: ${metrics.LCP.toFixed(
          2
        )}ms ${this.getPerformanceGrade("LCP", metrics.LCP)}`
      );
    }

    if (metrics.FID) {
      console.log(
        `⚡ First Input Delay: ${metrics.FID.toFixed(
          2
        )}ms ${this.getPerformanceGrade("FID", metrics.FID)}`
      );
    }

    if (metrics.CLS) {
      console.log(
        `📐 Cumulative Layout Shift: ${metrics.CLS.toFixed(
          4
        )} ${this.getPerformanceGrade("CLS", metrics.CLS)}`
      );
    }

    if (metrics.TTFB) {
      console.log(
        `⏱️ Time to First Byte: ${metrics.TTFB.toFixed(
          2
        )}ms ${this.getPerformanceGrade("TTFB", metrics.TTFB)}`
      );
    }

    if (metrics.domContentLoaded) {
      console.log(
        `📄 DOM Content Loaded: ${metrics.domContentLoaded.toFixed(2)}ms`
      );
    }

    if (metrics.loadComplete) {
      console.log(`✅ Load Complete: ${metrics.loadComplete.toFixed(2)}ms`);
    }

    // Performance summary
    const overallScore = this.calculateOverallScore(metrics);
    console.log(
      `%c🏆 Overall Score: ${overallScore}/100`,
      `font-size: 14px; font-weight: bold; color: ${this.getScoreColor(
        overallScore
      )};`
    );

    console.groupEnd();
  }

  private calculateOverallScore(metrics: PerformanceMetrics): number {
    let score = 0;
    let totalMetrics = 0;

    const scoreMetric = (value: number, good: number, poor: number) => {
      if (value <= good) return 100;
      if (value <= poor) return 50;
      return 0;
    };

    if (metrics.FCP) {
      score += scoreMetric(metrics.FCP, 1800, 3000);
      totalMetrics++;
    }
    if (metrics.LCP) {
      score += scoreMetric(metrics.LCP, 2500, 4000);
      totalMetrics++;
    }
    if (metrics.FID) {
      score += scoreMetric(metrics.FID, 100, 300);
      totalMetrics++;
    }
    if (metrics.CLS) {
      score += scoreMetric(metrics.CLS, 0.1, 0.25);
      totalMetrics++;
    }

    return totalMetrics > 0 ? Math.round(score / totalMetrics) : 0;
  }

  private getScoreColor(score: number): string {
    if (score >= 90) return "#10b981"; // green
    if (score >= 50) return "#f59e0b"; // yellow
    return "#ef4444"; // red
  }

  private getPerformanceGrade(metric: string, value: number): string {
    const thresholds = {
      FCP: { good: 1800, poor: 3000 },
      LCP: { good: 2500, poor: 4000 },
      FID: { good: 100, poor: 300 },
      CLS: { good: 0.1, poor: 0.25 },
      TTFB: { good: 800, poor: 1800 },
    };

    const threshold = thresholds[metric as keyof typeof thresholds];
    if (!threshold) return "";

    if (value <= threshold.good) return "🟢 Good";
    if (value <= threshold.poor) return "🟡 Needs Improvement";
    return "🔴 Poor";
  }

  public cleanup(): void {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];
  }
}

// Utility functions
let globalMonitor: PerformanceMonitor | null = null;

export const measurePerformance = () => {
  const monitor = new PerformanceMonitor();
  globalMonitor = monitor; // Store global reference

  // Make it available globally for manual checking
  (window as any).checkPerformance = () => {
    monitor.measureNavigation();
    monitor.logMetrics();
    return monitor.getMetrics();
  };

  // Measure navigation timing when page loads
  if (document.readyState === "loading") {
    window.addEventListener("load", () => {
      setTimeout(() => {
        monitor.measureNavigation();
        monitor.logMetrics();
      }, 1000); // Increased delay to capture more metrics
    });
  } else {
    setTimeout(() => {
      monitor.measureNavigation();
      monitor.logMetrics();
    }, 1000);
  }

  return monitor;
};

// Manual performance check function
export const checkPerformance = () => {
  if (globalMonitor) {
    globalMonitor.measureNavigation();
    globalMonitor.logMetrics();
    return globalMonitor.getMetrics();
  } else {
    console.warn("Performance monitor not initialized");
    return null;
  }
};

// Resource loading optimization
export const preloadResource = (
  href: string,
  as: string,
  crossorigin?: boolean
): void => {
  const link = document.createElement("link");
  link.rel = "preload";
  link.href = href;
  link.as = as;
  if (crossorigin) link.crossOrigin = "anonymous";
  document.head.appendChild(link);
};

// Critical resource hints
export const addResourceHints = (): void => {
  // DNS prefetch for external domains
  const domains = [
    "fonts.googleapis.com",
    "fonts.gstatic.com",
    "images.unsplash.com",
  ];

  domains.forEach((domain) => {
    const link = document.createElement("link");
    link.rel = "dns-prefetch";
    link.href = `//${domain}`;
    document.head.appendChild(link);
  });
};

// Image lazy loading utility
export const observeImages = (): void => {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.dataset.src;
            if (src) {
              img.src = src;
              img.removeAttribute("data-src");
              imageObserver.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: "50px",
      }
    );

    // Observe all images with data-src attribute
    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }
};

export default PerformanceMonitor;
