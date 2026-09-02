import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { ARTICLES, getArticle } from "@/lib/articles";
import { OG_IMAGE_SIZE } from "@/lib/og";

/**
 * תמונת שיתוף ייחודית לכל מאמר, נוצרת בזמן build.
 *
 * הכתובת נגזרת מה-slug ולכן היא ידועה מראש — מה שמאפשר לצרוך אותה
 * גם ב-JSON-LD (ImageObject) וגם ב-openGraph, בלי ה-hash שמוסיפה
 * מוסכמת הקובץ opengraph-image.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map(({ slug }) => ({ slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const article = getArticle(slug);

  /**
   * חובה מופעים סטטיים של הגופן: Satori נכשל בקריאת טבלאות של גופן משתנה
   * (variable font) ומחזיר "Cannot read properties of undefined".
   */
  const [heeboRegular, heeboBold] = await Promise.all([
    readFile(join(process.cwd(), "assets", "Heebo-400.ttf")),
    readFile(join(process.cwd(), "assets", "Heebo-700.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          direction: "rtl",
          backgroundColor: "#064e3b",
          backgroundImage:
            "linear-gradient(135deg, #064e3b 0%, #065f46 55%, #0f172a 100%)",
          padding: "64px 72px",
          fontFamily: "Heebo",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-end",
              backgroundColor: "rgba(255,255,255,0.14)",
              color: "#a7f3d0",
              fontSize: 30,
              padding: "10px 26px",
              borderRadius: 999,
            }}
          >
            {article.category}
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              marginTop: 40,
              color: "#ffffff",
              fontSize: 62,
              fontWeight: 700,
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
              textAlign: "right",
            }}
          >
            {article.title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid rgba(255,255,255,0.22)",
            paddingTop: 28,
          }}
        >
          {/* סדר ה-JSX הוא סדר ויזואלי משמאל לימין: Satori מהפך טקסט אך לא
              את פריסת ה-flex, ולכן הדומיין מוצב ראשון כדי להופיע בצד שמאל */}
          <div style={{ display: "flex", color: "#a7f3d0", fontSize: 26 }}>
            hiservice.org
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                display: "flex",
                color: "#ffffff",
                fontSize: 34,
                fontWeight: 700,
              }}
            >
              יהודה חכמוב — הנדסאי חשמל מוסמך
            </div>
            <div
              style={{ display: "flex", color: "#6ee7b7", fontSize: 26, marginTop: 8 }}
            >
              ח.י שירותי חשמל · חשמלאי יצאת צדיק
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_IMAGE_SIZE,
      fonts: [
        { name: "Heebo", data: heeboRegular, style: "normal", weight: 400 },
        { name: "Heebo", data: heeboBold, style: "normal", weight: 700 },
      ],
    }
  );
}
