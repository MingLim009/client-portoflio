/** Fixed atmospheric 3D field behind the page content. */
export function Background3D() {
  return (
    <div className="bg3d" aria-hidden="true">
      <div className="bg3d-fade" />
      <div className="bg3d-stage">
        <div className="bg3d-grid" />
        <div className="bg3d-horizon" />
        <svg
          className="bg3d-ribbon"
          viewBox="0 0 800 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="bg3dRibbon" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7EC8B8" stopOpacity="0" />
              <stop offset="35%" stopColor="#7EC8B8" stopOpacity="0.55" />
              <stop offset="70%" stopColor="#5EB7FF" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#5EB7FF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            className="bg3d-ribbon-path"
            d="M0 170 C90 150 140 190 220 130 C300 70 360 120 450 85 C540 50 610 95 700 55 C760 30 790 40 800 28"
            stroke="url(#bg3dRibbon)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
        <span className="bg3d-orb bg3d-orb-a" />
        <span className="bg3d-orb bg3d-orb-b" />
        <span className="bg3d-orb bg3d-orb-c" />
        <span className="bg3d-node bg3d-node-a" />
        <span className="bg3d-node bg3d-node-b" />
        <span className="bg3d-node bg3d-node-c" />
      </div>
    </div>
  )
}
