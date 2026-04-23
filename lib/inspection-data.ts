import { Category } from "@/types/inspection";

export const categories: Category[] = [
  {
    id: "cat1",
    name: "מנוע",
    icon: "/icons/Cat1.png",
    faults: [
      { id: "c1f1", label: "נזילת שמן מהמכסה", severity: "moderate" },
      { id: "c1f2", label: "רעשים חריגים במנוע", severity: "major" },
      { id: "c1f3", label: "רטטים מוגברים", severity: "moderate" },
      { id: "c1f4", label: "עשן מוגבר מהמפלט", severity: "critical" },
      { id: "c1f5", label: "חשמל מנוע תקול", severity: "major" },
    ],
  },
  {
    id: "cat2",
    name: "מערכת הקירור",
    icon: "/icons/Cat2.png",
    faults: [
      { id: "c2f1", label: "נזילת נוזל קירור", severity: "major" },
      { id: "c2f2", label: "מאוורר קירור לא פועל", severity: "critical" },
      { id: "c2f3", label: "צינור קירור סדוק", severity: "moderate" },
      { id: "c2f4", label: "רדייטור מסויד", severity: "minor" },
    ],
  },
  {
    id: "cat3",
    name: "מערכת דלק",
    icon: "/icons/Cat3.png",
    faults: [
      { id: "c3f1", label: "נזילת דלק מהמכל", severity: "critical" },
      { id: "c3f2", label: "צינור דלק סדוק", severity: "major" },
      { id: "c3f3", label: "בעיה במשאבת דלק", severity: "major" },
      { id: "c3f4", label: "מסנן דלק סתום", severity: "moderate" },
    ],
  },
  {
    id: "cat4",
    name: "מערכת הצתה/הזרקה",
    icon: "/icons/Cat4.png",
    faults: [
      { id: "c4f1", label: "מצתים תקולים", severity: "moderate" },
      { id: "c4f2", label: "סליל הצתה לא תקין", severity: "major" },
      { id: "c4f3", label: "חיישן מיקום גל זיזים תקול", severity: "major" },
      { id: "c4f4", label: "בעיה במחשב הזרקה", severity: "critical" },
    ],
  },
  {
    id: "cat5",
    name: "מערכת גידוש המנוע",
    icon: "/icons/Cat5.png",
    faults: [
      { id: "c5f1", label: "לחץ שמן נמוך", severity: "critical" },
      { id: "c5f2", label: "נזילת שמן ממכסה שסתומים", severity: "moderate" },
      { id: "c5f3", label: "שמן מלוכלך", severity: "minor" },
      { id: "c5f4", label: "משאבת שמן תקולה", severity: "critical" },
    ],
  },
  {
    id: "cat6",
    name: "מערכת היגוי",
    icon: "/icons/Cat6.png",
    faults: [
      { id: "c6f1", label: "משחק היגוי מוגבר", severity: "major" },
      { id: "c6f2", label: "כדור היגוי תקול", severity: "critical" },
      { id: "c6f3", label: "צמיגים נשחקים לא שווים", severity: "moderate" },
      { id: "c6f4", label: "בעיה בהידראולי היגוי", severity: "major" },
    ],
  },
  {
    id: "cat7",
    name: "מערכת טעינה",
    icon: "/icons/Cat7.png",
    faults: [
      { id: "c7f1", label: "מטען לא טוען", severity: "major" },
      { id: "c7f2", label: "חגורת מטען רופפת/קרועה", severity: "moderate" },
      { id: "c7f3", label: "בעיה בדינמו", severity: "major" },
    ],
  },
  {
    id: "cat8",
    name: "מערכת פליטה ומערכות למניעת זיהום אוויר",
    icon: "/icons/Cat8.png",
    faults: [
      { id: "c8f1", label: "דליפה במערכת הפליטה", severity: "critical" },
      { id: "c8f2", label: "ממיר קטליטי תקול", severity: "critical" },
      { id: "c8f3", label: "חיישן חמצן תקול", severity: "major" },
      { id: "c8f4", label: "EGR תקול", severity: "moderate" },
    ],
  },
  {
    id: "cat9",
    name: "מערכת התנעה (כולל מצבר)",
    icon: "/icons/Cat9.png",
    faults: [
      { id: "c9f1", label: "מצבר חלש", severity: "major" },
      { id: "c9f2", label: "מנוע התנעה תקול", severity: "critical" },
      { id: "c9f3", label: "קונטקט תנעה תקול", severity: "major" },
      { id: "c9f4", label: "כבלי מצבר מושחתים", severity: "moderate" },
    ],
  },
  {
    id: "cat10",
    name: "תיבת הילוכים",
    icon: "/icons/Cat10.png",
    faults: [
      { id: "c10f1", label: "החלקה בהילוכים", severity: "critical" },
      { id: "c10f2", label: "נזילת שמן מתיבה", severity: "major" },
      { id: "c10f3", label: "מעברי הילוכים קשים", severity: "moderate" },
      { id: "c10f4", label: "רעשים חריגים בתיבה", severity: "major" },
    ],
  },
  {
    id: "cat11",
    name: "תיבת העברת הכוח",
    icon: "/icons/Cat11.png",
    faults: [
      { id: "c11f1", label: "נזילת שמן מקארטורה", severity: "moderate" },
      { id: "c11f2", label: "בעיה בצימוד", severity: "major" },
      { id: "c11f3", label: "רעשים בצימוד", severity: "moderate" },
    ],
  },
  {
    id: "cat12",
    name: "ציריות/גל הינע",
    icon: "/icons/Cat12.png",
    faults: [
      { id: "c12f1", label: "מפרקים תקולים", severity: "major" },
      { id: "c12f2", label: "כריות ציר תקולות", severity: "moderate" },
      { id: "c12f3", label: "רעשים בגל הינע", severity: "moderate" },
      { id: "c12f4", label: "פיר ציר כפוף", severity: "critical" },
    ],
  },
  {
    id: "cat13",
    name: "מערכת מתלה קדמי",
    icon: "/icons/Cat13.png",
    faults: [
      { id: "c13f1", label: "בולם זעזועים תקול", severity: "major" },
      { id: "c13f2", label: "קפיצים שבורים", severity: "critical" },
      { id: "c13f3", label: "מפרקי מתלה תקולים", severity: "major" },
      { id: "c13f4", label: "בושינגים בלויים", severity: "moderate" },
    ],
  },
  {
    id: "cat14",
    name: "מערכת מתלה אחורי",
    icon: "/icons/Cat14.png",
    faults: [
      { id: "c14f1", label: "בולמים אחוריים תקולים", severity: "major" },
      { id: "c14f2", label: "קפיצים אחוריים שבורים", severity: "critical" },
      { id: "c14f3", label: "ציר אחורי כפוף", severity: "critical" },
      { id: "c14f4", label: "בושינגים אחוריים בלויים", severity: "moderate" },
    ],
  },
  {
    id: "cat15",
    name: "מערכת בלמים (ללא פירוק גלגלים)",
    icon: "/icons/Cat15.png",
    faults: [
      { id: "c15f1", label: "רפידות בלם שחוקות", severity: "critical" },
      { id: "c15f2", label: "דיסקיות בלם מחורצות", severity: "major" },
      { id: "c15f3", label: "בלם יד לא תקין", severity: "major" },
      { id: "c15f4", label: "דליפת נוזל בלמים", severity: "critical" },
      { id: "c15f5", label: "צינורית בלם סדוקה", severity: "critical" },
    ],
  },
  {
    id: "cat16",
    name: "צמיגים וחישוקים",
    icon: "/icons/Cat16.png",
    faults: [
      { id: "c16f1", label: "צמיגים מרוסקים", severity: "critical" },
      { id: "c16f2", label: "שחיקה לא אחידה", severity: "moderate" },
      { id: "c16f3", label: "חישוקים כפופים", severity: "major" },
      { id: "c16f4", label: "לחץ אוויר לא תקין", severity: "minor" },
      { id: "c16f5", label: "חיפוי צמיגים נמוך מן המותר", severity: "critical" },
    ],
  },
  {
    id: "cat17",
    name: "שילדה ומרכב",
    icon: "/icons/Cat17.png",
    faults: [
      { id: "c17f1", label: "חלודה משמעותית", severity: "major" },
      { id: "c17f2", label: "שילדה כפופה", severity: "critical" },
      { id: "c17f3", label: "דלתות לא נסגרות כראוי", severity: "moderate" },
      { id: "c17f4", label: "חלונות תקולים", severity: "minor" },
    ],
  },
  {
    id: "cat18",
    name: "מערכת תאורה",
    icon: "/icons/Cat18.png",
    faults: [
      { id: "c18f1", label: "פנס ראשי לא תקין", severity: "critical" },
      { id: "c18f2", label: "פנס ערפל לא תקין", severity: "moderate" },
      { id: "c18f3", label: "איתות תקול", severity: "major" },
      { id: "c18f4", label: "בלם אחורי לא נדלק", severity: "critical" },
      { id: "c18f5", label: "אור רוורס לא תקין", severity: "moderate" },
    ],
  },
  {
    id: "cat19",
    name: "מחוונים",
    icon: "/icons/Cat19.png",
    faults: [
      { id: "c19f1", label: "מד מהירות לא תקין", severity: "moderate" },
      { id: "c19f2", label: "מד דלק לא מדויק", severity: "minor" },
      { id: "c19f3", label: "נורות אזהרה דולקות", severity: "major" },
      { id: "c19f4", label: "מד חום מנוע לא תקין", severity: "moderate" },
    ],
  },
  {
    id: "cat20",
    name: "הערות כלליות",
    icon: "/icons/Cat20.png",
    faults: [
      { id: "c20f1", label: "רכב זקוק לטיפול שוטף", severity: "minor" },
      { id: "c20f2", label: "מומלץ לבצע בדיקה נוספת", severity: "moderate" },
      { id: "c20f3", label: "אין לאשר רכב לנסיעה עד תיקון", severity: "critical" },
    ],
  },
];

export function getSeverityLabel(severity: string): string {
  const labels: Record<string, string> = {
    minor: "קלה",
    moderate: "בינונית",
    major: "חמורה",
    critical: "קריטית",
  };
  return labels[severity] || severity;
}

export function getSeverityColor(severity: string): string {
  const colors: Record<string, string> = {
    minor: "bg-blue-100 text-blue-800 border-blue-300",
    moderate: "bg-yellow-100 text-yellow-800 border-yellow-300",
    major: "bg-orange-100 text-orange-800 border-orange-300",
    critical: "bg-red-100 text-red-800 border-red-300",
  };
  return colors[severity] || "bg-gray-100 text-gray-800 border-gray-300";
}
