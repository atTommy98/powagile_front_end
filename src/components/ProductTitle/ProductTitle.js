import "./ProductTitle.css";

export default function ProductTitle({ title = "Your product name here" }) {
  return (
    <h2 className="pageTitle" style={{ textAlign: "center" }}>
      <span className="companyName">Pow!Agile</span>{" "}
      <span className={"productName" + title}>{title}™</span>
    </h2>
  );
}
