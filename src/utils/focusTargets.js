export function createFocusTarget({
  id,
  label,
  kind = "scene",
  position,
  lookAt,
  cameraOffset,
  accent = "#38bdf8",
  smoothness = 5.5,
  epsilon = 0.055,
}) {
  return {
    id,
    label,
    kind,
    position,
    lookAt: lookAt ?? position,
    cameraOffset,
    accent,
    smoothness,
    epsilon,
  };
}

function getCenterFacingOffset(position, distance = 4.5, height = 1.15) {
  const [x, , z] = position;
  const length = Math.hypot(x, z);

  if (length < 0.001) {
    return [0, height, 4.5];
  }

  // Move camera from the object back toward the scene center.
  // This usually frames floating screens from their intended front side.
  return [(-x / length) * distance, height, (-z / length) * distance];
}

export function getProjectFocusTarget(project) {
  const [x, y, z] = project.position;

  return createFocusTarget({
    id: project.id,
    label: project.title,
    kind: "project",
    position: project.position,
    lookAt: [x, y + 0.35, z],
    cameraOffset: getCenterFacingOffset(project.position, 4.4, 1.1),
    accent: project.accent,
    smoothness: 5.8,
  });
}

export const STATIC_FOCUS_TARGETS = {
  mas: createFocusTarget({
    id: "mas",
    label: "MAS Logo",
    kind: "brand",
    position: [0, 4.6, 0],
    lookAt: [0, 4.45, 0],
    cameraOffset: [0, 0.85, 5.2],
    accent: "#38bdf8",
  }),

  about: createFocusTarget({
    id: "about",
    label: "About Me",
    kind: "profile",
    position: [0, 2.0, 0],
    lookAt: [0, 1.7, 0],
    cameraOffset: [0, 1.05, 4.25],
    accent: "#38bdf8",
  }),

  skills: createFocusTarget({
    id: "skills",
    label: "Skills",
    kind: "skills",
    position: [-8, 3.6, 2],
    lookAt: [-8, 3.6, 2],
    cameraOffset: [3.6, 0.8, 3.1],
    accent: "#a78bfa",
  }),

  resume: createFocusTarget({
    id: "resume",
    label: "Resume",
    kind: "resume",
    position: [8, 2.4, 2],
    lookAt: [8, 2.2, 2],
    cameraOffset: [-3.4, 0.95, 3.1],
    accent: "#f472b6",
  }),

  contact: createFocusTarget({
    id: "contact",
    label: "Contact",
    kind: "contact",
    position: [0, 1.2, -8],
    lookAt: [0, 1.15, -8],
    cameraOffset: [0, 1.05, -4.2],
    accent: "#f472b6",
  }),
};
