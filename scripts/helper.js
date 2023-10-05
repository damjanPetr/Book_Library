export default function elementFromHTML(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}

export function changeDateFormat(dateString) {
  const date = new Date(dateString).toISOString().split("T")[0];
  return date;
}
