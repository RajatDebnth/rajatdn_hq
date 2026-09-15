import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const alt = siteConfig.socialImage.alt;
export const size = {
  width: siteConfig.socialImage.width,
  height: siteConfig.socialImage.height,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: siteConfig.themeColors.dark,
          color: "#edf1ed",
          display: "flex",
          fontFamily: "Arial, Helvetica, sans-serif",
          height: "100%",
          padding: "72px 80px",
          width: "100%",
        }}
      >
        <div style={{ background: "#7fc6a4", display: "flex", width: "8px" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", paddingLeft: "44px" }}>
          <div style={{ color: "#7fc6a4", display: "flex", fontSize: 24, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {siteConfig.professionalTitle}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 72, fontWeight: 700, letterSpacing: "-0.04em" }}>{siteConfig.name}</div>
            <div style={{ color: "#aeb8b0", display: "flex", fontSize: 34, marginTop: "20px" }}>{siteConfig.specialization}</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
