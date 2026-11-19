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
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#fbfaf7",
          padding: "24px",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        {/* Inner Framed Card */}
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "1px solid #dedbd3",
            borderRadius: "16px",
            padding: "46px 54px",
            backgroundColor: "#fbfaf7",
          }}
        >
          {/* Top Header Row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {/* Badge: AI ENGINEER */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#ece9e1",
                border: "1px solid #dedbd3",
                borderRadius: "8px",
                padding: "8px 16px",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "4px",
                  backgroundColor: "#25231f",
                  marginRight: "8px",
                  display: "flex",
                }}
              />
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: "#25231f",
                  textTransform: "uppercase",
                  display: "flex",
                }}
              >
                {siteConfig.professionalTitle}
              </span>
            </div>

            {/* Domain name */}
            <span
              style={{
                fontSize: 18,
                fontWeight: 500,
                color: "#716d65",
                letterSpacing: "-0.01em",
                display: "flex",
              }}
            >
              rajatdn.vercel.app
            </span>
          </div>

          {/* Main Content Area */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "auto",
              marginBottom: "auto",
              maxWidth: "960px",
            }}
          >
            {/* Name */}
            <div
              style={{
                display: "flex",
                fontSize: 66,
                fontWeight: 800,
                letterSpacing: "-0.035em",
                color: "#25231f",
                lineHeight: 1.1,
                marginBottom: "18px",
              }}
            >
              {siteConfig.name}
            </div>

            {/* Specialization / Offer */}
            <div
              style={{
                display: "flex",
                fontSize: 32,
                fontWeight: 400,
                lineHeight: 1.35,
                color: "#524e47",
                letterSpacing: "-0.015em",
              }}
            >
              {siteConfig.specialization}
            </div>
          </div>

          {/* Bottom Capabilities Tags Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            {["RAG Knowledge Engines", "AI SaaS Products", "Data Infrastructure", "Workflow Automation"].map(
              (tag, index) => (
                <div
                  key={tag}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#f3f1eb",
                    border: "1px solid #dedbd3",
                    borderRadius: "6px",
                    padding: "7px 14px",
                    fontSize: 15,
                    fontWeight: 500,
                    color: "#524e47",
                    marginRight: index < 3 ? "12px" : "0",
                  }}
                >
                  {tag}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
