export function formatIndianNumber(num: number): string {
  const str = Math.floor(num).toString();
  if (str.length <= 3) return str;
  let lastThree = str.slice(-3);
  const rest = str.slice(0, -3);
  const formatted = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return formatted + "," + lastThree;
}

export function formatINR(amount: number): string {
  const hasDecimal = amount % 1 !== 0;
  if (hasDecimal) {
    const [intPart, decPart] = amount.toFixed(2).split(".");
    return "\u20B9" + formatIndianNumber(parseInt(intPart)) + "." + decPart;
  }
  return "\u20B9" + formatIndianNumber(amount);
}

export function formatDate(date: Date): string {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const day = date.getDate().toString().padStart(2, "0");
  return `${day} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export function getGreeting(hour?: number): string {
  const h = hour ?? new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function timeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Yesterday";
  return formatDate(date);
}
