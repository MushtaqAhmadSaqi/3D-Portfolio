import React from "react";
import { projects } from "../data/projects.js";
import { useStore } from "../utils/useStore.js";

export default function TourOverlay() {
  const mode = useStore((s) => s.mode);
  const setMode = useStore((s) => s.setMode);
  const tourStep = useStore((s) => s.tourStep);
  const setTourStep = useStore((s) => s.setTourStep);
  const activeFocus = useStore((s) => s.activeFocus);

  const totalStops = projects.length + 5;
  const safeStep = totalStops ? (tourStep % totalStops) + 1 : 1;
  const isTour = mode === "tour";

  return (
    <aside
      className={`tour-overlay ${isTour ? "is-active" : ""}`}
      aria-live="polite"
      aria-label={isTour ? "Guided tour status" : "Current focus status"}
    >
      <div className="tour-kicker">
        {isTour ? "Guided Tour" : "Now Viewing"}
      </div>

      <div className="tour-title">
        {activeFocus?.label || "Free Explore"}
      </div>

      {isTour ? (
        <>
          <div className="tour-progress-row">
            <span>
              Stop {safeStep} of {totalStops}
            </span>
            <span>Auto advancing</span>
          </div>

          <div className="tour-progress" aria-hidden="true">
            <div
              className="tour-progress-fill"
              style={{ width: `${(safeStep / totalStops) * 100}%` }}
            />
          </div>

          <div className="tour-actions">
            <button className="chip" type="button" onClick={() => setMode("explore")}>
              Pause Tour
            </button>

            <button
              className="chip ghost"
              type="button"
              onClick={() => {
                setTourStep(0);
                setMode("tour");
              }}
            >
              Restart
            </button>
          </div>
        </>
      ) : (
        <p className="tour-note">
          Click holograms, use the studio map, or press <kbd>T</kbd> to start the tour.
        </p>
      )}
    </aside>
  );
}
