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
          background: siteConfig.themeColors.light,
          color: "#25231f",
          display: "flex",
          fontFamily: "Arial, Helvetica, sans-serif",
          height: "100%",
          padding: "72px 80px",
          width: "100%",
        }}
      >
        <div style={{ background: "#25231f", display: "flex", width: "8px" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", paddingLeft: "44px" }}>
          <div style={{ color: "#716d65", display: "flex", fontSize: 24, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {siteConfig.professionalTitle}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 72, fontWeight: 700, letterSpacing: "-0.04em", color: "#25231f" }}>{siteConfig.name}</div>
            <div style={{ color: "#716d65", display: "flex", fontSize: 34, marginTop: "20px" }}>{siteConfig.specialization}</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
